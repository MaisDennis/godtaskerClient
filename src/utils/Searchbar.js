import React from 'react';

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  const BarStyling = {
    height: "36px",
    width: "100%",
    margin: 0,
    padding: "10px 12px",
    border:"1px solid #CCC",
    borderRadius: ".4rem",
    backgroundColor: "#FFF"
  }
  return (
    <input
      style={BarStyling}
      className="search-input"
      key="random1"
      value={keyword}
      placeholder='Buscar por nome de tarefa ou funcionário'
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar
