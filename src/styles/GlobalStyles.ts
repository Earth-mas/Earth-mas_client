import { css } from '@emotion/react';

export const globalStyles = css`
  @font-face {
    font-family: 'SUIT-M';
    src: url('/font/SUIT-Medium.otf');
  }
  @font-face {
    font-family: 'SUIT-B';
    src: url('/font/SUIT-Bold.otf');
  }
  @font-face {
    font-family: 'SUIT-SB';
    src: url('/font/SUIT-SemiBold.otf');
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
