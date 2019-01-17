import React, { Component } from 'react';
import './App.css';
import {users} from './UniversityData'
import {fuzzysearch, SearchInput, UserList, Avatar, Row, User} from './FormVariables'



// https://github.com/bevacqua/fuzzysearch



class App extends React.Component {
  constructor() {
    super()
        
    this.handleChange = this.handleChange.bind(this)
    
    this.state = {
      value: '',
      isLoading: true,
      data: [],
      filtered: [],
      showFilterd: false
    }
  }
  
  componentDidMount() {
    setTimeout(() => this.setState({data: users, isLoading: false}), 0)
  }
  
  
  handleChange({target: {value}}) {
    if (!value.trim().length) {
      this.setState({value: '', filtered: [], showFiltered: false})
    } else {
      const filtered = this.state.data.filter(
        item => 
          fuzzysearch(value, item.username) ||
          fuzzysearch(value, item.displayName)
      )
      this.setState({
        value,
        filtered,
        showFiltered: true
      })
    }
  }

  render() {
    // const {isLoading, data, showFiltered, filtered} = this.state;        
    // isLoading || !data
    // ? <div className="component">Loading</div>
    // : <UserList data={showFiltered ? filtered : data} />
    return (
      <body>
      <SearchInput
        onChange={this.handleChange}
        value={this.state.value} />
        </body>
    )
  }
}

export default App;

