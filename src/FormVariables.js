import React from 'react'
import { FaBook, FaUniversity, FaTags, FaGlobe, FaPencilAlt } from 'react-icons/fa';


export function fuzzysearch (needle, haystack) {
  if (!haystack) {
    //UniversityData.js objects have inconsistent schema/pattern
    //Hebrew University for example has no country 
    //consequently we escape function here if it hits undefined
    return false
  }
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
    <div className="decibio-search nudge-right search ">
    <h1 className='search-text'>Database search: &ensp;
      <input
        className='round corner'
        type="text"
        value={value}
        onChange={onChange} />
        </h1>
    </div>
  )
  
  export const Row = ({children, className}) => (
    <div className={`row ${className || ''}`}>
      {children}
    </div>
  )
  
  export const User = ({AccountName, Country, Tags, PublicationCount, AuthorCount, id}) => (
    <tr className="userItem component" key={id}>
        <td data-title="AccountName" className='AccountName nudge-right'>{AccountName}</td>
        <td data-title="Country" className='Country'>{Country}</td>
        <td data-title="PublicationCount" className='PublicationCount numeric'>{PublicationCount}</td>
        <td data-title="AuthorCount" className='AuthorCount numeric'>{AuthorCount}</td>
        <td data-title="Tags" className='Tags'>{Tags}</td>
    </tr>
  )
  
  export const NavBar = () => (
  <nav className="navbar-expand-lg decibio-navbar">
  <a className="navbar-title" href="#">Decibio</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-links mr-auto ">
      <li className="nav-item active">
        <a className="nav-link white-link" href="#">Active University Publications <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link white-link" href="#">Life Science Journal Publications 2019 </a>
      </li>
      <li className="nav-item">
        <a className="nav-link white-link" href="#">International Reports</a>
      </li>
    </ul>
    <span className="navbar-text">
      
    </span>
  </div>
</nav>
  )
  
  export const UserList = ({data}) => (
    <table id="RoundedTable" className="table col-md-12 table-striped table-condensed cf">
      <thead className='cf'>
            <tr className='table-primary'>
              {/* easy to implement below, use props*/}
              {/* <th onClick={e => this.props.onSort(e, 'AccountName')}>Name</th> */}
              <th className='nudge-right'><FaUniversity/>&ensp;Name</th>
              <th><FaGlobe/>&ensp;Country</th>
              <th className='numeric'><FaBook/>&ensp;Publications</th>
              <th className='numeric'><FaPencilAlt/>&ensp;Authors</th>
              <th><FaTags/>&ensp;Tags</th>
            </tr>
          </thead>
      <tbody>
      {data.map(item => <User {...item} />)}
      </tbody>
    </table>
  )
  