import styled from 'styled-components';
import { darken} from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  margin: auto;


  .profile-div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: auto;
    border-radius: 4px;
    background-color: #f5f5f5;
  }

  .form-body-div {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    border-radius: 4px;
    padding: 12px;
    /* margin: 12px; */
    background: #FFF;

  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 12px;
    margin-top: 30px 12px;
    /* background: #a0daa9; */
  }


  input, select {
    height: 44px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 15px;
    margin: 4px 4px 8px 4px;
    color: #222;
    background-color: #fff;
    &::placeholder {
      color: ${darken(0.3, '#fff')};
    }
  }

  .line-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    text-align: center;
    /* background-color: #F5f5; */
  }

  span {
    color: #fb6c91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
  hr {
    border: 0;
    height: 1px;
    background: rgba(255,255,255,0.2);
    margin: 10px 0 20px;
  }

  .button-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    /* background-color: #F5f5; */
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    padding: auto;
    margin: 0 4px;
    color: #fff;
    /* background: #007f66; */
    background: #4433ee;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.2, '#4433ee')};
    }
  }

  .exit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    padding: auto;
    margin: 0 4px;
    color: #fff;
    /* background: #007f66; */
    background: #f64C75;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.2, '#f64C75')};
    }
  }


  > button {
    width: 100%;
    margin: 10px 0 30px;
    height: 44px;
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
  }

  @media (max-width: 1400px) {
    .profile-div {
      width: 90%;
    }
  }

  @media (max-width: 620px) {
    button {
      font-size: .8rem;
    }
  }
`;
