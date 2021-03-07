import styled from 'styled-components';
import { darken} from 'polished';

export const Container = styled.div`
  max-width: 315px;
  margin: auto;
  height: auto;
  min-height: 100%;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input, select {
      background: rgba(0,0,0,0.3);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      &::placeholder {
        color: ${darken(0.3, '#fff')};
      }
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
    button {
      margin: 8px 0;
      height: 48px;
      /* background: #58595B; */
      background: #4433ee;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.05, '#4433ee')};
      }
    }

    .exit-button {
      background: #666;
      transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#666')};
    }
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
`;
