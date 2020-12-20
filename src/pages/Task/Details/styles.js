import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 50%;
  height: auto;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
  border-radius: 4px;
  padding: 24px;
  padding-bottom: 30px;
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
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    margin-bottom: 10px;
    /* background: #a0daa9; */
    @media (max-width: 620px) {
      height: auto;
    }
    strong {
      text-align: left;
      font-size: 20px;
      margin: 25px 0;
      color: #58595B;
      @media (max-width: 620px) {
        font-size: 4vw;
        margin: 4px 0;
      }
    }
    div {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0;
      /* background: #5c44; */
      input {
        width: 1%;
        visibility: hidden;
      }
      div {
        width: auto;
        /* background: #e88; */
        button {
          margin: 5px 5px 0;
          height: 44px;
          width: 140px;
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
            margin: 0 4px;
            width: auto;
            padding: 12px;
          }
        }
      }
    }
  }

  section {
    height: auto;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    margin: 4px;
    /* margin-bottom: 14px; */
    border-radius: 4px;
    padding: 0 24px;
    /* background: #f6f6; */
    div.block {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 4px;
      /* background: #fad48b; */
      div.row {
        display: flex;
        width: 100%;
        /* background: #800080; */
        div.tag {
          display: flex;
          flex-direction: column;
          width: 100%;
          /* background: #5a79ba; */
          label {
            width: auto;
            text-align: left;
            color: #444444;
            font-weight: bold;
            margin: 15px 5px 0px 5px;
            justify-content: space-between;
            /* background: #ffa500; */
            @media (max-width: 620px) {
              font-size: 3vw;
              margin: 14px 4px 4px 4px;
            }
          }
          span, input.inputScore {
            background: #F5F5F5;
            border: 1px solid #DDDDDD;
            border-radius: 4px;
            min-height: 46px;
            width: auto;
            color: #444444;
            margin: 4px;
            padding: 14px;
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

          input.inputScore {
            background: #fff;
          }

          button.buttonScore {
            margin: 5px 5px 0;
            height: 44px;
            width: 140px;
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
              margin: 0 4px;
              width: auto;
              padding: 12px;
            }
          }

          textbox {
            font-family: Fira Sans, sans-serif;
            border: 1px solid #DDDDDD;
            border-radius: 4px;
            min-height: 144px;
            height: auto;
            width: auto;
            color: #444444;
            margin: 4px 4px;
            justify-content: space-between;
            padding: 10px 16px;
            background: #F5F5F5;
            &::placeholder {
              color: #DDDDDD;
            }
            @media (max-width: 620px) {
              width: 98%;
              margin: auto;
            }
          }
          ul {

            display: grid;
            grid-template-columns: repeat(1, 1fr);
          }
        }
      }
    }
    div.divAvatar {
      width: 50px;
      background: #FFFFFF;
      img {
        max-width: 150px;
        height: auto;
        border-radius: 50%;

        border: 1px solid #58595B;
        border-radius: 50%;
        margin: auto;
      }
    }
  }
`;

export const Line = styled.li`
  background: #F5F5F5;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  min-height: 46px;
  height: auto;
  width: auto;
  padding: 0 16px;
  color: #444444;
  margin: 4px 4px;
  justify-content: space-between;
  display: flex;
    flex-direction: row;
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
  div.messageContent {
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: row;
    /* background: #9cdc3a; */
    strong.workerName {
      width: auto;
      text-align: left;
      color: #444444;
      font-weight: bold;
      margin: auto 0;
      /* background: #ffa500; */
    }
    p.workerMessage {
      width: auto;
      color: #444444;
      margin: auto 4px;
      /* background: #999; */
    }
  }
  div.dateTime {
    text-align: right;
    opacity: 0.5;
    /* background: #111; */
    p.spanDate {
      font-size: 12px;
      color: #444444;
      padding: 14px 0px 0px 0px;
      /* background: #111; */
      @media (max-width: 620px) {
        font-size: 3vw;
      }
      @media (max-width: 350px) {
        width: 50%;
      }
    }
    /* background: #83ade1; */

  }
`;
