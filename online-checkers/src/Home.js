import React, { Component } from 'react';
import base from './base';
import { auth } from './base'
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userList: [],
			currentUser: '',
			email: '',
			password: '',
			user: '',
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogin(ev) {
		ev.preventDefault();
		auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
			var errorMessage = "Invalid email/password";
			alert(errorMessage);
		});
	}

	handleLogout(ev) {
		ev.preventDefault();
		auth().signOut().then(function() {
			// Sign-out successful.
		}).catch(function(error) {
			// An error happened.
		});
	}

	componentWillMount() {
		base.syncState('userList', {
			context: this,
			state: 'userList',
			asArray: true,
		})
		this.setState({ user: auth().currentUser() });
	}

	render() {
		return (
			<div id="homeLayout">
				<div id="topBorder">
					<h1 id="title">Online Checkers</h1>
					<div id="buttons">
						<button id="loginB" onClick={this.handleLogin}>Login</button>
						<button id="logoutB" onClick={this.handleLogout}>Logout</button>
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