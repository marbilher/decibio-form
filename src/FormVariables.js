import React from 'react'
import { FaBook, FaUniversity, FaTags, FaGlobe, FaPencilAlt } from 'react-icons/fa';
import { Badge } from 'reactstrap';



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
    <div className="">
    <h1 className='Form-label text-uppercase margin-auto'>search &ensp;
      <input
        className='round corner'
        type="text"
        value={value}
        onChange={onChange} />
        </h1>
    </div>
  )

  export const CheckBoxes = ({value, onChange}) => (
    <form className='Form check-container row'>
        <input type="checkbox"
        id='CRISPR' 
        onChange={onChange} 
        defaultChecked
        className='CRISPR Form-input'/>
		<label for='CRISPR' className='Form-label sm'>CRISPR</label>
    <input type="checkbox"
        id='Genetics' 
        onChange={onChange} 
        defaultChecked
        className='Genetics Form-input'/>
		<label for='Genetics' className='Form-label sm'>Genetics</label>
    <input type="checkbox"
        id='MolBio' 
        onChange={onChange} 
        defaultChecked
        className='MolBio Form-input'/>
		<label for='MolBio' className='Form-label sm'>Mol-Bio</label>
    <input type="checkbox"
        id='Diagnostics' 
        onChange={onChange} 
        defaultChecked
        className='Diagnostics Form-input'/>
		<label for='Diagnostics' className='Form-label sm'>DIAG</label>
    <input type="checkbox"
        id='Clinical' 
        onChange={onChange} 
        defaultChecked
        className='Clinical Form-input'/>
		<label for='Clinical' className='Form-label sm'>Clinical</label>
    <input type="checkbox"
        id='Hospital' 
        onChange={onChange} 
        defaultChecked
        className='Hospital Form-input'/>
		<label for='Hospital' className='Form-label sm'>Hospital</label>
  </form>
  )



  
  
  
  export const User = ({AccountName, Country, Tags, PublicationCount, AuthorCount, id}) => (
    <tr className="userItem component" key={id}>
        <td data-title="AccountName" className='AccountName nudge-right'>{AccountName}</td>
        <td data-title="Country" className='Country'>{Country}</td>
        <td data-title="PublicationCount" className='PublicationCount numeric'>{PublicationCount}</td>
        <td data-title="AuthorCount" className='AuthorCount numeric'>{AuthorCount}</td>
        <td data-title="Tags" className='Tags table-tags'>
        {Tags.map(tag => <Badge className='table-tag'>{tag}</Badge>)} 
          </td>
    </tr>
  )
  
  export const NavBar = () => (
  <nav className="navbar-expand-lg decibio-navbar">
  <a className="navbar-title text-uppercase" >Decibio</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse text-uppercase" id="navbarText">
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
      <thead className='cf font-weight-bold text-white'>
            <tr className='table-primary table-top'>
              {/* easy to implement below, use props*/}
              {/* <th onClick={e => this.props.onSort(e, 'AccountName')}>Name</th> */}
              <th className='nudge-right large-text'><FaUniversity size={70}/>&ensp;University Name</th>
              <th className='numeric'><FaGlobe/>&ensp;Country</th>
              <th className='numeric'><FaBook/>&ensp;Publications</th>
              <th className='numeric'><FaPencilAlt/>&ensp;Authors</th>
              <th className='text-bold large-text'><FaTags size={56}/>&ensp;Tags</th>
            </tr>
          </thead>
      <tbody>
      {data.map(item => <User {...item} />)}
      </tbody>
    </table>
  )
  