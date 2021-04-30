import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid #ccc; */
  background: #222;
  /* background-color: #4433ee; */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  width: 68%;
  margin: 0 auto;
  /* background: #5edc1f; */

  nav {
    display: flex;
    align-items: center;
    width: auto;
    /* background: #5edc1f; */

  }

  .image-logo {

    /* height: 48px; */
    /* width: 48px; */
    height: 32px;
    width: auto;
    /* border: 1px solid #fff; */
    /* background: #4433ee; */
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* background: #5edc; */
  }
  li {
    display: inline;
    margin: 0 16px;
      /* background: #ff3; */
  }

  a {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    color: #999;
    /* background: #5edc1f; */
    &:hover {
      color: ${darken(0.2, '#999')};
    }
    /* background: #999; */
  }

  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    /* background: #5edc; */
  }

  @media (max-width: 1400px) {
    width: 90%;
    height: 15vh;
    nav {
      width: auto;
    }

    a {
      /* font-size: .8rem; */
    }
  }

  @media (max-width: 620px) {
    width: 98%;

    margin: 0 auto;
    /* background-color: #f5f5f5; */

    .image-logo {
      display: none;
      /* background: #5edc1f; */
    }
    nav {
      width: auto;
    }

    li {
      margin: 0 6px;
    }

    a {
      font-size: .6rem;
    }
  }
`;
export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background: #f00; */

  div {
    display: flex;
    flex-direction: column;
    text-align: right;
    margin-right: 8px;
  }

  strong {
    color: #ccc;
    font-size: 14px;
  }

  .image-background-div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #ddd;
  }

  .image-user {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 1px solid #fff;
    background: #F5F5F5;
  }

  @media (max-width: 1400px) {
    strong {
    /* font-size: .8rem; */
  }
  }
`;
