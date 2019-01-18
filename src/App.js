import React from 'react'
import './App.css';
import {users} from './UniversityData'
import {fuzzysearch, SearchInput, UserList, Avatar, Row, User} from './FormVariables'


// function fuzzysearch (needle, haystack) {
//   let hlen = haystack.length
//   let nlen = needle.length
//   if (nlen > hlen) {
//     return false
//   }
//   if (nlen === hlen) {
//     return needle === haystack
//   }
//   outer: for (var i = 0, j = 0; i < nlen; i++) {
//     let nch = needle.charCodeAt(i)
//     while (j < hlen) {
//       if (haystack.charCodeAt(j++) === nch) {
//         continue outer
//       }
//     }
//     return false
//   }
//   return true
// }

// const SearchInput = ({value, onChange}) => (
//   <div className="searchContainer component">
//     <input
//       placeholder="Type your search query"
//       type="text"
//       value={value}
//       onChange={onChange} />
//   </div>
// )

// const Avatar = ({src, alt}) => (
//   <img className="avatar component" src={src} alt={alt} />
// )

// const Row = ({children, className}) => (
//   <div className={`row ${className || ''}`}>
//     {children}
//   </div>
// )

// const User = ({username, displayName, avatarUrlSmall, url, id}) => (
//   <Row className="userItem component" key={id}>
//     <div className="avatarContainer">
//       <Avatar src={avatarUrlSmall} alt={`${displayName} | @${username}`} />
//     </div>
    
//     <div className="userInfoContainer">
//       <div className="displayName">{displayName}</div>
//       <div className="username">@{username}</div>
//     </div>
//   </Row>
// )

// const UserList = ({data}) => (
//   <div className="userList component">
//     {data.map(item => <User {...item} />)}
//   </div>
// )


class App extends React.Component {
  constructor() {
    super()
    
    this.renderInput = this.renderInput.bind(this)
    this.parseDatabase = this.parseDatabase.bind(this)
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
    this.parseDatabase(users);
    setTimeout(() => this.setState({ isLoading: false}), 0)
  }
  
  
  handleChange({target: {value}}) {
    if (!value.trim().length) {
      this.setState({value: '', filtered: [], showFiltered: false})
    } else {
      const filtered = this.state.data.filter(
        item => 
          fuzzysearch(value, item['Account Name']) ||
          fuzzysearch(value, item['Country'])
      )
      this.setState({
        value,
        filtered,
        showFiltered: true
      })
    }
  }

//  aysnc parseDatabase(incomingData){
//     var values = Object.getOwnPropertyNames(incomingData).map(function(key) {
//       return incomingData[key];
//         });
//   }

  parseDatabase(incomingData){
    var values = Object.getOwnPropertyNames(incomingData).map(function(key) {
      return incomingData[key];
        });
      this.setState({
        data: values
      })
  }

  renderUsers() {
    const {isLoading, data, showFiltered, filtered} = this.state
    
    return isLoading || !data
      ? <div className="component">Loading</div>
      : <UserList data={showFiltered ? filtered : data} />
  }
                     
  renderInput() {
    return (
      <SearchInput
        onChange={this.handleChange}
        value={this.state.value} />
    )
  }

  render() {
    return (
      <div className="appContainer component">
        {this.renderInput()}
        {this.renderUsers()}
      </div>
    )
  }
}

export default App;