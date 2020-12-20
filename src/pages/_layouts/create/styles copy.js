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
        > button {
            margin: 5px 5px 0;
            height: 44px;
            width: 140px;
            background: #f64C75;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;
            &:hover {
              background: ${darken(0.08, '#f64C75')};
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
  div.formBody {
    height: auto;
    display: flex;
    flex-direction: column;
    background: #FFF;
    margin: 0 5px;
    border-radius: 4px;
    padding: 0 24px;
    /* background: #a0daa9; */
    @media (max-width: 620px) {
      padding: 0;
    }
    div.line {
      display: flex;
      width: 100%;
      @media (max-width: 350px) {
        width: 50%;
      }
      div.subContent {
        display: flex;
        flex-direction: column;

        width: 100%;
        /* background: #f6f6; */
        label {
          width: auto;
          text-align: left;
          color: #444444;
          font-weight: bold;
          margin: 15px 5px 0px 5px;
          justify-content: space-between;
          /* background: #666; */
          @media (max-width: 620px) {
            font-size: 3vw;
            margin: 14px 4px 4px 10px;
          }
        }
        select{
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

        option {
          font-family: 'Fira Sans', sans-serif;
          background: #fff;
          color: ${darken(0.6, '#fff')};
          font-size: 14px;
          margin: auto;
          padding: 0 15px;
        }
        input {
          background: #FFFFFF;
          border: 1px solid #DDDDDD;
          border-radius: 4px;
          height: 44px;
          width: auto;
          padding: 0 16px;
          color: #444444;
          margin: 4px 4px;
          justify-content: space-between;
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

        span {
          width: auto;
          text-align: left;
          color: #ff6e3a;
          font-size: 12px;

          margin: 0px 5px 0px 5px;
          justify-content: space-between;
          /* background: #666; */
          @media (max-width: 620px) {
            font-size: 3vw;
            margin: 4px 4px 4px 10px;
          }
        }
        textarea.descriptionInput {
          font-family: Fira Sans, sans-serif;
          border: 1px solid #DDDDDD;
          border-radius: 4px;
          height: 144px;
          width: auto;
          color: #444444;
          margin: 4px 4px;
          justify-content: space-between;
          padding: 10px 16px;
          &::placeholder {
            color: #DDDDDD;
          }
          @media (max-width: 620px) {
            width: 98%;
            margin: auto;
          }
        }
      }
    }
  }
`;
