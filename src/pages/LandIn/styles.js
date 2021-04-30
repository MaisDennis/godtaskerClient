import styled from 'styled-components';

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
    /* background-color: var(--color-primary-lighter) */
  }

  .body-div {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    margin: 0;
    background-color: #fff;
  }

  .hero-div {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    height: 90vh;
    justify-content: center;
    background-color: #222;
  }

  .hero-background-img {
    height: 100%;
    width: 100%;
    opacity: 0.7;
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
    font-size: 44px;
    text-align: left;
    width: 550px;
    margin-bottom: 16px;
    color: #fff;
  }

  .hero-button {
    font-size: 18px;
    height: 42px;
    width: 210px;
    background-color: #18A0FB;
  }

  .sub-hero-div.top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 90vh;
    width: 100%;
    background-color: #f5f5f5;
  }

  .sub-hero-div.responsive {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 80vh;
    width: 100%;
    background-color: #f5f5f5;
    /* background-color: #f00; */
  }

  .sub-hero-message-div {
    height: 80%;
    width: 90%;
    overflow-y: hidden;
  }

  .sub-hero-img {
    height: 100%;
    width: auto;
    opacity: 0.9;
    margin: auto 24px;
  }

  .sub-hero-message-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: auto;
    margin: 48px;
    /* background-color: #f00; */
  }

  .sub-hero-strong {
    font-size: 36px;
    text-align: left;
    width: 600px;
    margin-bottom: 16px;
    color: #666;
  }

  .sub-hero-strong.bottom {
    color: #999;
  }

  .sub-hero-ul {
    list-style-type: disc;
    height: auto;
    /* background-color: #999; */
  }

  .sub-hero-li {
    /* list-style: circle; */
    font-size: 24px;
    text-align: left;
    margin-left: 24px;
    margin-bottom: 16px;
    color: #444;
  }

  .sub-hero-li.bottom {
    color: #999;
  }

  .sub-hero-li.examples {
    margin-bottom: 16px;
  }

  .sub-hero-div.bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 80vh;
    width: 100%;
    background-color: #222;
  }

  .sub-hero-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: 95%;
    /* background-color: #4433ee; */
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
    /* background-color: #222; */
  }

  .sub-hero-examples-img {
    width: 100%;
    height: 100%;
    min-width: 250px;
    min-height: 150px;
    /* background-color: #999; */
  }

  .sign-up-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    width: 100%;
    background-color: #222;
  }

  .sign-up-strong {
    font-size: 24px;
    text-align: left;
    line-height: 36px;
    width: 50%;
    margin: 24px;
    color: #999;
    /* background-color: #222; */
  }

  .sign-up-top-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: #ee3; */
  }

  .sign-up-bottom-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    margin-top: 48px;
    /* background-color: #4433ee; */
  }

  .sign-up-title-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 100%;
    margin-top: 12px;
    /* background-color: #f00; */
  }

  .app-p {
    font-size: 14px;
    margin: 8px;
  }

  .apple-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 100%;
    border: 2px solid #999;
    border-radius: 8px;
    margin: 8px;
    /* background-color: #ee3; */
  }

  .android-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 100%;
    border: 2px solid #999;
    border-radius: 8px;
    margin: 8px;
    /* background-color: #f66; */
  }

  .qrcode-img {
    height: 120px;
    width: auto;
    margin: 36px;
  }

  .footer-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 10vh;
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
    font-size: 14px;
    /* font-weight: 600; */
    margin: 32px;
    color: #999;
  }

  .footer-p {
    font-size: 10px;
    color: #f5f5f5;
  }

  @media (max-width: 1400px) {
    .header-img {
      height: 36px;
    }

    .header-li {
      font-size: 14px;
      margin: 18px;
    }

    .header-button {
      font-size: 14px;
      height: 36px;
      width: 108px;
    }

    .hero-div {
      height: 90vh;
    }

    .hero-strong {
      font-size: 36px;
    }

    .hero-button {
      font-size: 16px;
    }

    .sub-hero-div.top {
      display: none;
    }

    .sub-hero-div.responsive {
      display: flex;
      height: 100%;
    }

    .sub-hero-div.bottom {
      height: 100%;
    }

    .sub-hero-wrapper {
      flex-direction: column;
    }

    .sub-hero-img {
      height: 500px;
      width: auto;
      max-width: 90%;
      margin: 0 auto 32px;
    }

    .sub-hero-message-div {
      /* position: absolute; */
    }

    .sub-hero-strong {
      font-size: 36px;
      opacity: 0.9;
      color: #222;
    }

    .sub-hero-strong.bottom {
      color: #fff;
    }

    .sub-hero-strong.examples {
      /* font-size: 24px; */
      color: #222;
    }

    .sub-hero-li {
      font-size: 21px;
      color: #222;
    }

    .sub-hero-li.bottom {
      color: #fff;
    }

    .sub-hero-li.examples {
      margin-bottom: 24px;
      color: #222;
    }

    .sub-hero-examples-wrapper {
      height: 100%;
      margin: 0 auto 32px;
      /* background-color: #f00; */
    }

    .sub-hero-examples-div {
      margin: 0 auto;
      max-width: 80%;
    }


    .sub-hero-examples-img {
      /* opacity: 0.2; */
      min-width: 0;
    min-height: 0;
    }

    .sign-up-div {
      height: auto;
    }

    .sign-up-strong {
      text-align: justify;
    }

    .sign-up-bottom-div {
      width: 70%;
    }

    .footer-img {
      height: 36px;
    }

    .footer-li {
      font-size: .8rem;
    }

    .footer-p {
      font-size: .6rem;
    }
  }

  @media (max-width: 900px) {
    .header-div {
      height: 15vh;
    }

    .sub-hero-img {
      height: auto;
      width: auto;
      max-width: 90%;
      margin: 0 auto 32px;
    }

    .sub-hero-strong {
      font-size: 1.6rem;
    }

    .sub-hero-li {
      font-size: 1.2rem;
    }

    .sign-up-strong {
      font-size: 1.6rem;
      width: 90%;
    }

    .footer-div {
      height: 15vh;
    }
  }

  @media (max-width: 620px) {
    .header-div {
      padding: 0 8px;
    }

    .header-img {
      height: 21px;
    }

    .header-li {
      font-size: .6rem;
      margin: 4px;
    }

    .header-button {
      font-size: .6rem;
      height: 24px;
      width: 72px;
    }

    .hero-div {
      background-color: #222;
      overflow-x: hidden;
    }

    .hero-background-img {
      /* height: 100%;
      width: 100%; */
      width: auto;
      opacity: 0.9;
    }

    .hero-strong {
      font-size: 1.6rem;
      width: 80%;
    }

    .hero-button {
      font-size: .9rem;
    }

    .sub-hero-img {
      height: auto;
      width: 100%;
    }

    .sub-hero-message-div {
      /* width: 100%; */

    }

    .sub-hero-strong {
      font-size: 1.2rem;
      width: 100%;
    }

    .sub-hero-strong.bottom {
      color: #fff;
    }

    .sub-hero-strong.examples {
      /* font-size: 24px; */
      color: #222;
    }

    .sub-hero-li {
      font-size: .8rem;
      color: #222;
    }

    .sub-hero-li.bottom {
      color: #fff;
    }

    .sub-hero-li.examples {
      margin-bottom: 24px;
      color: #222;
    }

    .sub-hero-examples-img {
      height: auto;
      min-width: 0;
      min-height: 0;
    }

    .sign-up-div {
      height: auto;
      /* margin-bottom: 16px; */
    }

    .sign-up-strong {
      font-size: 1rem;
      line-height: 1.6rem;
    }

    .sign-up-bottom-div {
      flex-direction: column;
    }

    .footer-img {
      height: 36px;
    }

    .footer-li {
      font-size: .6rem;
    }

    .footer-p {
      font-size: .4rem;
    }
  }

`;
