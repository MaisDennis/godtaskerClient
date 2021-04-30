import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  :root {
    --color-background: #f5f5f5;
    --color-1-lighter: #ddd;
    --color-1-light: #ccc;
    --color-1: #999;
    --color-1-dark: #666;
    --color-1-darker: #222;
    --color-2-light: #daf1e0;
    --color-2: #04D361;
    --color-2-dark: #04BF58;
    --color-3: #73a6c4;
    --color-3-dark: #334466;
    --color-red:
    --color-orange:
    --color-yellow:
    --color-title-in-primary: #FFFFFF;
    --color-text-in-primary: #D4C2FF;
    --color-text-title: #32264D;
    --color-text-complement: #9C98A6;
    --color-text-base: #6A6180;
    --color-input-background: #f5f5f5;
    --color-button-text: #fff;
    --color-button-background: #18A0FB;

    --color-title-in-primary: #FFFFFF;
    --color-text-in-primary: #D4C2FF;
    --color-text-title: #32264D;
    --color-text-complement: #9C98A6;
    --color-text-base: #6A6180;
    --color-line-in-white: #E6E6F0;
    --color-input-background: #F8F8FC;
    --color-button-text: #FFFFFF;
    --color-box-base: #FFFFFF;
    --color-box-footer: #FAFAFC;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline:0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    /* font-family: 'Fira Sans', sans-serif; */
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }


`;
