import styled from 'styled-components';
import search from '~/assets/search-24px.svg';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 100%;
  height: auto;
  max-height: 78vh;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
  border-radius: 4px;
  padding: 24px;
  padding-bottom: 30px;
  /* background: #a0daa9; */
  @media (max-height: 680px) {
    padding: 24px 4px;
    max-height: none;

  }
  @media (max-width: 620px) {
    padding: 24px 4px;

  }
  strong {
    text-align: left;
    font-size: 20px;
    margin: 24px 0;
    color: #58595B;
    @media (max-width: 620px) {
     font-size: 4vw;
     margin: 4px 0;
    }
  }

  header {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    background: #F5F5F5;
    border-radius: 14px;
    margin-bottom: 10px;
    /* background: #a0daa9; */
    @media (max-width: 620px) {
      height: auto;
    }

    div {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0;
      /* background: #a0daa9; */
      input {
        height: 44px;
        width: 300px;
        font-weight: normal;
        color: #333;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        padding: 0px 15px;
        text-indent: 24px;
        background: #FFF url(${search}) no-repeat center left 7px;
        @media (max-width: 620px) {
        font-size: 3vw;
        width: 60%;
        padding: 0;
        text-indent: 34px;
        }
      }
      input.cssSpaceFiller {
        visibility: hidden;
      }
      button {
        margin: 5px 0 0;
        height: 44px;
        width: 180px;
        background: #58595B;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;
        &:hover {
          background: ${darken(0.05, '#58595B')};
        }
        @media (max-width: 620px) {
        font-size: 3vw;
        margin: auto;
        width: auto;
        padding: 12px;
        }
      }
    }
    p {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      /* background: #b86d29; */
      border-radius: 4px;
      margin: 25px auto 0;
      @media (max-width: 620px) {
        margin: 0;
        width: auto;
        height: auto;
      }
      .title-strong {
        width: 210px;
        font-size: 18px;
        font-weight: bold;
        margin: auto 5px;
        text-align: center;
        max-height: 50px;
        overflow: hidden;
        color: #444444;
        /* background: #9d9eb4; */
        @media (max-width: 620px) {
        font-size: 2vw;
        margin: auto 1px;
        }
      }
      .strongDescription {
        @media (max-width: 620px) {
          visibility: collapse;
        }
      }
      .short-strong {
        width: 55px;
        padding: auto;
        /* background: #e2da; */
      }
      .long-strong {
        width: 600px;
        max-height: 70px;
        overflow: hidden;
        /* background: #ffc87c; */
      }
      strong.person {
        width: 310px;
        max-height: 70px;
        overflow: hidden;
        /* background: #ffc87c; */
      }
    }
  }

  ul {
    overflow-y: scroll;
    max-height: 100%;
  }
`;

export const Line = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-radius: 4px;
  margin: 3px 0;
  padding: 0;
  /* background: #d1ffbd; */
  @media (max-width: 620px) {
    height: auto;
    min-height: 44px;
  }
  div.avatar_name {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin: auto 5px;
    /* background: #eac853; */
    @media (max-width: 620px) {
      margin: 0 1px;
      width: 100%;
    }

    img {
      border: 1px solid #DDDDDD;
      border-radius: 50%;
      margin: auto 0px auto 14px;
      @media (max-width: 620px) {
        height: 0;
        width: 0;
        margin: auto 0;
      }
    }

    strong.person {
      width: auto;
      font-size: 14px;
      font-weight: normal;
      margin: auto;
      text-align: center;
      max-height: 70px;
      overflow: hidden;
      @media (max-width: 620px) {
        font-size: 2vw;
      }
    }
  }
  strong {
    width: 210px;
    font-size: 14px;
    font-weight: normal;
    margin: auto 5px;
    text-align: center;
    max-height: 50px;
    overflow: hidden;
    color: #000;
    /* background: #a0daa9; */
    @media (max-width: 620px) {
      font-size: 2vw;
      max-height: 100%;
      margin: auto 1px;
    }

  }
  strong.strongDescription {
    @media (max-width: 620px) {
      visibility: collapse;
    }
  }
  strong.short {
    width: 55px;
    padding: auto;
    /* background: #b1c6c7; */
  }
  strong.long {
    width: 600px;
    max-height: 70px;
    overflow: hidden;
    /* background: #ed7777; */
  }
  strong.status {
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    padding: auto;
  }
  strong.startdate {
    background: #F5F5F5;
    border-radius: 16px;
    padding: 2px;
  }
  strong.duedate {
    border-radius: 16px;
    padding: 2px;
  }

  a {

    button.whatsappbutton {
      border-radius: 4px;
      height: 30px;
      width: 30px;
      padding-top: 2%;
      background: linear-gradient(to right top, #00ff00, #bbee11);
      border: 0;
      @media (max-width: 620px) {
        height: 22px;
        width: 22px;
      }
    }
    img {
      color: white;

      @media (max-width: 620px) {
        margin-top: 2px;
      }
    }
  }


`;


