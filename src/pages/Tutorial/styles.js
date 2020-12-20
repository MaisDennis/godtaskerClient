import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  height: auto;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  color: #fff;
  border-radius: 4px;
  padding: 24px;
  padding-bottom: 30px;
  /* background: #a0daa9; */
  @media (max-width: 620px) {
    padding: 24px 4px;
  }
  strong {
    text-align: left;
    font-size: 20px;
    margin: 24px 0;
    color: #c8c2c0;

    @media (max-width: 620px) {
     font-size: 4vw;
     margin: 4px 0;
    }
  }
  span {
    font-size: 16px;
      font-weight: 400;
      color: #c8c2c0;
      margin: 4px 0;
  }
  ol {
    margin: 0 14px;
    li {
      margin: 4px;
      text-indent: 14px;
    }
  }




`;




