import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 58%;
  font-weight: normal;
  margin: 0 auto;
  /* padding: 8px; */
  /* background-color: #a0d; */

  .footer-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
    width: 100%;
    margin: 24px auto;
    /* border-top: 1px solid #ccc; */
    background-color: #222;
    /* background-color: #f00; */
  }

  .footer-img {
    /* height: 36px; */
    height: 48px;
    width: auto;
    /* background-color: #4433ee; */
  }

  .footer-li {
    display: inline;
    font-size: 14px;
    font-weight: 600;
    margin: 32px;
    color: #999;
  }

  .footer-p {
    font-size: 10px;
    color: #f5f5f5;
  }

  @media (max-width: 1400px) {
    width: 90%;
    .footer-li {
      font-size: .8rem;

      /* background-color: #4ee; */
    }

    .footer-p {
      font-size: .6rem;
    }
  }

  @media (max-width: 620px) {
    width: 100%;
    margin: 12px auto;

  .footer-div {
    height: auto;
    min-height: 120px;
    background-color: #222;
    /* background-color: #f00; */
  }

  .left-header-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20%;
  }

  .center-header-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 60%;
  }
  .right-header-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20%;
  }

  .header-ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* background-color: #4433ee; */
  }

    .footer-img {
      height: 36px;
    }
    .footer-li {
      font-size: .6rem;
      text-align: center;
      margin: 4px;
      width: auto;
      /* background-color: #4ee; */
    }

    .footer-p {
      font-size: .6rem;
      width: 100%;
      padding: 4px;
    }
  }
`;
