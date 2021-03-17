import styled, { css } from 'styled-components';
import search from '~/assets/search-24px.svg';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  font-weight: normal;
  padding: 0 8px;
  /* background-color: #a0d; */

  label {
    text-align: center;
    overflow: hidden;
    color: #222;
    /* background-color: #a0daa9; */
  }
  /* img { */
    /* border: 1px solid #DDDDDD; */
    /* border-radius: 50%; */
    /* margin: auto 0px auto 4px; */
    /* background-color: #f5f5f5; */
    /* background-color: #f00; */
  /* } */

  @media (max-width: 1400px) {
    .list-header-strong {
      font-size: 14px;
    }
  }
  @media (max-width: 620px) {
    flex-direction: column;
  }

  .container-div {
  width: 100%;
    border-radius: 4px;
    margin: 0 4px;
    padding: 12px;
    background-color: #f5f5f5;
    /* background-color: #F5F; */
  }
  .container-div.left {
    width: 75%;
    /* background: #a0d9; */
  }
  .container-div.right {
    width: 25%;
    height: auto;
    /* background: #a044; */
  }

  @media (max-width: 1400px) {
    padding: 0;
  }
  @media (max-width: 620px) {
    .container-div.left {
      width: 100%;
      /* background: #a0d9; */
    }
    .container-div.right {
      width: 100%;
      height: auto;
      /* background: #a044; */
    }
  }
`;

export const ListDiv = styled.div`
  width: 100%;
  padding: 4px;
  background-color: #f5f5f5;

  .list-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 0 20px 0;
    /* background: #a0da; */
  }
  .list-header-title-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 4px 0 12px;
    /* background-color: #4ee; */
  }

  .list-header-strong {
    max-height: 48px;
    width: 20%;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    overflow: hidden;
    color: #444;
    /* background-color: #9d9eb4; */
  }
  .list-header-button-ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style-type: none;
    width: auto;
      /* background-color: #9d9eb4; */
  }
  .list-header-button {
    margin: 0 8px;
    border: none;
    color: #4433ee;
    /* background-color: #F00; */
  }

  .list-header-div {
    display: flex;
    /* justify-content: space-between; */
    width: 100%;
    margin: 4px 0;
    /* background: #a0daa9; */
  }

  .task-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 36px;
    min-width: 108px;
    width: auto;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    margin-right: 8px;
    padding: 4px 21px;
    transition: background 0.2s;
    color: #fff;
    background-color: #4343ee;
    &:hover {
      background-color: ${darken(0.2, '#4433ee')};
    }
  }

  .header-input {
    height: 36px;
    width: auto;
    font-size: 16px;
    font-weight: normal;
    text-indent: 24px;
    border: 0;
    border-radius: 4px;
    padding: 0px 8px;
    color: #222;
    /* background-color: #f00; */
  }

  .title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* padding: 4px 0; */
    margin: 4px 0;
    border-radius: 4px;
    border-bottom: 1px solid #ccc;
    /* background-color: #fff; */
    /* background-color: #b86d29; */
  }

  .title-strong {
    width: 220px;
    max-width: 220px;
    text-align: center;
    cursor: pointer;
    /* background: #ffc87c; */
  }

  .worker-strong {
    width: 330px;
    max-width: 330px;
    text-align: center;
    /* background: #ffc87c; */
  }

  .short-tag {
    width: 110px;
    text-align: center;
    /* background-color: #fff; */
  }

  .short-tag.last {
    margin-right: 4px;
  }

  .bell-tag {
    padding: auto;
    width: 48px;
    text-align: center;
    /* background-color: #ff4; */
  }

  .bell-tag.last {
    padding: auto;
    width: 48px;
    margin-right: 4px;
    /* background-color: #ff4; */
  }

  .others-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 110px;
    max-width: 110px;
    /* background-color: #4433ee; */
  }
  .others-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .others-menu-div {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40px 0;
      right: 4px;
      height: auto;
      width: auto;
      border-radius: 4px;
      background-color: #f5f5f5;
    }
  .others-button {
    /* display: flex;
    align-items: center;
    justify-content: center; */
    border: none;
    margin: 8px 0;
    background: none;
    /* background-color: #F00; */
  }

  .item-list {
    min-height: 35vh;
    max-height: 45vh;
    margin-bottom: 4px;
    border-radius: 4px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: #ccc;
    }
    /* background-color: #e3e; */
  }

  @media (max-width: 1400px) {
    .list-header-strong {
      font-size: .8rem;
    }

    .task-button {
      width: 72px;
      font-size: .8rem;
      padding: 4px 0;
      /* background-color: #f00; */
    }

    .title-bar {
      height: auto;
      width: auto;
      margin: 0;
    }

    .title-strong {
      width: 80px;
      max-width: 220px;
      font-size: .8rem;
      text-align: center;
      /* margin: auto 0; */
      /* background: #ffc87c; */
    }

    .worker-strong {
      width: 80px;
      font-size: .8rem;
      /* background: #ffc87c; */
    }

    .short-tag {
      width: 72px;
      font-size: .8rem;
      text-align: center;
      /* margin: auto 0; */
      /* background-color: #fff; */
    }

    .others-label {
      width: 72px;
      font-size: .8rem;
    }

    .bell-tag {
      font-size: .8rem;
      padding: auto;
      width: 24px;
      text-align: center;
      /* margin: auto 0; */
      /* background-color: #ff4; */
    }

    .bell-tag.last {
      /* padding: auto; */
      width: 24px;
      /* margin: auto 0;
      margin-right: 12px; */
      /* background-color: #ff4; */
    }
  }

  @media (max-width: 620px) {
    .task-button {
      width: 72px;
      /* background-color: #f00; */
    }

    .list-header-strong {
      font-size: .8rem;
    }

    .list-header-button {
      font-size: .6rem;
      /* background-color: #F00; */
    }

    .title-bar {
      height: auto;
      width: auto;
      margin: 0;
    }

    .title-strong {
      width: 60px;
      font-size: .6rem;
      text-align: center;
      /* background: #ffc87c; */
    }

    .worker-strong {
      width: 60px;
      font-size: .6rem;
      /* background: #ffc87c; */
    }

    .short-tag {
      width: 48px;
      font-size: .6rem;
      text-align: center;
      /* background-color: #fff; */
    }

    .others-label {
      width: 48px;
      font-size: .6rem;
    }

    .bell-tag {
      padding: auto;
      width: 18px;
      text-align: center;
      background-color: #ff4;
    }

    .bell-tag.last {
      /* padding: auto; */
      width: 18px;
      /* margin: auto 0;
      margin-right: 12px; */
      background-color: #ff4;
    }
  }

`;

export const Line = styled.div`
  .line-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: auto;
    min-height: 66px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 4px 0;
    margin: 4px 0;
    background-color: #fff;
    /* background: #d1ffbd; */
  }

  .line-div.canceled {
    background-color: #F5F5F5;
  }

  .line-div.selected {
    border: 2px solid #666;
  }

  .line-div.canceled.selected {
    border: 2px solid #666;
  }

  .worker-profile-div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 330px;
    /* background: #d1ffbd; */
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin: 4px 8px;
  }

  .item-label {
    width: 220px;
    max-width: 220px;
    overflow: hidden;
    /* background: #eac853; */
  }

  .short-label {
    width: 110px;
    max-width: 110px;
    /* background-color: #daf1e0; */
  }

  .list-select-4 {
    height: 24px;
    width: 80px;
    max-width: 110px;
    background-color: #fff;
    font-size: 14px;
    margin: 0 15px;
    padding: 0 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    /* background: #a0da; */
  }

  .list-select-3 {
    height: 24px;
    width: 80px;
    max-width: 110px;
    background-color: #fff;
    font-size: 14px;
    margin: 0 15px;
    padding: 0 8px;
    border-radius: 4px;
    border: none;
    /* color: #fff; */
    background-color: #ED7777;
    /* background-color: #FF0F0F; */
  }

  .list-select-2 {
    height: 24px;
    width: 80px;
    max-width: 110px;
    background-color: #fff;
    font-size: 14px;
    margin: 0 15px;
    padding: 0 8px;
    border-radius: 4px;
    border: none;
    /* color: #fff; */
    /* background-color: #ff892e; */
    background-color: #f3c775;
    /* background-color: #F3C48C; */
  }

  .list-select-1 {
    height: 24px;
    width: 80px;
    max-width: 110px;
    background-color: #fff;
    font-size: 14px;
    margin: 0 15px;
    padding: 0 8px;
    border-radius: 4px;
    border: none;
    /* color: #fff; */
    background-color: #F3E675;
    /* background-color: #F5F9AD; */
  }

  /* .list-select-1.canceled {
    background-color: none;
  } */

  .list-option {
    color: #222;
    background-color: #fff;
  }

  .startdate {
    width: 102px;
    border-radius: 24px;
    padding: 4px;
    margin: 0 4px;
    background-color: #f9f9f9;
  }

  .startdate.green {
    background-color: #009966;
  }
  .duedate {
    width: 102px;
    max-width: 110px;
    border-radius: 24px;
    padding: 4px;
    margin: auto 4px;
  }
  .duedate.red {
    /* background-color: #EE204D; */
    background-color: #f64C75;
  }

  .duedate.green {
    background-color: #009966;
    /* background-color: #BCDF8A; */
  }

  .status-label {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 110px;
    max-width: 110px;
    margin: auto 0;
    /* background-color: #443e; */
  }

  .status-complete-div {
    display: flex;
    flex-direction: row;
    height: 12px;
    width: 90%;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #F5F5F5;
  }

  .status-incomplete-div {
    height: 12px;
    border-radius: 8px;
    /* background-color: #daf1e0; */
    background-image: linear-gradient(to right, #ffdd33, #ff892e);
  }

  .status-span {
    position: relative;
    font-size: 12px;
    /* background-color: #999; */
  }

  .bell-label {
    display: flex;
    align-items: center;
    width: 48px;
    /* background-color: #43e; */
  }

  .bell-label.last {
    display: flex;
    align-items: center;
    width: 48px;
    /* margin-right: 12px; */
    /* background-color: #999; */
  }

  @media (max-width: 1400px) {
    /* padding: 4px; */

    .item-label {
      width: 80px;
      font-size: .8rem;
      /* background: #eac853; */
    }

    .worker-profile-div {
      width: 80px;
      font-size: .8rem;
      /* background: #d1ffbd; */
    }
    img {
      height: 24px;
      width: 24px;
      border-radius: 50%;
      margin: 1px;
    }

    .short-label {
      width: 72px;
      font-size: .8rem;
      /* background-color: #4433ee; */
    }

    .list-select-4 {
      height: 16px;
      width: 64px;
      font-size: 12px;
      margin: auto 4px;
      /* background-color: #a0daa9; */
    }
    .list-select-3 {
      height: 16px;
      width: 64px;
      font-size: 12px;
      margin: auto 4px;
      /* background-color: #a0daa9; */
    }
    .list-select-2 {
      height: 16px;
      width: 64px;
      font-size: 12px;
      margin: auto 4px;
      /* background-color: #a0daa9; */
    }
    .list-select-1 {
      height: 16px;
      width: 64px;
      font-size: 12px;
      margin: auto 4px;
      /* background-color: #a0daa9; */
    }

    .startdate {
      width: 64px;
      font-size: 10px;
      border-radius: 12px;
      margin: auto 4px;
      /* background: #F5F5F5; */
    }

    .duedate {
      width: 64px;
      font-size: 10px;
      border-radius: 12px;
      margin: auto 4px
    }

    .status-label {
      width: 72px;
    /* background-color: #43ee; */
  }

    .bell-label {
      width: 24px;
      /* background-color: #999; */
    }

    .bell-label.last {
      width: 24px;
      /* background-color: #999; */
    }
  }

  @media (max-width: 620px) {
    .item-label {
      width: 60px;
      font-size: .6rem;
      /* background: #eac853; */
    }

    .worker-profile-div {
      width: 60px;
      font-size: .6rem;
      /* background: #d1ffbd; */
    }

    .short-label {
      width: 60px;
      font-size: .6rem;
      /* background-color: #4433ee; */
    }

    .list-select-4 {
      height: 16px;
      width: 40px;
      font-size: .6rem;
      margin: auto 2px;
      padding: 0;
      /* background-color: #a0daa9; */
    }

    .list-select-3 {
      height: 16px;
      width: 40px;
      font-size: .6rem;
      margin: auto 2px;
      padding: 0;
      /* background-color: #a0daa9; */
    }

    .list-select-2 {
      height: 16px;
      width: 40px;
      font-size: .6rem;
      margin: auto 2px;
      padding: 0;
      /* background-color: #a0daa9; */
    }

    .list-select-1 {
      height: 16px;
      width: 40px;
      font-size: .6rem;
      margin: auto 2px;
      padding: 0;
      /* background-color: #a0daa9; */
    }

    .startdate {
      width: 40px;
      font-size: .5rem;
      border-radius: 4px;
      padding: 0;
      margin: auto 4px;
      /* background-color: #F5F5F5; */
    }

    .duedate {
      width: 40px;
      font-size: .5rem;
      border-radius: 4px;
      padding: 0;
      margin: auto 4px;
      background-color: #F5F5F5;
    }
    .duedate.red {
      background-color: #f5f5f5;
    }

    .duedate.green {
      background-color: #f5f5f5;
    }

    .status-complete-div {
      display: flex;
      flex-direction: row;
      height: 8px;
      width: 90%;
      margin: 0 auto;
      border-radius: 8px;
      background-color: #F5F5F5;
    }

    .status-incomplete-div {
      height: 8px;
      border-radius: 8px;
      /* background-color: #daf1e0; */
      /* background-image: linear-gradient(to right, #ffdd33, #ff892e); */
    }

    .status-label {
      width: 48px;

      /* background-color: #43ee; */
    }

    .status-span {
      font-size: .6rem;
      /* background-color: #999; */
    }

    .bell-label {
      width: 18px;
      background-color: #43e;
    }

    .bell-label.last {
      width: 18px;
      background-color: #43e;
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
