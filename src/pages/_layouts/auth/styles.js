import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
/* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
  font-family: sans-serif;
  height: auto;
  min-height: 100%;
  background: #222;
`;

export const Content = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  /* background-color: #F5f; */

  .sign-in-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    text-align: center;
    /* background-color: #4433ee; */
  }

  .sign-in-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    max-width: 320px;
    height: auto;
    text-align: center;
    /* background-color: #F5f; */
  }

  .logo-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    /* background-color: #F00; */
  }
  .logo {
    width: 50%;
    height: auto;
    @media (max-width: 620px) {
    width: 44.4%;
    margin-top: 24px;
    }
  }
  .logo-sign-up {
    width: 25%;
    height: auto;
  }
  .godtasker {
    border-radius: 4px;
    opacity: 1;
    width: 100%;
    height: auto;
    margin: auto;
    @media (max-width: 620px) {
      margin: auto;
      width: 66.6%;
      margin-bottom: 24px;
      /* background: #868; */
    }
  }
  .godtasker-sign-up {
    border-radius: 4px;
    opacity: 1;
    width: 50%;
    height: auto;
    margin: auto;
  }
  p {
    font-family: 'Fira Sans', sans-serif;
    font-weight: bold;
    font-size: 21px;
    margin: 12px auto;
    color: #666;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    margin: 21px auto;
    padding: auto;
    /* background-color: #ff892e; */

    @media (max-width: 620px) {
      margin-top: 0px;
      margin-bottom: 30px;
    }
  }

  span {
      color: #ff892e;
      font-size: 12px;
      width: 100%;
      /* background-color: #F5d; */
      margin: 0 0 30px 0;
      text-align: left;
      padding-left: 15px;
    }
    input, select {
      height: 44px;
      width: 100%;
      border: 0;
      border-radius: 4px;
      padding: 0 15px;
      margin: 8px 0;
      color: #fff;
      background-color: rgba(0,0,0,0.3);
      &::placeholder {
        color: ${darken(0.3, '#fff')};
      }
    }
    select {
      padding: 0 12px;
    }
    option {
      font-family: 'Fira Sans', sans-serif;
      background: #fff;
      color: ${darken(0.6, '#fff')};
      font-size: 14px;
      margin: auto;
      padding: 0 15px;
    }

    button {
      margin: 4px 0;
      height: 44px;
      width: 100%;
      background: #18A0FB;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#18A0FB')};
      }
    }
    a {
      color: #fff;
      margin: 15px 0;
      font-size: 16px;
      opacity: 0.8;
      &hover {
        opacity: 1;
      }
    }
`;
