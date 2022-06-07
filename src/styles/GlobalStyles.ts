import { css } from '@emotion/react';
import SUIT_M from '../assets/font/SUIT-Medium.otf';
import SUIT_B from '../assets/font/SUIT-Bold.otf';
import SUIT_SB from '../assets/font/SUIT-SemiBold.otf';

export const globalStyles = css`
  @font-face {
    font-family: 'SUIT-M';
    src: url(${SUIT_M});
  }
  @font-face {
    font-family: 'SUIT-B';
    src: url(${SUIT_B});
  }
  @font-face {
    font-family: 'SUIT-SB';
    src: url(${SUIT_SB});
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'SUIT-M';
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  ol,
  li,
  ul {
    list-style: none;
  }
  textarea {
    resize: none;
    outline: none;
  }
  input,
  select,
  button {
    border: none;
    outline: none;
    box-sizing: border-box;
    background: none;
  }
  button {
    background: none;
    cursor: pointer;
  }
`;
