import styled from 'styled-components';
import { darken } from 'polished';

export const DetailsDiv = styled.div`
  width: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
  }
  padding: 4px;
  /* background-color: #f00; */

  .details-header-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 4px 0;
    /* background: #a0da; */
  }

  .details-title-strong {
    max-height: 48px;
    width: auto;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    overflow: hidden;
    margin: 4px 0 12px;
    color: #444;
    /* background-color: #9d9eb4; */
  }
  .details-body {
    display: flex;
    flex-direction: column;
    margin: 4px 0;
    /* background-color: #4e3; */
  }
  .details-strong {
    width: auto;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    margin: 4px 0;
    margin-top: 12px;
    color: #444;
    /* background: #666; */
  }

  .details-description-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 42px;
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    border: 0;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 0 12px;
    background-color: #fff;
  }

  .sub-tasks-div {
    display: flex;
    flex-direction: column;
    /* background-color: #ff4; */
  }
  .sub-tasks-list-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #fff;
    /* background-color: #F5F; */
  }

  .sub-tasks-checkbox-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    width: 90%;
    border-bottom: 1px solid #ccc;
    margin: 12px 0;
    /* background-color: #4433ee; */
  }

  .sub-tasks-checkbox-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    white-space: pre-line;
    /* background-color: #f00; */
  }

  .sub-tasks-checkbox-span {
    margin: 0 8px;
    /* background: #666; */
  }

  .sub-task-checkbox-weige-span {
    margin: 0 8px;
  }

  .sub-tasks-buttons-div {
    display: flex;
    justify-content: flex-end;
    width: auto;
    margin: 4px 0;
    /* background-color: #222; */
  }

  .task-button {
    height: 36px;
    width: 108px;
    font-size: 14px;
    font-weight: bold;
    margin: 4px 8px;
    padding: 4px;
    border: none;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    background-color: #4433ee;
    &:hover {
      background-color: ${darken(0.2, '#4433ee')};
    }
  }

  .task-button.blue {
    background: #4433ee;
  }
  .task-button.grey {
    background: #666;
  }

  .score-div {
    display: flex;
    flex-direction: column;
    margin: 24px 0;
    /* background-color: #007f66; */
  }

  .task-button.send-score {
    margin-top: 12px;
    margin-left: 0;
    background-color: #007f66;
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

  .score-input {
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

  .task-details-img-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    /* background-color: #4ee; */
  }

  .task-details-img {
    width: 70%;
    height: auto;
    border-radius: none;
    margin: 4px auto;
    /* background-color: #f00; */
  }

  @media (max-width: 1400px) {
    padding: 4px;

    .task-button {
      width: 72px;
      font-size: .8rem;
    }

    .details-title-strong {
      font-size: .8rem;
    }

    .details-strong {
      font-size: .8rem;
      text-align: left;
      /* margin: auto 0; */
      /* background: #ffc87c; */
    }

    .details-description-div {
      font-size: .8rem;
    }

    .sub-tasks-checkbox-span {
      font-size: .8rem;
    }
  }
  @media (max-width: 620px) {
  }
`;
