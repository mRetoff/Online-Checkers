import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div id="homeLayout">
        <div id="topBorder">
            <h1 id="title">Online Checkers</h1>
            <div id="buttons">
                <button id="loginB">Login</button>
                <button id="logoutB">Logout</button>
            </div>
        </div>
        <div id="page">
            <div id="timer">
            
            </div>
            <div id="board">
            
            </div>
            <div id="userList">
            
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
