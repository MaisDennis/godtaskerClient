import React from 'react'

function sort(key) {
  // key.map(a => {
  //   if (a.price) {
  //     a.parsedPrice = parseFloat(a.price
  //       .replace(/\r?\n|\r/g, "")
  //       .trim()
  //       .replace('.','')
  //       .replace(',','.')
  //       .slice(2, ));
  //   }
  //   return a;
  // })

  key.sort(compare);

  function compare(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.parsedPrice < b.parsedPrice) {
      return -1;
    }
    return 0;
  }   return (key)
}

export default sort
