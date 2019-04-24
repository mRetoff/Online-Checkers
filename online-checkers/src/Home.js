import React, { Component } from 'react';
import { auth, base } from './base';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userList: [],
			currentUser1: '',
			currentUser2: '',
			email1: '',
			password1: '',
			username1: '',
			email2: '',
			password2: '',
			username2: '',
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	async handleLogin(ev) {
		const { value: formValues } = await Swal.fire({
			title: 'Login',
			footer: '<a href>Not an existing user? Register</a>',
			html:
				'<input id="swal-input1" class="swal2-input" placeholder="Email">' +
				'<input id="swal-input2" class="swal2-input" placeholder="Password">',
			focusConfirm: false,
			preConfirm: () => {
				return [
					this.setState({
						email1: document.getElementById('swal-input1').value,
						password1: document.getElementById('swal-input2').value
					})
				]
			}
		})
		//debug print out the string from input boxes
		//if (formValues) {
		//Swal.fire(JSON.stringify(formValues))
		//}
		auth.signInWithEmailAndPassword(this.state.email1, this.state.password1)
			.then(user => {
				this.setState({ currentUser1: user });
				console.log("Logged in");
			})
			.catch(function (error) {
				const errorMessage = "Invalid email/password";
				alert(errorMessage);
			});
	}

	register() {
		auth.createUserWithEmailAndPassword(this.email1, this.password1)
			.then((user) => {
				//Add user to database
				base.ref('users/' + user.uid).set({
					username: this.state.username1,
					email: this.state.email1,
					wins: 0,
					losses: 0,
				});
			})
			.catch(function (error) {
				var errorMessage = "Invalid email/password";
				alert(errorMessage);
			});
	}

	setUserName(name) {
		this.state.currentUser1.user.updateProfile({
			displayName: name,
		})
			.then(console.log("Success"))
			.catch(console.log("Error"));
	}

	handleLogout(ev) {
		Swal.fire({
			title: 'Are you sure you want to logout?',
			text: "You will have to log back in to play again!",
			type: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, logout'
		}).then((result) => {
			if (result.value) {
				auth.signOut().then(() => {
					this.setState({ currentUser1: '' });
					console.log("Logged out")
				}).catch((error) => {
					console.log(error)
				});
				Swal.fire(
					'Logged Out',
					'Hope to see you back soon!',
					'success'
				)
			}
		})
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: user })
			}
		});

		/*var ref = base.ref("users/");
		ref.on("value", function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				var child = childSnapshot.val();
				console.log(child);
			});
		});*/
	}

	render() {
		return (
			<div id="homeLayout">
				<div id="topBorder">
					<h1 id="title">Online Checkers</h1>
					<div id="buttons">
						{this.state.currentUser1 ? <button id="logoutB" onClick={this.handleLogout}>Logout User 1</button>
							: <button id="loginB" onClick={this.handleLogin}>Login User 1</button>}
						{this.state.currentUser2 ? <button id="logoutB" onClick={this.handleLogout2}>Logout User 2</button>
							: <button id="loginB" onClick={this.handleLogin2}>Login User 2</button>}
					</div>
				</div>
				<div id="page">
					<div id="timer">
					
					</div>
					<div id="board">

					</div>
				</div>
			</div>
		);
	}
}

export default Home;
