import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 4px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  background-color: #fff;

  .task-details-div {
    display: flex;
    flex-direction: column;
    /* background-color: #443355; */
  }

  .task-details-strong {
    width: 100%;
    margin: .5rem 4px 1rem 4px;

  }
  .task-details-label {
    width: auto;
    font-weight: bold;
    text-align: left;
    line-height: 24px;
    margin: .5rem 4px 4px 4px;
    color: #444444;
    /* background: #666; */
  }

  .task-details-description-div {
    height: auto;
    line-height: 24px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px 12px;

    background-color: #F5F5F5;
  }

  .sub-tasks-div {
    display: flex;
    flex-direction: column;
    /* padding: 4px; */
    /* background-color: #ff4; */
  }
  .sub-tasks-list-div {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    padding: 10px 12px;
    /* border: 1px solid #111; */
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #F5F5F5;
    /* background-color: #F5F5; */
  }

  .sub-tasks-checkbox-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    line-height: 24px;
    border-bottom: 1px solid #ccc;
    margin: 12px auto;

  }

  .sub-tasks-checkbox-label {
    display: flex;
    flex-direction: row;
    height: auto;
    text-align: left;
    line-height: 24px;
    white-space: pre-line;
    margin-bottom: 24px;
    /* background-color: #f00; */
  }

  .sub-tasks-checkbox-input {
    height: 22px;
    width: auto;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    padding: 0 12px;
    color: #444444;
    background-color: #FFFFFF;
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
    background-color: #555;
  }

  .sub-tasks-checkbox-span {
    font-weight: 400;
    margin: auto 12px;
    /* background: #666; */
  }

  .sub-tasks-buttons-div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 12px 0;
    /* background-color: #222; */
  }

  .task-details-bottom-div {
    display: flex;
    justify-content: space-around;
    background-color: #999;
  }

  .task-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    margin: 4px 0 0 12px;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    background: #58595B;
    &:hover {
      background: ${darken(0.2, '#58595B')};
    }
    @media (max-width: 620px) {
      width: auto;
      font-size: 3vw;
      margin: 0 4px;
      padding: 12px;
    }
  }

  .task-button.edit {
    /* background: #58595B; */
  }
  .task-button.remove {
    /* background: #58595B; */
  }
  .task-button.score {
    /* background: #58595B; */
  }

  .task-score-div {
    display: flex;
    flex-direction: column;
    margin: 24px 0;
    /* background-color: #007f66; */
  }

  .score-div {
    margin: 1.5rem 0 .5rem 0;
  }



  .task-button.send-score {
    margin-top: 12px;
    margin-left: 0;
    background: #007f66;
  }

  .task-details-comment-input {
    height: auto;
    min-height: 56px;
    font-family: Fira Sans, sans-serif;
    line-height: 24px;

    border-radius: 4px;
    padding: 10px 12px;
    margin-bottom: 8px;
  }

  .score-date-div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .task-details-score-input {
    height: 48px;

    line-height: 24px;
    width: 80px;
    padding: 12px;
    margin-bottom: 8px;
    margin-right: 12px;
    border: 1px solid #666;
    border-radius: 4px;
    /* color: #666; */
  }
`;
