import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

export class CommentTooltipManager {
  constructor() {
    this.activeTooltip = null;
    this.cleanup = null;
    this.debounceTimer = null;
    this.hideTimer = null;
    this.isTooltipHovered = false;
  }

  async initializeComments() {
    const commentElements = document.querySelectorAll('.comment, .variant');
    commentElements.forEach(element => {
      if (this._hasContent(element)) {
        element.addEventListener('mouseenter', (e) => this._showTooltip(e.target));
        element.addEventListener('mouseleave', (e) => this._scheduleHideTooltip(e));
        element.addEventListener('focus', (e) => this._showTooltip(e.target));
        element.addEventListener('blur', (e) => this._scheduleHideTooltip(e));
        element.setAttribute('tabindex', '0');
        element.style.cursor = 'help';
      }
    });
  }

  _hasContent(element) {
    // Checks if the element has text content (excluding the case where there is only a * symbol)
    const textContent = element.textContent || '';
    const cleanContent = textContent.replace(/^\*\s*/, '').trim();
    return cleanContent.length > 0;
  }

  async _showTooltip(referenceElement) {
    clearTimeout(this.hideTimer);
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(async () => {
      await this._showTooltipImmediate(referenceElement);
    }, 150);
  }

  _scheduleHideTooltip(e) {
    // Delay hiding to give users time to move to the tooltip
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      if (!this.isTooltipHovered) {
        this._hideTooltip();
      }
    }, 200);
  }

  async _showTooltipImmediate(referenceElement) {
    this._hideTooltip();

    const tooltipContent = this._extractTooltipContent(referenceElement);
    if (!tooltipContent) return;

    const tooltip = this._createTooltipElement(tooltipContent, referenceElement);
    document.body.appendChild(tooltip);

    this._addTooltipEventListeners(tooltip);

    // Positioning with Floating UI
    const { x, y, placement, middlewareData } = await computePosition(referenceElement, tooltip, {
      placement: 'top',
      middleware: [
        offset(8),
        flip({
          fallbackPlacements: ['bottom', 'right', 'left'],
        }),
        shift({ padding: 8 })
      ],
    });

    // Apply position and animation
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
      opacity: '1',
      transform: 'scale(1)',
      visibility: 'visible'
    });

    this.activeTooltip = tooltip;

    // Automatically update position (handle scrolling, etc.)
    this.cleanup = autoUpdate(referenceElement, tooltip, async () => {
      if (this.activeTooltip) {
        const { x, y } = await computePosition(referenceElement, tooltip, {
          placement: 'top',
          middleware: [offset(11), flip(), shift({ padding: 8 })]
        });

        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      }
    });
  }

  _addTooltipEventListeners(tooltip) {
    // When the mouse enters the tooltip, cancel hiding
    tooltip.addEventListener('mouseenter', () => {
      clearTimeout(this.hideTimer);
      this.isTooltipHovered = true;
    });

    // When the mouse leaves the tooltip, hide all tooltips immediately
    tooltip.addEventListener('mouseleave', () => {
      this.isTooltipHovered = false;
      clearTimeout(this.hideTimer);
      this._hideAllTooltips(); // Directly hide all tooltips
    });

    // Add click event to prevent propagation
    tooltip.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Add keyboard support - ESC key to close
    tooltip.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this._hideAllTooltips();
      }
    });
  }

  _hideAllTooltips() {
    // Clear all timers
    clearTimeout(this.debounceTimer);
    clearTimeout(this.hideTimer);
    this.isTooltipHovered = false;

    // Hide the current active tooltip
    if (this.activeTooltip) {
      this._hideTooltip();
    }

    // Ensure all possible floating-tooltip elements are removed
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
    // Extract tooltip content from the element's content
    if (element.classList.contains('comment')) {
      // For comments, use innerHTML directly (may contain formatted content)
      return element.innerHTML.replace(/^\*\s*/, '').trim();
    } else if (element.classList.contains('variant')) {
      // For variants, get the text content
      const textContent = element.textContent || '';
      const cleanContent = textContent.replace(/^\*\s*/, '').trim();
      // If there is no "Variant: " prefix, add it
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

    // Set different styles based on type
    if (referenceElement.classList.contains('comment')) {
      tooltip.classList.add('comment-tooltip');
    } else if (referenceElement.classList.contains('variant')) {
      tooltip.classList.add('variant-tooltip');
    }

    tooltip.innerHTML = content;

    // Initial Style - Important: Set pointerEvents to auto to allow interaction
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
      cursor: 'default'
    });

    return tooltip;
  }

  cleanup() {
    this._hideAllTooltips();
    // Remove all event listeners
    const commentElements = document.querySelectorAll('.comment, .variant');
    commentElements.forEach(element => {
      // Arrow functions bound event listeners need special handling
      // Here we simply remove all possible listeners
      const newElement = element.cloneNode(true);
      element.parentNode.replaceChild(newElement, element);
      // Clear attributes
      newElement.removeAttribute('tabindex');
      newElement.style.cursor = '';
    });
  }
}