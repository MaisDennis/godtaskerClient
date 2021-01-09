import styled, { css } from 'styled-components';
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
    overflow: hidden;
    color: #444;
    /* background: #9d9eb4; */
  }

  label {
    font-size: 14px;
    font-weight: normal;
    text-align: center;
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

  .task-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0 0;
    border: 1px solid #58595B;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    background: #58595B;
    &:hover {
      background: ${darken(0.2, '#58595B')};
    }
    @media (max-width: 620px) {
      width: auto;
      font-size: 3vw;
      margin: 0 4px;
      padding: 12px;
    }
  }

  .task-button.search {
    width: 220px;
    margin: 0 12px 0 0;
  }

  .container-div {
    width: 100%;
    margin: 0 8px;
    padding: 1rem;
    padding-bottom: 30px;
    border: 1px solid #111;
    border-radius: 4px;
    background-color: #F5F5F5;
  }
  .container-div.left {
    width: 75%;
    /* background: #a0d9; */
  }
  .container-div.right {
    width: 25%;
    height: 90vh;
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
    margin: 1rem 0 0;
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

  .title-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;

    padding: .5rem 10px .5rem 5px;
    margin: 1rem 0 .5rem;
    border-radius: 4px;
    /* box-shadow: 2px 2px 2px #ccc; */
    border-bottom: 1px solid #ccc;
    /* background-color: #fff; */
    /* background: #b86d29; */

  }

  .title-strong {
    width: 220px;
    max-width: 220px;
    text-align: center;
    margin: auto 0;
    /* background: #ffc87c; */
  }

  .worker-strong {
    width: 330px;
    max-width: 330px;
    text-align: center;
    margin: auto 0;
    /* background: #ffc87c; */
  }

  .short-tag {
    width: 110px;
    text-align: center;
    margin: auto 0;
    /* background-color: #fff; */
  }
  .short-tag-last {
    width: 48px;
    text-align: center;
  }

  .bell-tag {
    padding: auto;
    width: 48px;
    text-align: center;
    margin: auto 0;
    /* background-color: #ff4; */
  }

  .bell-tag.last {
    padding: auto;
    width: 48px;
    margin: auto 0;
    margin-right: 12px;
    /* background-color: #ff4; */
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


  .item-list {
    min-height: 35vh;
    max-height: 45vh;
    margin-bottom: 12px;
    border-radius: 4px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
    }
    background-color: #fff;
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

  .task-details-div {
    display: flex;
    flex-direction: column;
  }

  .task-details-strong {
    width: 100%;
    margin: .5rem 4px 1rem 4px;

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

  .sub-tasks-checkbox-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    line-height: 24px;
    border-bottom: 1px solid #ccc;
    margin: 12px auto;

  }

  .sub-tasks-checkbox-label {
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

  .sub-tasks-buttons-div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 12px 0;
    /* background-color: #222; */
  }

  .task-details-bottom-div {
    display: flex;
    justify-content: space-around;
    background-color: #999;
  }

  .task-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0 0 12px;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    background: #58595B;
    &:hover {
      background: ${darken(0.2, '#58595B')};
    }
    @media (max-width: 620px) {
      width: auto;
      font-size: 3vw;
      margin: 0 4px;
      padding: 12px;
    }
  }

  .task-button.edit {
    /* background: #58595B; */
  }
  .task-button.remove {
    /* background: #58595B; */
  }
  .task-button.score {
    /* background: #58595B; */
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

  .message-header {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 0;
    margin: 4px 0 10px;
    /* background-color: #22eeee; */
  }

  .list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  }

  .worker-profile-div {
    display: flex;
    flex-direction: row;
    padding: auto;
    /* background-color: #4433ee; */
  }

  img {
    height: 3rem;
      max-height: 220px;
      width: 3rem;
      max-width: 120px;
      border-radius: 50%;
      margin: 12px 12px 4px 0;
  }

  .worker-profile-label {
    display: flex;
    margin: auto;
    align-self: center;
    /* background-color: #f00; */
  }

  .message-menu-div {
    display: flex;
    flex-direction: row;
  }

  .message-menu-button {
    width: 48px;
    border: none;
    color: #888;
    background-color: #F5F5F5;
  }

  .message-conversation-div {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 4px;
    margin: 0 0 0.5rem;
    border: 1px solid #ccc;
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

  .message-container-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 90%;
    margin: 0 auto;
    padding: 0 0 8px 0;
    border-bottom: 1px solid #F5F5F5;
    /* background-color: #F00; */
  }

  .message-container-div.worker {
    align-items: flex-start;
  }

  .message-dropMenu-ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: #443333;
  }

  .message-dropMenu-li {
    margin: 0 4px;
    padding: 4px 12px;
    list-style-type: none;
    box-shadow: 2px 2px 2px #ccc;
    background-color: #F5F5F5;
    /* background-color: #4433ee; */
  }

  .message-dropMenu-button {
    color: #999;
    border: none;
    margin: 0 4px;
    background-color: #F5F5F5;
    /* background-color: #334422; */
  }

  .time-message-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 90%; */
    margin: 4px 0;
    /* border-bottom: 1px solid #F5F5F5; */
    /* background-color: #F00; */
  }

  .time-message-div.user {
    justify-content: flex-end;
  }

  .time-message-div.worker {
    background-color: #fff;
  }

  .message-line-div {
    display: flex;
    flex-direction: column;

    height: auto;
    margin: 4px;
    padding: 4px;
    border-radius: 8px;
  }

  .message-line-div.user {
    background-color: #daf1e0;
  }

  .message-line-div.worker {
    background-color: #b4c7db;
  }

  .reply-on-top-div {
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
    padding: 8px;
    opacity: .9;
    background-color: #F5F5F5;

    border-radius: 4px;
  }

  .reply-name-span {
    font-size: 13px;
    color: blue;
    margin-bottom: 8px;
  }

  .reply-on-top-span {

  }

  .message-arrow-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    /* background-color: #4433ee; */
  }

  .message-arrow-div.removed {
    padding-left: 4px;
    /* background-color: #f00; */
  }

  .message-span {
    /* display: flex; */
    font-size: 14px;
    max-width: 85%;
    align-self: center;
    margin: 0 8px;
    /* background-color: #fff; */
  }

  .message-span.user {
    background-color: none;
  }
  .message-span.worker {
    background-color: none;
  }

  .message-time-span {
    font-size: 10px;
    color: #444;
  }
  .temporary-message-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .temporary-message-div {
    height: auto;
    line-height: 24px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
    /* border-bottom: 4px solid #b4c7db; */
    /* box-shadow: 2px 2px 2px #ccc; */
    padding: 10px 12px;
    margin-bottom: 4px;

    background-color: #F5F5F5;
  }

  .message-input {
    width: 100%;
    margin: 4px 0 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }

  .message-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0 0;
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
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-around;
  border-radius: 24px;
  padding: 0 4px;

  .line-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    min-height: 36px;
    width: 100%;
    border-radius: 24px;
    border: 1px solid #ccc;
    padding: .5rem 0;
    margin: 8px auto 0;
    background-color: #fff;
    /* background: #d1ffbd; */
  }

  .worker-profile-div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 330px;
    /* background: #d1ffbd; */
  }

  img {
    height: 3rem;
      max-height: 220px;
      width: 3rem;
      max-width: 120px;
      border-radius: 50%;
      margin: 12px 12px 4px 0;
  }

  .item-label {
    width: 220px;
    max-width: 220px;
    overflow: hidden;
    margin: auto 0;
    /* background: #eac853; */
  }

  .short-label {
    width: 110px;
    max-width: 110px;
    margin: auto 0;
    /* background-color: #daf1e0; */
  }

  /* .photo-and-name-div {
    display: flex;
    justify-content: space-between;
    width: 310px;
    margin: auto 4px;
    background: #eac853;
  } */

  .list-select {
    height: 24px;
    width: 110px;
    max-width: 110px;
    background-color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    align-self: center;
    margin: auto 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    /* padding: 0 4px; */
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
    background-color: #ff892e;
  }

  .list-select.baixa {
    color: #fff;

    border: none;
    background-color: #ffdd33;
  }
  .list-option {
    font-weight: 600;
    color: #111;
    background-color: #F5F5F5;
  }

  /* .date-div {
    display: flex;
      justify-content: space-between;
      width: 16rem;
    } */

  .startdate {
    width: 110px;
    border-radius: 24px;
    padding: 2px;
    margin: auto 0;
    background: #F5F5F5;
  }
  .duedate {
    width: 110px;
    max-width: 110px;
    border-radius: 24px;
    padding: 2px;
    margin: auto 0;
  }
  .duedate.red {

    background-color: #d87678;
  }

  .duedate.green {

    background-color: #daf1e0;
  }

  .status-label {
  display: flex;
  flex-direction: row;
  width: 110px;
  max-width: 110px;
  margin: auto 0;
  border-radius: 16px;
  /* background-color: #daf1e0; */
}
.status-complete-div {
  display: flex;
  flex-direction: row;
  width: 70%;
  padding: auto;
  border-radius: 16px;
  background-color: #F5F5F5;
}

.status-incomplete-div {

  height: 20px;
  border-radius: 16px;
  background-color: #daf1e0;
}

.status-span {
  position: relative;
  line-height: 20px;
  margin: auto;
  /* background-color: #999; */
}

.bell-label {
  display: flex;
  align-items: center;
  padding: auto;
  width: 48px;
  /* background-color: #999; */
}

.bell-label.last {
  display: flex;
  align-items: center;
  width: 48px;
  margin-right: 12px;
  /* background-color: #999; */

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

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
  display: flex;
  margin: auto;
  ${props => props.hasUnread && css`
    visibility:${props.hasUnread || 'hidden'};
    /* visibility: hidden; */
    &::after {
      position: absolute;
      right: 0;
      top: 0;
      width: 16px;
      height: 16px;
      background: #daf1e0;
      color: #111;
      font-size: 12px;
      /* padding-top: 1px; */
      content: '${props.hasUnread}';
      border-radius: 50%;
    }
`}
`;
