import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div id="homeLayout">
        <div id="topBorder">
            <h1 id="title">Online Checkers</h1>
            <button className="button" id="backB">
              <NavLink exact to="/" activeClassName="active">Back</NavLink>
            </button>
        </div>
        <div id="page">
          <h2 id="account">___'s Account</h2>
        </div>
      </div>
    );
  }
}

export default Profile;
