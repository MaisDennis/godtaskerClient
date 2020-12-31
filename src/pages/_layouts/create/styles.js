import styled from 'styled-components';
import search from '~/assets/search-24px.svg';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  max-width: 70%;
  margin: 0px auto;
  border-radius: 4px;
  padding: 1rem;
  padding-bottom: 30px;
  background: #F5F5F5;
  /* background: #a0daa9; */

  @media (max-width: 1000px) {
    max-width: 80%;
  }
  @media (max-width: 620px) {
    padding: 24px 4px;
    margin: 0px 10px;
    max-width: 100%;
  }

  header {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    border-radius: 4px;
    margin: 4px 0 10px;
    /* background: #a0daa9; */
    @media (max-width: 620px) {
      height: auto;
    }
  }
  strong {
    max-height: 50px;
    width: 210px;
    font-size: 16px;
    font-weight: 600;

    text-align: left;
    margin: auto 4px;

    color: #58595B;
    /* background-color: #4433ff; */
    @media (max-width: 620px) {
      font-size: 4vw;
      margin: 4px 0;
    }
  }

  details {
    font-size: 10px;
    line-height: 32px;
    align-self: baseline;
    width: 100%;
    padding: 0 14px;
    margin: 0 4px 0 4px;
    /* background-color: #43ff; */
  }

  input {
    height: 44px;
    width: auto;
    margin: 4px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    padding: 0 12px;
    color: #444444;
    background-color: #FFFFFF;
    &::placeholder {
      color: #DDDDDD;
    }
    @media (max-width: 620px) {
      font-size: 3vw;
      width: 96%;
      margin: auto;
    }
    @media (max-width: 350px) {
      width: 50%;
    }
  }
  .header-bottom-div {
    display: flex;
    justify-content: space-between;
    height: auto;
    width: 100%;
    margin: 0;
    /* background: #5c44; */
  }
  .header-input {
    visibility: hidden;
  }
  .header-button-div {
    width: auto;
    padding: 0 4px;
    /* background: #e88; */
  }
  .back-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    margin: 5px 5px 0;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    background: #58595B;
    &:hover {
      background: ${darken(0.05, '#58595B')};
    }
    @media (max-width: 620px) {
      width: auto;
      font-size: 3vw;
      margin: 0 4px;
      padding: 12px;
    }
  }
  .save-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    /* margin: 5px 5px 0; */
    border: 0;
    border-radius: 4px;
    color: #fff;
    background: #f64C75;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#f64C75')};
    }
    @media (max-width: 620px) {
      width: auto;
      font-size: 3vw;
      margin: 0 4px;
      padding: 12px;
    }
  }

  .form-body-div {
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 0 5px;
    border-radius: 4px;
    padding: 0 24px;
    background: #FFF;
    /* background: #a0daa9; */
    @media (max-width: 620px) {
      padding: 0;
    }
  }
  .sub-content-line-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 4px 0;
    /* background-color: #f6f6; */
  }
  .sub-content-line-divider-div {
    display: flex;
    flex-direction: row;
    /* background: #ff4; */
  }
  label {
    width: auto;
    font-weight: bold;
    text-align: left;
    margin: .5rem 4px 0 4px;
    color: #444444;
    /* background: #666; */
    @media (max-width: 620px) {
      font-size: 3vw;
      margin: 14px 4px 4px 10px;
    }
  }

  .checkbox-label {
    display: flex;
    flex-direction: row;
    /* background-color: #ff87; */
  }

  .checkbox-input {
    height: 22px;
  }

  .form-span {
    font-size: 14px;
    font-weight: 400;
    margin: auto 4px;
    /* background: #666; */
  }
  .observations-span {
    font-size: 12px;
    width: auto;
    text-align: left;
    margin: auto 4px;
    color: #ff6e3a;
    /* background: #666; */
    @media (max-width: 620px) {
      font-size: 3vw;
      margin: 4px 4px 4px 10px;
    }
  }

  .list-span {
    margin: 4px 32px;
  }
  .description-textarea {
    height: 88px;
    width: auto;
    font-family: Fira Sans, sans-serif;
    line-height: 24px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    margin: 4px 4px;
    padding: 10px 12px;
    color: #444444;
    &::placeholder {
      color: #DDDDDD;
    }
    @media (max-width: 620px) {
      width: 98%;
      margin: auto;
    }
  }

  .sub-task-input {
    height: auto;
    min-height: 56px;
    width: auto;
    font-family: Fira Sans, sans-serif;
    line-height: 24px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    margin: 4px 4px;
    padding: 10px 12px;
    color: #444444;
    &::placeholder {
      color: #DDDDDD;
    }
    @media (max-width: 620px) {
      width: 98%;
      margin: auto;
    }
  }

  .sub-task-add-button {
    height: 36px;
    width: 214px;
    font-size: 14px;
    font-weight: bold;
    margin: 8px 4px 4px 4px;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    background: #999;
    &:hover {
      background: ${darken(0.05, '#999')};
    }
    @media (max-width: 620px) {
      width: auto;
      font-size: 3vw;
      margin: 0 4px;
      padding: 12px;
    }
  }

  .sub-task-ol {
    list-style-type: decimal;
  }

  .sub-task-li {
    line-height: auto;
    margin: 20px;
    padding: 12px;
    border-bottom: 1px solid #CCC;
    /* background-color: #f00; */
  }
  .sub-task-dangle-list-style {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 24px;

    white-space: pre-line;
    color: #444444;
    /* background-color: #fff131; */
  }
  .sub-task-icons {
    display: flex;
    align-items: center;

    font-size: 24px;
    cursor: pointer;
  }
  .sub-task-edit-icon {
    color: #444444;
    margin: 0 12px;

  }
  .sub-task-remove-icon {
    color: red;
  }

  .radio-div {
    display: flex;
    flex-direction: row;
  }

  .gender-select  {
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    height: 44px;
    width: auto;
    padding: 0 15px;
    color: #111;
    margin: 4px 4px;
    justify-content: space-between;
    @media (max-width: 620px) {
      font-size: 3vw;
      width: 96%;
      margin: auto;
    }
  }

  .row-div {
    display: flex;
    flex-direction: row;
  }

`;


