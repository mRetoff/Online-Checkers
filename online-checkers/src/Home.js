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
			currentUser: '',
			email: '',
			password: '',
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	async handleLogin(ev) {
		const {value: formValues} = await Swal.fire({
		  title: 'Login',
		  footer: '<a href>Not an existing user? Register</a>',
		  html:
		    '<input id="swal-input1" class="swal2-input" placeholder="Email">' +
		    '<input id="swal-input2" class="swal2-input" placeholder="Password">',
		  focusConfirm: false,
		  preConfirm: () => {
		    return [
		      document.getElementById('swal-input1').value,
		      document.getElementById('swal-input2').value
		    ]
		  }
		})
		//debug print out the string from input boxes
		if (formValues) {
			Swal.fire(JSON.stringify(formValues))
		}

		ev.preventDefault();
		auth.signInWithEmailAndPassword(this.email, this.password)
			.then(user => {
				this.setState({ currentUser: user });
				base.ref('users/' + user.uid).set({
					online: true,
				});
			})
			.catch(function (error) {
				const errorMessage = "Invalid email/password";
				alert(errorMessage);
			});
	}

	register() {
		auth.createUserWithEmailAndPassword(this.email, this.password)
		.then((user) => {
			//Add user to database
			base.ref('users/' + user.uid).set({
				username: this.state.name,
				email: this.state.email,
				online: false,
			});
		})
		.catch(function (error) {
			var errorMessage = "Invalid email/password";
			alert(errorMessage);
		});
	}

	setUserName(name) {
		this.state.currentUser.updateProfile({
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
		    Swal.fire(
		      'Logged Out',
		      'Hope to see you back soon!',
		      'success'
		    )
		  }
		})

		ev.preventDefault();
		auth.signOut().then(function () {
			base.ref('users/' + this.state.currentUser.uid).set({
				online: false,
			});
			this.setState({ currentUser: '' });
		}).catch(function (error) {
			// An error happened.
		});
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: user })
			}
		});

		var ref = base.ref("users/");
		ref.on("value", function(snapshot) {
		 snapshot.forEach(function(childSnapshot) {
			var child = childSnapshot.val();
			console.log(child);
		 });
		});
	}

	render() {
		return (
			<div id="homeLayout">
				<div id="topBorder">
					<h1 id="title">Online Checkers</h1>
					<div id="buttons">
						<button id="loginB" onClick={this.handleLogin}>
							{this.state.user ? <NavLink exact to="/profile" activeClassName="active">Manage Profile</NavLink>
								: "Login"}
						</button>
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
