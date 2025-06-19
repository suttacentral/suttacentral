import { css } from 'lit';

export const scrollbarStyle = css`
  .sc-scrollbar::-webkit-scrollbar {
    width: var(--sc-size-sm);
    height: var(--sc-size-sm);
  }

  .sc-scrollbar::-webkit-scrollbar-button {
    height: 0;
    width: 0;
  }

  .sc-scrollbar::-webkit-scrollbar-button:start:decrement,
  .sc-scrollbar::-webkit-scrollbar-button:end:decrement {
    display: block;
  }

  .sc-scrollbar::-webkit-scrollbar-button:start:increment,
  .sc-scrollbar::-webkit-scrollbar-button:end:increment {
    display: block;
  }

  .sc-scrollbar::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .sc-scrollbar::-webkit-scrollbar-track {
    background-clip: padding-box;
    background: transparent 0 0;
  }

  .sc-scrollbar::-webkit-scrollbar-track:hover {
    box-shadow: none;
    background-color: transparent;
  }

  .sc-scrollbar::-webkit-scrollbar-track:horizontal:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .sc-scrollbar::-webkit-scrollbar-track:vertical {
    border-left: 5px solid transparent;
  }

  .sc-scrollbar::-webkit-scrollbar-track:horizontal {
    border-left: 5px solid transparent;
  }

  .sc-scrollbar::-webkit-scrollbar-thumb {
    -webkit-box-shadow: none;
    box-shadow: none;
    min-height: var(--sc-size-lg);
  }

  .sc-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--sc-icon-color);
  }

  .sc-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: var(--sc-inverted-text-color);
  }

  .sc-scrollbar::-webkit-scrollbar-thumb:active {
    background-color: var(--sc-on-primary-secondary-text-color);
  }

  .sc-scrollbar::-webkit-scrollbar-thumb:vertical {
    border-width: 5px 0 0 0;
    padding-top: 100px;
  }

  .sc-scrollbar::-webkit-scrollbar-thumb:horizontal {
    border-width: 5px 0 0 0;
    padding-left: 100px;
  }
`;
