import React from 'react';

const SearchBar = ({ input: keyword, onChange: setKeyword, placeholder: keyPlaceHolder }) => {
  const BarStyling = {
    height: "36px",
    width: "100%",
    maxWidth: '440px',
    margin: 0,
    padding: "0 12px",
    border:"1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#FFF"
  }
  return (
    <input
      style={BarStyling}
      className="search-input"
      key="random1"
      value={keyword}
      placeholder={keyPlaceHolder}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar
