import React from 'react';

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  const BarStyling = { width: "100%", border:"1px solid #CCC", backgroundColor: "#FFF", borderRadius: ".4rem", padding: "0.5rem"}
  return (
    <input
      style={BarStyling}
      className="search-input"
      key="random1"
      value={keyword}
      placeholder='Busca por Nome de Funcionário'
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar
