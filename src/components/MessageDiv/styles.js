import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;
width: 100%;
margin: 0 auto;
padding: 4px;
/* background-color: #5edc1f; */

.message-header {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 0;
  margin: 4px 0 10px;
  /* background-color: #22eeee; */
}

.list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}

.worker-profile-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72px;
  width: 100%;
  padding: auto;
  /* background-color: #4433ee; */
}

.message-search-input {
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.worker-tag {
  display: flex;
  flex-direction: row;
  width: 8rem;
}

img {
  height: 3rem;
    max-height: 220px;
    width: 3rem;
    max-width: 120px;
    border-radius: 50%;
    margin: auto 12px auto 0;
}

.worker-profile-label {
  display: flex;
  margin: auto;
  align-self: center;
  /* background-color: #f00; */
}

.message-menu-div {
  display: flex;
  flex-direction: row;
}

.message-menu-button {
  width: 48px;
  border: none;
  color: #888;
  background-color: #F5F5F5;
}

.message-conversation-div {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4px;
  margin: 0 0 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow-y: scroll;
  background-color: #fff;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
}

.message-container-div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 90%;
  margin: 0 auto;
  padding: 0 0 8px 0;
  border-bottom: 1px solid #F5F5F5;
  /* background-color: #F00; */
}

.message-container-div.worker {
  align-items: flex-start;
}

.message-dropMenu-ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #443333;
}

.message-dropMenu-li {
  margin: 0 4px;
  padding: 4px 12px;
  list-style-type: none;
  box-shadow: 2px 2px 2px #ccc;
  background-color: #F5F5F5;
  /* background-color: #4433ee; */
}

.message-dropMenu-button {
  color: #999;
  border: none;
  margin: 0 4px;
  background-color: #F5F5F5;
  /* background-color: #334422; */
}

.time-message-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* width: 90%; */
  margin: 4px 0;
  /* border-bottom: 1px solid #F5F5F5; */
  /* background-color: #F00; */
}

.time-message-div.user {
  justify-content: flex-end;
}

.time-message-div.worker {
  background-color: #fff;
}

.message-line-div {
  display: flex;
  flex-direction: column;

  height: auto;
  margin: 4px;
  padding: 4px;
  border-radius: 8px;
}

.message-line-div.user {
  background-color: #daf1e0;
}

.message-line-div.worker {
  background-color: #b4c7db;
}

.reply-on-top-div {
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
  padding: 8px;
  opacity: .9;
  border-radius: 4px;
  background-color: #F5F5F5;
}

.forward-on-top-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  padding-left: 4px;
  color: #999;
}

.reply-name-span {
  font-size: 13px;
  color: blue;
  margin-bottom: 8px;
}

.message-arrow-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  /* background-color: #4433ee; */
}

.message-arrow-div.removed {
  padding-left: 4px;
  /* background-color: #f00; */
}

.message-span {
  /* display: flex; */
  font-size: 14px;
  max-width: 85%;
  align-self: center;
  margin: 0 8px;
  /* background-color: #fff; */
}

.message-span.user {
  background-color: none;
}
.message-span.worker {
  background-color: none;
}

.message-time-span {
  font-size: 10px;
  color: #444;
}
.temporary-message-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.temporary-message-div {
  height: auto;
  line-height: 24px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  /* border-bottom: 4px solid #b4c7db; */
  /* box-shadow: 2px 2px 2px #ccc; */
  padding: 10px 12px;
  margin-bottom: 4px;

  background-color: #F5F5F5;
}

.message-input {
  width: 100%;
  margin: 4px 0 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.message-button {
  height: 36px;
  width: 108px;
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0 0;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;
  color: #fff;
  background: #007f66;
  &:hover {
    background: ${darken(0.05, '#58595B')};
  }
  @media (max-width: 620px) {
    width: auto;
    font-size: 3vw;
    margin: 0 4px;
    padding: 12px;
  }
}
`;
