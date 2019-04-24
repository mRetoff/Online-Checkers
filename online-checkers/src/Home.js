import React, { Component } from 'react';
import { auth, base } from './base';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Home.css';
import Board from "./Checkers";

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userList: [],
			currentUser: '',
			email: '',
			password: '',
			username: '',
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.register = this.register.bind(this);
	}

	async handleLogin(ev) {
		const { value: formValues } = await Swal.fire({
			title: 'Login',
			footer: '<a href>Not an existing user? Register</a>',
			html:
				'<input type="email" id="swal-input1" class="swal2-input" placeholder="Email">' +
				'<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">',
			focusConfirm: false,
			allowOutsideClick: true,
			preConfirm: () => {
				return [
					this.setState({
						email: document.getElementById('swal-input1').value,
						password: document.getElementById('swal-input2').value
					})
				]
			}
		})
		//debug print out the string from input boxes
		//if (formValues) {
		//Swal.fire(JSON.stringify(formValues))
		//}
		if (formValues) {
			auth.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(user => {
					this.setState({ currentUser: user });
					Swal.fire({
						type: 'success',
						title: 'Success',
						text: 'You\'ve successfully logged in',
					})
				})
				.catch(function (error) {
					Swal.fire({
						type: 'error',
						title: 'Error',
						text: 'Invalid Email/Password',
					})
				});
		}

	}

	async register() {

		const { value: registerValues } = await Swal.fire({
			title: 'Register',
			html:
		   	'<input type="text" id="swal-input1" class="swal2-input" placeholder="Username">' +
				'<input type="email" id="swal-input2" class="swal2-input" placeholder="Email">' +
				'<input type="password" id="swal-input3" class="swal2-input" placeholder="Password">',
			focusConfirm: false,
			allowOutsideClick: true,
			preConfirm: () => {
				return [
					this.setState({
						username : document.getElementById('swal-input1').value,
						email: document.getElementById('swal-input2').value,
						password: document.getElementById('swal-input3').value,
					})
				]
			}
		})

		if (registerValues){
			auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((user) => {
					//Add user to database
					base.ref('users/' + user.uid).set({
						username: this.state.name,
						email: this.state.email,
						password: this.state.password,
						wins: 0,
						losses: 0,
					});

					Swal.fire({
						type: 'success',
						title: 'Success',
						text: 'You\'ve successfully created and account. You can log in now!',
					})

				})
				.catch(function (error) {
					Swal.fire({
					  type: 'error',
					  title: 'Oops...',
					  text: 'Email/Username alredy taken!',
					})
				});

		}
	}

	setUserName(name) {
		this.state.currentUser.user.updateProfile({
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
					this.setState({ currentUser: '' });
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
						{!this.state.currentUser ? <button id="loginB" onClick={this.handleLogin}>Login</button>
						: <button id="logoutB" onClick={this.handleLogout}>Logout</button>}
						<button id="registerB" onClick={this.register}> 	Register	</button>
					</div>
				</div>
				<div id="page">
					<div id="sidebar">
						<div id="timer">

						</div>
						<div id="turn">
							It is ___'s turn
						</div>
					</div>
					<div id="board">
						<div id="user">{this.state.username}</div>
						<Board/>
						<div id="guest">Guest</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
