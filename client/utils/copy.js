  function createCopyableTextArea(inputText) {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const textArea = document.createElement('textarea');
    // Prevent zooming on iOS
    textArea.style.fontSize = '12pt';
    // Reset box model
    textArea.style.border = '0';
    textArea.style.padding = '0';
    textArea.style.margin = '0';
    // Move element out of screen horizontally
    textArea.style.position = 'absolute';
    textArea.style[ isRTL ? 'right' : 'left' ] = '-9999px';
    // Move element to the same position vertically
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    textArea.style.top = `${yPosition}px`;

    textArea.setAttribute('readonly', '');
    textArea.value = inputText;

    return textArea;
  }

  // copies inputtext to the clipboard by creating and selecting a dummy element.
  export default function copyToClipboard(inputText) {
    const textArea = createCopyableTextArea(inputText);

    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);

    try {
      return document.execCommand('copy');
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
