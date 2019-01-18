import React from 'react'


export function fuzzysearch (needle, haystack) {
    let hlen = haystack.length
    let nlen = needle.length
    if (nlen > hlen) {
      return false
    }
    if (nlen === hlen) {
      return needle === haystack
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
      let nch = needle.charCodeAt(i)
      while (j < hlen) {
        if (haystack.charCodeAt(j++) === nch) {
          continue outer
        }
      }
      return false
    }
    return true
  }
  
  export const SearchInput = ({value, onChange}) => (
    <div className="searchContainer component">
      <input
        placeholder="Type your search query"
        type="text"
        value={value}
        onChange={onChange} />
    </div>
  )
  
  export const Row = ({children, className}) => (
    <div className={`row ${className || ''}`}>
      {children}
    </div>
  )
  
  export const User = ({AccountName, Country, url, id}) => (
    <Row className="userItem component" key={id}>
      
      <div className="userInfoContainer">
        <div className="AccountName">{AccountName}</div>
        <div className="Country">@{Country}</div>
      </div>
    </Row>
  )
  
  export const UserList = ({data}) => (
    <div className="userList component">
      {data.map(item => <User {...item} />)}
    </div>
  )
  