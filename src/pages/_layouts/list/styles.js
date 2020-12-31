import styled from 'styled-components';
import search from '~/assets/search-24px.svg';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  /* max-height: 92vh;  */
  max-width: 100%;

  /* background: #a0daa9; */
  @media (max-height: 680px) {
    padding: 24px 4px;
    max-height: none;
  }
  strong {
    max-height: 50px;
    width: 210px;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    margin: auto 4px;
    overflow: hidden;
    color: #444;
    /* background: #9d9eb4; */
  }

  label {
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    margin: auto 4px;
    overflow: hidden;
    color: #000;
    /* background: #a0daa9; */
  }

  input {
    height: 24px;
  }

  img {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    margin: auto 0px auto 4px;
  }

  .container-div {
    margin: 0 8px;
    padding: 1rem;
    padding-bottom: 30px;
    border: 1px solid #111;
    border-radius: 4px;
    background-color: #F5F5F5;
  }
  .container-div.left {
    width: 72%;
    /* background: #a0d9; */
  }
  .container-div.right {
    width: 28%;
    /* background: #a044; */
  }

  @media (max-width: 620px) {
    strong {
      font-size: 2vw;
      margin: auto 1px;
    }
  }
`;

export const TaskListDiv = styled.div`
  .list-header {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    border-radius: 4px;
    padding: 0;
    margin: 4px 0 10px;
    /* background: #a0da; */
    @media (max-width: 620px) {
      height: auto;
    }
  }

  .list-header-div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    padding: 4px 0;
    /* background: #a0daa9; */
  }
  .header-input {
    height: 44px;
    width: 300px;
    font-size: 16px;
    font-weight: normal;
    text-indent: 24px;
    color: #333;
    border: 0;
    border-radius: 4px;
    padding: 0px 15px;
    background: #FFF url(${search}) no-repeat center left 7px;
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

  .title-bar {
    display: flex;
    justify-content: space-between;
    /* height: 60px; */
    width: 100%;
    border-radius: 4px;
    padding: .5rem 0 .5rem;
    margin: 1rem auto 0 ;
    /* background: #b86d29; */

  }

  .date-div {
    display: flex;
    justify-content: space-between;
    width: 16rem;
    background-color: #F00;
  }

  .title-strong {
    min-width: 230px;
    text-align: center;
    /* background: #ffc87c; */
  }

  .short-tag {
    width: 110px;
    text-align: center;
    /* background-color: #fff; */
  }
  .short-tag-last {
    width: 110px;
    /* background-color: #fff; */
  }

  .long-tag {
    width: 100%;
    max-width: 990px;
  }

  .name-label {
    margin-right: 0;
  }

  .long-label {
    width: 100%;
    max-width: 990px;
  }

  .title-photo-and-name {
    max-height: 70px;
    width: 310px;
    overflow: hidden;
    /* background: #ffc87c; */
  }
  .item-list {
    min-height: 35vh;
    max-height: 45vh;
    margin-bottom: 12px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
    }
  }
  @media (max-width: 620px) {
    .title-bar {
      height: auto;
      width: auto;
      margin: 0;
    }
  }
`;

export const TaskDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 4px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  background-color: #fff;

  .test {
    display: flex;
  flex-direction: column;

  }

  .task-details-label {
    width: auto;
    font-weight: bold;
    text-align: left;
    line-height: 24px;
    margin: .5rem 4px 4px 4px;
    color: #444444;
    /* background: #666; */
  }



  .task-details-description-div {
    height: auto;
    line-height: 24px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px 12px;

    background-color: #F5F5F5;
  }

  .sub-tasks-div {
    display: flex;
    flex-direction: column;
    /* padding: 4px; */
    /* background-color: #ff4; */
  }
  .sub-tasks-list-div {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    padding: 10px 12px;
    /* border: 1px solid #111; */
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #F5F5F5;
    /* background-color: #F5F5; */
  }

  .sub-task-checkbox-label {
    display: flex;
    flex-direction: row;
    height: auto;
    text-align: left;
    line-height: 24px;
    white-space: pre-line;
    margin-bottom: 24px;
    /* background-color: #f00; */
  }

  .sub-tasks-checkbox-input {
    height: 22px;
    width: auto;
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
    background-color: #555;
  }

  .sub-tasks-checkbox-span {
    font-weight: 400;
    margin: auto 12px;
    /* background: #666; */
  }

  .task-details-aside {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    width: 10vw;
    padding: auto;
    /* background-color: #F5F; */
  }
  .task-details-button-div {
    display: flex;
    height: 100%;
    margin: 36px 0 0;
    /* background-color: #222; */
  }

  .task-details-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: 600;
    border: 0;
    border-radius: 4px;
    margin: 1rem auto;
    color: #fff;
    background: #666;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#666')};
    }
    @media (max-width: 620px) {
      width: auto;
      font-size: 3vw;
      margin: 0 4px;
      padding: 12px;
    }
  }

  .task-details-bottom-div {
    display: flex;
    justify-content: space-around;
    background-color: #999;
  }


`;

export const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 4px;
  /* background-color: #5edc1f; */

  .message-conversation-div {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 4px;
    margin: 1.5rem 0;
    /* border: 1px solid #111; */
    border-radius: 4px;
    overflow-y: scroll;
    background-color: #fff;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
    }
  }

  .message-div {
    height: auto;
    width: 90%;
    margin: 0 auto;
    padding: 4px 0;
    border-bottom: 1px solid #F5F5F5;
  }

  .message-div.user {
    text-align: right;

  }

  .message-div.worker {
    text-align: left;
    /* background-color: #ccc; */
  }

  .message-span {
    /* display: flex; */
    font-size: 14px;
    line-height: 36px;
    align-self: center;
    padding: 4px 12px;
    margin: 0 4px;
    border-radius: 8px;
    background-color: #fff;
  }

  .message-span.user {
    background-color: #daf1e0;
  }
  .message-span.worker {
    background-color: #b4c7db;
  }
  .message-time-span {
    font-size: 10px;
    color: #444;
  }

  .message-time-span.user {

  }


  .message-form {

  }

  .message-input {
    width: 100%;
    margin: 4px 0 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;

  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;

  .line-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    min-height: 36px;
    width: 100%;
    border-radius: 24px;
    padding: .5rem 0;
    margin: 4px auto 0;
    background-color: #fff;
    /* background: #d1ffbd; */
  }

  .item-label {
    min-width: 230px;
    /* background: #eac853; */
  }

  .photo-and-name-div {
    display: flex;
    justify-content: space-between;
    width: 310px;
    margin: auto 4px;
    /* background: #eac853; */
  }

  .select-div {
    display: flex;
    flex-direction: row;
    width: 110px;
    /* background-color: #4433ff; */
  }

  .list-select {
    height: 24px;
    width: 88px;
    background-color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-align: center;

    margin: auto;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0 4px;
    overflow: hidden;
    color: #000;
    /* background: #a0daa9; */
  }

  .list-select.alta {
    color: #fff;
    border: none;
    background-color: #d87678;
  }

  .list-select.média {
    color: #fff;
    border: none;
    background-color: #eb7d5d;
  }

  .list-select.baixa {
    color: #fff;
    border: none;
    background-color: #f6d255;
  }
  .list-option {
    font-weight: 600;
    color: #111;
    background-color: #F5F5F5;
  }

  .date-div {
    display: flex;
      justify-content: space-between;
      width: 16rem;
      background-color: #F00;
    }
  .startdate {
    width: 110px;
    border-radius: 16px;
    padding: 2px;
    background: #F5F5F5;
  }
  .duedate {
    width: 110px;
    border-radius: 16px;
    padding: 2px;
  }




  .whatsappbutton {
      border-radius: 4px;
      height: 30px;
      width: 30px;
      padding-top: 2%;
      background: linear-gradient(to right top, #00ff00, #bbee11);
      border: 0;
    }

  @media (max-width: 620px) {
    height: auto;
    min-height: 44px;
    .task-photo-and-name {
      width: 100%;
      margin: 0 1px;
    }
    img {
      height: 0;
      width: 0;
      margin: auto 0;
    }
    .person {
      font-size: 2vw;
    }
    label {
      max-height: 100%;
      font-size: 2vw;
      margin: auto 1px;
    }
    .whatsappbutton {
        height: 22px;
        width: 22px;
      }
  }
`;


