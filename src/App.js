import React from 'react'
import './App.css';
import {users} from './UniversityData'
import {fuzzysearch, SearchInput, UserList, Row, User, NavBar} from './FormVariables'


class App extends React.Component {
  constructor() {
    super()
    
    this.renderInput = this.renderInput.bind(this)
    this.parseDatabase = this.parseDatabase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSort = this.onSort.bind(this)
    
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

  onSort(event, sortKey){
    const data = this.state.data;
    data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }

  
  
  handleChange({target: {value}}) {
    if (!value.trim().length) {
      this.setState({value: '', filtered: [], showFiltered: false})
    } else {
      const filtered = this.state.data.filter(
        item => 
          fuzzysearch(value, item.AccountName) ||
          fuzzysearch(value, item.Country) ||
          fuzzysearch(value, item.Tags)
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
      let oldPublicationCount = incomingData[key]['Publication Count'];
      let oldAuthorCount = incomingData[key]['Author Count'];
      let oldAccountType = incomingData[key]['Account Type'];
      incomingData[key].AccountName = oldName;
      incomingData[key].PublicationCount = oldPublicationCount;
      incomingData[key].AuthorCount = oldAuthorCount;
      incomingData[key].AccountType = oldAccountType;
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
      <div className="container-fluid">
      <NavBar/>
        {this.renderInput()}
        {this.renderUsers()}
      </div>
    )
  }
}

export default App;