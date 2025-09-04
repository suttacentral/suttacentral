import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

export class CommentTooltipManager {
  constructor() {
    this.activeTooltip = null;
    this.cleanup = null;
    this.debounceTimer = null;
    this.hideTimer = null;
    this.isTooltipHovered = false;
    this.isMobile = this._detectMobile();
    this.lastTouchTime = 0;
    this.activeElement = null;
  }

  _detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
  }

  async initializeComments() {
    const commentElements = document.querySelectorAll('.comment, .variant');
    commentElements.forEach(element => {
      if (this._hasContent(element)) {
        if (this.isMobile) {
          this._addMobileEventListeners(element);
        } else {
          this._addDesktopEventListeners(element);
        }
        element.setAttribute('tabindex', '0');
        element.style.cursor = 'help';
      }
    });

    if (this.isMobile) {
      document.addEventListener('touchstart', this._handleGlobalTouch.bind(this), true);
      document.addEventListener('click', this._handleGlobalClick.bind(this), true);
    }
  }

  _addMobileEventListeners(element) {
    element.addEventListener('touchstart', (e) => this._handleMobileTouch(e), { passive: false });
    element.addEventListener('click', (e) => this._handleMobileClick(e));

    element.addEventListener('focus', (e) => this._showTooltip(e.target));
    element.addEventListener('blur', (e) => this._scheduleHideTooltip(e));
  }

  _addDesktopEventListeners(element) {
    element.addEventListener('mouseenter', (e) => this._showTooltip(e.target));
    element.addEventListener('mouseleave', (e) => this._scheduleHideTooltip(e));
    element.addEventListener('focus', (e) => this._showTooltip(e.target));
    element.addEventListener('blur', (e) => this._scheduleHideTooltip(e));
  }

  _handleMobileTouch(e) {
    e.preventDefault();
    this.lastTouchTime = Date.now();

    const targetElement = e.target.closest('.comment, .variant');
    if (!targetElement) return;

    if (this.activeElement === targetElement && this.activeTooltip) {
      this._hideAllTooltips();
      return;
    }

    this._showTooltip(targetElement);
  }

  _handleMobileClick(e) {
    const now = Date.now();
    if (now - this.lastTouchTime < 100) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  _handleGlobalTouch(e) {
    const targetElement = e.target.closest('.comment, .variant, .floating-tooltip');
    if (!targetElement && this.activeTooltip) {
      this._hideAllTooltips();
    }
  }

  _handleGlobalClick(e) {
    const targetElement = e.target.closest('.comment, .variant, .floating-tooltip');
    if (!targetElement && this.activeTooltip) {
      setTimeout(() => this._hideAllTooltips(), 50);
    }
  }

  _hasContent(element) {
    const textContent = element.textContent || '';
    const cleanContent = textContent.replace(/^\*\s*/, '').trim();
    return cleanContent.length > 0;
  }

  async _showTooltip(referenceElement) {
    clearTimeout(this.hideTimer);
    clearTimeout(this.debounceTimer);

    const delay = this.isMobile ? 0 : 150;

    this.debounceTimer = setTimeout(async () => {
      await this._showTooltipImmediate(referenceElement);
    }, delay);
  }

  _scheduleHideTooltip(e) {
    if (this.isMobile) {
      return;
    }


    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      if (!this.isTooltipHovered) {
        this._hideTooltip();
      }
    }, 200);
  }

  async _showTooltipImmediate(referenceElement) {
    this._hideTooltip();
    this.activeElement = referenceElement;

    const tooltipContent = this._extractTooltipContent(referenceElement);
    if (!tooltipContent) return;

    const tooltip = this._createTooltipElement(tooltipContent, referenceElement);
    document.body.appendChild(tooltip);

    this._addTooltipEventListeners(tooltip);

    const placement = this.isMobile ? 'bottom' : 'top';
    const { x, y } = await computePosition(referenceElement, tooltip, {
      placement,
      middleware: [
        offset(this.isMobile ? 12 : 8),
        flip({
          fallbackPlacements: this.isMobile ? ['top', 'bottom'] : ['bottom', 'right', 'left'],
        }),
        shift({ padding: 8 })
      ],
    });

    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
      opacity: '1',
      transform: 'scale(1)',
      visibility: 'visible'
    });

    this.activeTooltip = tooltip;

    this.cleanup = autoUpdate(referenceElement, tooltip, async () => {
      if (this.activeTooltip) {
        const { x, y } = await computePosition(referenceElement, tooltip, {
          placement,
          middleware: [offset(12), flip(), shift({ padding: 8 })]
        });

        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      }
    });
  }

  _addTooltipEventListeners(tooltip) {
    if (this.isMobile) {
      tooltip.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        clearTimeout(this.hideTimer);
        this.isTooltipHovered = true;
      }, { passive: true });

      tooltip.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    } else {
      tooltip.addEventListener('mouseenter', () => {
        clearTimeout(this.hideTimer);
        this.isTooltipHovered = true;
      });

      tooltip.addEventListener('mouseleave', () => {
        this.isTooltipHovered = false;
        clearTimeout(this.hideTimer);
        this._hideAllTooltips();
      });

      tooltip.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    tooltip.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this._hideAllTooltips();
      }
    });
  }

  _hideAllTooltips() {
    clearTimeout(this.debounceTimer);
    clearTimeout(this.hideTimer);
    this.isTooltipHovered = false;
    this.activeElement = null;

    if (this.activeTooltip) {
      this._hideTooltip();
    }

    const allTooltips = document.querySelectorAll('.floating-tooltip');
    allTooltips.forEach(tooltip => {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.remove();
        }
      }, 200);
    });
  }

  _hideTooltip() {
    clearTimeout(this.debounceTimer);
    clearTimeout(this.hideTimer);
    this.isTooltipHovered = false;
    this.activeElement = null;

    if (this.activeTooltip) {
      this.activeTooltip.style.opacity = '0';
      this.activeTooltip.style.transform = 'scale(0.95)';

      setTimeout(() => {
        if (this.activeTooltip && this.activeTooltip.parentNode) {
          this.activeTooltip.remove();
          this.activeTooltip = null;
        }
      }, 200);
    }

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = null;
    }
  }

  _extractTooltipContent(element) {
    if (element.classList.contains('comment')) {
      return element.innerHTML.replace(/^\*\s*/, '').trim();
    } else if (element.classList.contains('variant')) {
      const textContent = element.textContent || '';
      const cleanContent = textContent.replace(/^\*\s*/, '').trim();
      if (!cleanContent.toLowerCase().startsWith('variant:')) {
        return `Variant: ${cleanContent}`;
      }
      return cleanContent;
    }
    return element.innerHTML.replace(/^\*\s*/, '').trim();
  }

  _createTooltipElement(content, referenceElement) {
    const tooltip = document.createElement('div');
    tooltip.className = 'floating-tooltip';

    if (referenceElement.classList.contains('comment')) {
      tooltip.classList.add('comment-tooltip');
    } else if (referenceElement.classList.contains('variant')) {
      tooltip.classList.add('variant-tooltip');
    }

    if (this.isMobile) {
      tooltip.classList.add('mobile-tooltip');
    }

    tooltip.innerHTML = content;

    Object.assign(tooltip.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0',
      transform: 'scale(0.95)',
      visibility: 'hidden',
      transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease',
      zIndex: '9999',
      pointerEvents: 'auto',
      cursor: 'default',
      ...(this.isMobile && {
        maxWidth: '90vw',
        fontSize: '16px',
      })
    });

    return tooltip;
  }

  cleanup() {
    this._hideAllTooltips();

    if (this.isMobile) {
      document.removeEventListener('touchstart', this._handleGlobalTouch);
      document.removeEventListener('click', this._handleGlobalClick);
    }

    const commentElements = document.querySelectorAll('.comment, .variant');
    commentElements.forEach(element => {
      const newElement = element.cloneNode(true);
      if (element.parentNode) {
        element.parentNode.replaceChild(newElement, element);
      }
      newElement.removeAttribute('tabindex');
      newElement.style.cursor = '';
    });
  }
}