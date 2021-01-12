import styled from 'styled-components';
import search from '~/assets/search-24px.svg';
import { darken } from 'polished';

export const Container = styled.div`
.list-header {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  border-radius: 4px;
  padding: 0;
  margin: 4px 0 10px;
  /* background: #a0da; */
  @media (max-width: 620px) {
    height: auto;
  }
}

.list-header-button {
  margin: 0 8px;
  border: none;
  background-color: #F5F5F5;
}

.list-header-div {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0 0;
  padding: 4px 0;
  /* background: #a0daa9; */
}
.header-input {
  height: 44px;
  width: 300px;
  font-size: 16px;
  font-weight: normal;
  text-indent: 24px;
  color: #333;
  border: 0;
  border-radius: 4px;
  padding: 0px 15px;
  background: #FFF url(${search}) no-repeat center left 7px;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: .5rem 10px .5rem 5px;
  margin: 1rem 0 .5rem;
  border-radius: 4px;
  /* box-shadow: 2px 2px 2px #ccc; */
  border-bottom: 1px solid #ccc;
  /* background-color: #fff; */
  /* background: #b86d29; */

}

.title-strong {
  width: 220px;
  max-width: 220px;
  text-align: center;
  margin: auto 0;
  /* background: #ffc87c; */
}

.worker-strong {
  width: 330px;
  max-width: 330px;
  text-align: center;
  margin: auto 0;
  /* background: #ffc87c; */
}

.short-tag {
  width: 110px;
  text-align: center;
  margin: auto 0;
  /* background-color: #fff; */
}
.short-tag-last {
  width: 48px;
  text-align: center;
}

.bell-tag {
  padding: auto;
  width: 48px;
  text-align: center;
  margin: auto 0;
  /* background-color: #ff4; */
}

.bell-tag.last {
  padding: auto;
  width: 48px;
  margin: auto 0;
  margin-right: 12px;
  /* background-color: #ff4; */
}

.long-tag {
  width: 100%;
  max-width: 990px;
}

.name-label {
  margin-right: 0;
}

.long-label {
  width: 100%;
  max-width: 990px;
}


.item-list {
  min-height: 35vh;
  max-height: 45vh;
  margin-bottom: 12px;
  border-radius: 4px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  background-color: #fff;
}

@media (max-width: 620px) {
  .title-bar {
    height: auto;
    width: auto;
    margin: 0;
  }
}
`;
