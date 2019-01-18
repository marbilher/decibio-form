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
          fuzzysearch(value, item.AccountName) ||
          fuzzysearch(value, item.Country)
      )
      this.setState({
        value,
        filtered,
        showFiltered: true
      })
    }
  }


  parseDatabase(incomingData){
    var values = Object.getOwnPropertyNames(incomingData).map(function(key) {

      //collapse all arrays in each database object to be searched
      var newKeys = Object.keys(incomingData[key]);
      for (var i = 0; i < newKeys.length; i++) {
          var val = incomingData[key][newKeys[i]];
          if(Array.isArray(val)) {
            val = val.toString();
            incomingData[key][newKeys[i]] = val;
            //this converts the arrays
          }
      }
      
      let oldName = incomingData[key]['Account Name'];
      incomingData[key].AccountName = oldName;
      //delete keys from objects is 100 times slower than setting undefined
      //https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
      //this approach can drastically be improved upon by changing the renderUsers function
      //and deleting the key reassignments
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