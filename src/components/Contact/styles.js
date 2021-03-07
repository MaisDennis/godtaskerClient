import styled from 'styled-components';

export const Line = styled.div`
  display: flex;
  justify-content: space-around;

  .line-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: auto;
    min-height: 36px;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    background-color: #d1ffbd;
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
