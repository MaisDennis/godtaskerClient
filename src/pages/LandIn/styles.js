import styled from 'styled-components';
import search from '~/assets/search-24px.svg';
import { darken } from 'polished';
import hero from '~/assets/stockImages/hero.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  font-weight: normal;
  /* padding: 8px; */
  margin: 0;
  /* background-color: #999; */

  .header-div {
    display: flex;
    flex-direction: row;
    height: 10vh;
    width: 100%;
    font-weight: normal;
    background-color: #222;
    /* background-color: #f00; */
  }

  .left-header-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20vw;
    /* background-color: #fff; */
  }

  .header-img {
    height: 48px;
    width: auto;
    /* background-color: #4433ee; */
  }

  .center-header-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 65vw;
    /* background-color: #e4e4; */
  }

  .header-ul {
    list-style-type: none;
    /* background-color: #999; */
  }

  .header-li {
    display: inline;
    font-size: 18px;
    font-weight: 600;
    margin: 24px;
    color: #18A0FB;
  }

  .right-header-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 15vw;
    /* background-color: #ee3; */
  }

  .header-button {
    font-size: 18px;
    height: 42px;
    width: 126px;
    background-color: #18A0FB;
  }

  .hero-div {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    height: 80vh;
    justify-content: center;
    background-color: #222;
  }

  .hero-background-img {
    height: 100%;
    width: 100%;
    opacity: 0.6;

  }

  .hero-hover-div {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 40vh;
    left: 10vw;
    /* background-color: #666; */
  }
  .hero-strong {
    font-size: 48px;
    text-align: left;
    width: 600px;
    margin-bottom: 16px;
    color: #fff;
  }

  .hero-button {
    font-size: 18px;
    height: 42px;
    width: 210px;
    background-color: #18A0FB;
  }

  .sub-hero-top-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 80vh;
    width: 100%;
    background-color: #f5f5f5;
  }

  .sub-hero-img {
    height: 90%;
    width: auto;
    opacity: 0.9;
    margin: auto 48px;
  }

  .sub-hero-message-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
    margin: 48px;
    /* background-color: #f00; */
  }

  .sub-hero-strong {
    font-size: 42px;
    text-align: left;
    width: 600px;
    margin-bottom: 16px;
    color: #666;
  }

  .sub-hero-strong.bottom {
    color: #999;
  }

  .sub-hero-ul {
    list-style-type: square;
    /* background-color: #999; */
  }

  .sub-hero-li {
    font-size: 24px;
    text-align: left;
    margin-left: 24px;
    margin-bottom: 16px;
    color: #444;
  }

  .sub-hero-li.bottom {
    color: #999;
  }

  .sub-hero-bottom-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 80vh;
    width: 100%;
    background-color: #222;
  }

  .help-ul {
    margin-left: 32px;
  }

  .sub-hero-examples-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80vh;
    width: 95%;
    /* background-color: #f5f; */
  }

  .sub-hero-examples-div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    /* gap: 3rem 1rem; */
    /* align-items: center; */
    /* justify-content: flex-end; */
    /* height: 80vh; */
    width: auto;
    margin: 0 48px;
    background-color: #222;
  }

  .sub-hero-examples-img {
    width: 100%;
  height: 100%;
  min-width: 250px;
  min-height: 150px;
  background-color: #AAA;
  }

  .sign-up-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    width: 100%;
    background-color: #222;
  }

  .sign-up-strong {
    font-size: 24px;
    text-align: left;
    line-height: 36px;
    width: 50%;
    margin: 48px;
    color: #999;
    /* background-color: #222; */
  }

  .footer-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 15vh;
    width: 100%;
    /* border-top: 1px solid #ccc; */
    background-color: #222;
    /* background-color: #f00; */
  }

  .footer-img {
    height: 48px;
    width: auto;
    /* background-color: #4433ee; */
  }

  .footer-li {
    display: inline;
    font-size: 16px;
    font-weight: 600;
    margin: 32px;
    color: #999;
  }

  .footer-p {
    font-size: 12px;
    color: #f5f5f5;
  }


`;
