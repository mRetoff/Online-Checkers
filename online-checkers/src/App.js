import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { BrowserRouter as Router } from 'react-router-dom'

import Profile from './Profile';
import Home from './Home';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{position: "absolute", width: "100%"}}>
        <Router>
          <Route path="/profile" exact strict component={Profile} />
          <Route path="/" exact strict component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
