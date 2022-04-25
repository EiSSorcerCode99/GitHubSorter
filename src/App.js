import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  async componentDidMount() {
   this.setState({loading: true});
   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({users: res.data, loading: false}); 
  }

// Search Github users
  searchUsers = async text => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({users: res.data.items, loading: false}); 
  }
  // Search single github user
  getUser = async username => { 
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({user: res.data, loading: false}); 
  }

  // Clear users from state
  clearUsers = () => {
    this.setState({users: [], loading: false});
  }
  //Set Alert for non-input state 
  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}});
     
    setTimeout(() => this.setState({alert: null}), 5000)
  }

  render() {
    const {users, user, loading} = this.state;
  return (
    <Router>
    <div className="App">
      <Navbar   />
      <div className="container">
        <Alert alert={this.state.alert}/>
        <Routes>
          <Route path='/' element={
            <Fragment>
               <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true: false} 
                  setAlert={this.setAlert}/>
              <Users loading={loading} users={users} />
            </Fragment>
          } />
          <Route
            exact path='/about' element={<About /> }
            />
            <Route path='/user/:login' element={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading}/>
            )} />
        </Routes>
      </div>
    </div>
    </Router>
  );
  }
}

export default App;
