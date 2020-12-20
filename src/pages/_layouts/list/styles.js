import styled from 'styled-components';
import search from '~/assets/search-24px.svg';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 78vh;
  max-width: 100%;
  margin: 0 10px;
  border-radius: 4px;
  padding: 1rem;
  padding-bottom: 30px;
  background-color: #F5F5F5;
  /* background: #a0daa9; */
  @media (max-height: 680px) {
    padding: 24px 4px;
    max-height: none;
  }
  header {
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100%;
    margin: 0 0 .5rem;
    background-color: #F5F5F5;
    /* background: #a0daa9; */
  }
  strong {
    text-align: left;
    font-size: 20px;
    margin: 10px 0;
    color: #58595B;
  }
  .list-header-div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: .5rem 0;
    /* background: #a0daa9; */
    input {
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
    input.cssSpaceFiller {
      visibility: hidden;
    }
  }
  @media (max-width: 620px) {
    padding: 24px 4px;
    strong {
      font-size: 4vw;
      margin: 4px 0;
    }
    header {
      height: auto;
    }

    .list-header-div {
      font-size: 3vw;
      width: 60%;
      padding: 0;
      text-indent: 34px;
    }
  }

  .title-bar {
    display: flex;
    justify-content: space-between;
    /* height: 60px; */
    width: 100%;
    border-radius: 4px;
    padding: .5rem 0;
    margin: 1rem auto 0;
    background: #b86d29;
    strong {
      max-height: 50px;
      width: 210px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin: auto 4px;
      overflow: hidden;
      color: #444;
      background: #9d9eb4;
    }
    .date-div {
      display: flex;
      justify-content: space-between;
      width: 16rem;
      background-color: #F00;
    }
    .short-tag {
      width: 110px;
    }
    @media (max-width: 620px) {
      .title-bar {
        height: auto;
        width: auto;
        margin: 0;
      }
      strong {
        font-size: 2vw;
        margin: auto 1px;
      }

    }
    .title-photo-and-name {
      max-height: 70px;
      width: 310px;
      overflow: hidden;
      /* background: #ffc87c; */
    }
  }
  .item-list {
    max-height: 100%;
  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: column;
  .line-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    min-height: 44px;
    width: 100%;
    border-radius: 4px;
    padding: .5rem 0;
    margin: 1rem auto 0;
    background-color: #fff;
    background: #d1ffbd;
  }

  label {
    max-height: 50px;
    width: 210px;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    margin: auto 4px;
    overflow: hidden;
    color: #000;
    background: #a0daa9;
  }

  .photo-and-name-div {
    display: flex;
    justify-content: space-between;
    width: 310px;
    margin: auto 4px;
    background: #eac853;
  }

  .short-tag {
    width: 110px;
  }

  img {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    margin: auto 0px auto 4px;
  }

  .name-label {
    margin-right: 0;
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
  .task-details-div {
    display: flex;
    flex-direction: row;
    min-height: 10rem;
    /* background-color: #F00; */
  }
  .task-details-aside {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    width: 33.3%;
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
    /* background-color: #999; */
  }

  .task-details-strong {
    width: auto;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    padding: .5rem auto 0;
    color: #444444;
    background: #ff3;
    @media (max-width: 620px) {
      font-size: 3vw;
      margin: 14px 4px 4px 10px;
    }
  }

  .sub-tasks-div {
    display: flex;
    flex-direction: column;
    width: 66.6%;

    margin: 4px;
    /* background-color: #ff4; */
  }
  .sub-tasks-list-div {
    display: flex;
    flex-direction: column;
    height: 80%;
    border: 1px solid #111;
    border-radius: 4px;

    /* background-color: #F5F; */
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


