import React from 'react'

function filters(original, filterWord, anotherWord) {
  const filteredOriginal = original.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(filterWord) || titleDetail.toLowerCase().includes(anotherWord) 
  })
  return filteredOriginal
}

export default filters
