import React, { Component } from 'react';
import base from './base';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userList: [],
			currentUser: '',
		}
	}

	componentWillMount() {
		base.syncState('userList', {
			context: this,
			state: 'userList',
			asArray: true,
		})
	}

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