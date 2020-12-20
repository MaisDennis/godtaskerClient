import styled from 'styled-components';
import { darken } from 'polished';
export const Wrapper = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  height: auto;
  min-height: 100%;
  background: #222;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  height: auto;
  text-align: center;


  /* background: #F5f; */
  img.logo {
    width: 66.6%;
    height: auto;
    @media (max-width: 620px) {
    width: 44.4%;
    margin-top: 24px;
    }
  }
  img.godtasker {
    border-radius: 4px;
    opacity: 1;
    width: 100%;
    margin: auto;
    height: auto;
    color: white;
    @media (max-width: 620px) {
      margin: auto;
      width: 66.6%;
      margin-bottom: 24px;
      /* background: #868; */
    }
  }
  p {
    font-family: 'Fira Sans', sans-serif;
    font-weight: bold;
    font-size: 22px;
    color: #58595B;
    /* height: 500px; */
    margin: 24px auto;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    @media (max-width: 620px) {
      margin-top: 0px;
      margin-bottom: 30px;
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
      background: rgba(0,0,0,0.3);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
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
      margin: 5px 0 0;
      height: 44px;
      background: #58595B;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#58595B')};
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
  }
`;
