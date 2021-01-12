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
    width: 50%;
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

export const ListDiv = styled.div`
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

  .line-div.canceled {
    background-color: #F5F5F5;
    border: none;
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

  .list-select.canceled {
    background-color: none;
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
