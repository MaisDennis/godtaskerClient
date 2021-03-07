import styled from 'styled-components';
import { darken } from 'polished';

export const MessageDivision = styled.div`
width: 100%;
padding: 4px;
background-color: #5edc1f;

.message-header {
  display: flex;
  flex-direction: column;
  height:auto;
  margin: 4px 0;
  background-color: #22eeee;
}

.message-header-strong {
  max-height: 48px;
  width: auto;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  margin-top: 4px; // adjustment
  color: #444;
  /* background-color: #9d9eb4; */
}

.list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 0;
  background-color: #ff0;
}

.worker-profile-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  min-height: 48px;
  width: 100%;
  background-color: #4433ee;
}

.message-search-input {
  display: flex;
  align-items: center;
  height: 36px;
  width: 100%;
  border: 0;
  border-radius: 4px;
  padding: 0 8px;
  color: #222;
}

.worker-tag {
  display: flex;
  flex-direction: row;
  width: auto;
  padding: 0 4px;
  background-color: #f00fff;
}

img {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin: 0 8px;
  background-color: #f5f5f5;
}

.worker-profile-label {
  display: flex;
  align-self: center;
  overflow: hidden;
  background-color: #f00;
}

.message-menu-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #007333;
}

.message-menu-button {
  margin: 0 8px;
  padding: 8px;
  border: none;
  color: #888;
  background-color: #F5F5F5;

}

.others-menu-div {
  position: relative;
}

.others-drop-menu-ul {
  position: absolute;
  top: 48px;
  right: 4px;
}

.others-drop-menu-li {
  margin: 0 4px;
  padding: 4px 8px;
  list-style-type: none;
  box-shadow: 2px 2px 2px #ccc;
  background-color: #fff;
  background-color: #4433ee;
}

.others-drop-menu-button {
  border: none;
  color: #4433ee;
  background-color: #fff;
  background-color: #334422;
}

.message-menu-icon {
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  color: #4433ee;
  /* background-color: #fff131; */
}

.message-conversation-div {
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  height: 65vh;
  width: 100%;
  /* padding: 4px; */
  margin: 4px 0;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  overflow-y: scroll;
  background-color: #fff;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
  }
  /* background-color: #334422; */
}

.message-container-div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding: 4px 0;
  border-bottom: 1px solid #F5F5F5;
  background-color: #F00;
}

.message-container-div.worker {
  align-items: flex-start;
}

.message-dropMenu-ul {
  list-style-type: none;
  background-color: #443333;
}

.message-dropMenu-li {
  margin: 4px;
  padding: 8px;
  list-style-type: none;
  box-shadow: 2px 2px 2px #ccc;
  background-color: #F5F5F5;
  /* background-color: #4433ee; */
}

.message-dropMenu-button {
  color: #999;
  border: none;
  background-color: #F5F5F5;
  /* background-color: #334422; */
}

.time-message-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f0ff;
}

.time-message-div.user {
  justify-content: flex-end;
}

.message-time-span {
  margin: 0 4px;
}
/* .time-message-div.worker {
  background-color: #fff;
} */

.message-line-div {
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 0 4px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #ff0;
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
  margin: 4px 0;
  padding: 4px;
  opacity: .9;
  border-radius: 4px;
  background-color: #F5F5F5;
}

.forward-on-top-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
  padding: 4px 0;
  padding-left: 4px;
  color: #666;
}

.reply-name-span {
  font-size: 13px;
  margin-bottom: 8px;
  color: #73a6c4;
}

.message-arrow-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
  background-color: #4433ee;
}

.message-arrow-div.removed {
  background-color: #f00;
}

.message-span {
  font-size: 14px;
  align-self: center;
  margin: 0 8px;
  background-color: #fff;
}

.message-time-span {
  font-size: 10px;
  color: #444;
}
.temporary-message-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
}

.temporary-message-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  min-height: 36px;
  border-radius: 4px;
  /* border: 1px solid #ccc; */
  border: none;
  width: 100%;
  padding: 4px 8px;
  margin-bottom: 4px;

  background-color: #F5F5F5;
}

.message-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
  margin: 4px 0;
  padding: 8px; // exception to the rule.
  /* border: 1px solid #ccc; */
  border: none;
  border-radius: 4px;
  background-color: #fff;
}

.message-button {
  height: 36px;
  width: 108px;
  font-size: 14px;
  font-weight: bold;
  margin: 4px 8px;
  margin: 4px;
  border: none;
  border-radius: 4px;
  transition: background 0.2s;
  color: #fff;
  /* background: #007f66; */
  background: #4433ee;
  &:hover {
    background: ${darken(0.2, '#4433ee')};
  }
}
@media (max-width: 1400px) {
  padding: 4px;

  .message-header-strong {
      font-size: .8rem;
    }

  .worker-profile-label {
    display: flex;
    align-self: center;
    font-size: .8rem;
    /* background-color: #f00; */
  }

  img {
    margin: 0 4px;
  }
  .message-menu-button {
    padding: 4px;
  }
  .message-menu-icon {
   font-size: 14px;
    margin: 0;
  background-color: #fff131;
}

  .others-drop-menu-button {
    font-size: .8rem;
    border: none;
    color: #4433ee;
    background-color: #fff;
    /* background-color: #334422; */
  }

  .message-time-span {
    font-size: .6rem;
  }

  .reply-name-span {
    font-size: .7rem;
    margin-bottom: 8px;
    color: #73a6c4;
  }

  .reply-on-top-span {
    font-size: .8rem;
  }

  .message-span {
    font-size: .8rem;
  }

  .message-button {
  width: 73px;
  font-size: .8rem;
}


}
@media (max-width: 620px) {

}
`;
