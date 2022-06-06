import { css } from '@emotion/react'

export const globalStyles = css`
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  body {
    line-height: 1;
  }
  ol,
  li,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  textarea {
    resize: none;
    box-sizing: border-box;
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
    padding: 0;
  }
`
