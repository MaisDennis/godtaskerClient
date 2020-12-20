import styled from 'styled-components';

export const Container = styled.div`
  background: #222;
  padding: 10px;
`;

export const Content = styled.div`
  height: 100px;
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
/* background: #5edc1f; */
  @media (max-width: 620px) {
    display: block;
    max-width: 100%;
    margin: 20px auto 0 auto;
  }
  nav {
    display: flex;
    align-items: center;
    width: 100%;
    /* background: #5edc1f; */
    img {
      height: 4rem;
      max-height: 220px;
      width: 4rem;
      max-width: 120px;
      border-radius: 50%;
      /* background: #5edc1f; */
      @media (max-width: 620px) {
        height: 40px;
      }
    }
    ul {
      margin: auto;
      width: auto;
      /* background: #5edc1f; */
      li {
        display: inline;
        padding: 0;
        /* background: #5edc1f; */
        a {
          font-weight: bold;
          font-size: 16px;
          color: #fff;
          text-align: center;
          padding: 0 16px;
          /* background: #5edc1f; */
          &:hover {
            color: #dbd5d1;
          }
          @media (max-width: 620px) {
            font-size: 3vw;
            padding: 0 10px;
          }
          @media (max-width: 330px) {
            padding: 0 0.3rem;
          }
        }
      }
    }
  }

  aside {
    display: flex;
    width: 30%;
    /* background: #5edc; */
    @media (max-width: 620px) {
      width: 60%;
      margin: 14px auto;
    }
  }
`;
export const Profile = styled.div`
  display: flex;
  margin: auto;
  /* background: #5edc1f; */
  @media (max-width: 620px) {
      width: 100%;
      margin-left: 30px;
    }
  div {
    text-align: right;
    margin-right: 10px;
    @media (max-width: 620px) {
      text-align: center;
      margin: auto;
    }

    strong {
      display: block;
      color: #58595B;
      font-size: 14px;
      @media (max-width: 620px) {
        font-size: 4vw;
      }
    }
    a {
      display: block;
      margin-top: 4px;
      font-size: 12px;
      color: #fff;
      @media (max-width: 620px) {
        font-size: 3vw;
      }
    }
  }
  img {
    height: 4rem;
    width: 4rem;
    max-height: 44px;
    max-width: 44px;
    border-radius: 50%;
    background: #F5F5F5;
    @media (max-width: 620px) {
        margin: auto;
      }
  }
`;
