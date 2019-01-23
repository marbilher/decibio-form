import React from 'react'
import './App.css';
import {users} from './UniversityData'
import {fuzzysearch, SearchInput, CheckBoxes, UserList, User, NavBar} from './FormVariables'


class App extends React.Component {
  constructor() {
    super()
    
    this.renderInput = this.renderInput.bind(this)
    this.parseDatabase = this.parseDatabase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSort = this.onSort.bind(this)
    this.removeUntagged = this.removeUntagged.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    
    this.state = {
      value: '',
      isLoading: true,
      CRISPR: false,
      Clinical: false,
      Diagnostics: false,
      MolBio: false,
      Genetics: false,
      Hospital: false,
      checked:false,
      data: [],
      filtered: [],
      showFiltered: false
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

  handleCheck(event, value) {
    // var currentValue = this.state.value;
    // var eventTarget = event.target;
    // var checkedObject = {eventTarget: {currentValue}}
    // i tried passing the same format into handlechange but doesn't work

    this.setState({
      [event.target.id]:event.target.checked
    })


    //whenever a checkbox is hit, removeUntagged from filtered

    // const filtered = this.state.filtered.filter(
    //   item => 
    //     this.removeUntagged(item.Tags)
    // )
    
    // this.setState({
    //   value,
    //   filtered,
    //   showFiltered: true
    // })

  }

  componentDidUpdate(prevProps) {
    var currentInputValue = this.state.value
    if (!currentInputValue || 0 === currentInputValue.length) {
      debugger;
      return;
    }
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
  }

  
  removeUntagged(array) {
  var checkedBoxes = [];
  if (this.state.CRISPR) {
    checkedBoxes.push('CRISPR')
  }
  if (this.state.Clinical) {
    checkedBoxes.push('Clinical')
  }
  if (this.state.Diagnostics) {
    checkedBoxes.push('Diagnostics')
  }
  if (this.state.Hospital) {
    checkedBoxes.push('Hospital')
  }
  if (this.state.MolBio) {
    checkedBoxes.push('Mol-Bio')
  }
  if (this.state.Genetics) {
    checkedBoxes.push('Genetics')
  }
  for (var i = 0; i < checkedBoxes.length; i++) {
    var beingChecked = checkedBoxes[i];
    var isItIncluded = array.includes(beingChecked)
    if (isItIncluded == true) {
      return true;
    }
    return false;
  }
}

  
  
  handleChange({target:{value}}) {
    
    if (!value.trim().length) {
      this.setState({value: '', filtered: [], showFiltered: false})
    } else {
      const preFiltered = this.state.data.filter(
        item => 
          fuzzysearch(value, item.AccountName) ||
          fuzzysearch(value, item.Country)
      ) 
      const filtered = preFiltered.filter(
        item => 
          this.removeUntagged(item.Tags)
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
      console.log('parsing db')
      // collapse all arrays in each database object to be searched
      var newKeys = Object.keys(incomingData[key]);
      for (var i = 0; i < newKeys.length; i++) {
          var val = incomingData[key][newKeys[i]];
          if(Array.isArray(val) && [newKeys[i]] != "Tags") {
            val = val.toString();
            incomingData[key][newKeys[i]] = val;
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
      <div className='l-container'>
      <SearchInput
        onChange={this.handleChange}
        value={this.state.value} />
       
        <CheckBoxes
        onChange={this.handleCheck}
         />
        </div>
    )
  }

  render() {
    return (
      <div className="container-fluid project-font">
      <NavBar/>
        {this.renderInput()}
        {this.renderUsers()}
      </div>
    )
  }
}

export default App;