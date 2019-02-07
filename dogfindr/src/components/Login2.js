import React, { Component } from "react";
import { Link } from 'react-router-dom'
import firebase from "firebase"
import axios from 'axios'

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

firebase.initializeApp({
    apiKey: "AIzaSyDamK92ciQZKm1kx-21OgMgH1OwMZyvZ1s",
    authDomain: "dogfindr.firebaseapp.com",
    databaseURL: "https://dogfindr.firebaseio.com",
    projectId: "dogfindr",
    storageBucket: "dogfindr.appspot.com",
    messagingSenderId: "87422424573"
})

const googleProvider = new firebase.auth.GoogleAuthProvider();

function loginWithGoogle() {
    return firebase.auth().signInWithRedirect(googleProvider);
}

class Login extends Component {
    state = {
        loggedIn: false,
        user: {}
    }

    userSignin = (user) => {
        this.setState({
            user: user,
            loggedIn: true
        })
        let userdetails = {
            email: this.state.user.email,
            name: this.state.user.displayName,
            dogs: []
        }
        axios.post("http://localhost:8080/newuser", userdetails)
            .then(({
                data
            }) => {
                if (data) {
                    localStorage.setItem("userId", data._id)
                    this.props.userData(this.state.user, data._id)
                }
            })
    }

    logOut = () => {
        firebase.auth().signOut().then(() => {
            this.setState({
                loggedIn: false
            })
            localStorage.removeItem(appTokenKey)
        }).catch(function (error) {
            console.log(error)
        });
    }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error);
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    componentWillMount() {
        if (localStorage.getItem(appTokenKey)) {
            this.userSignin()
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.removeItem(firebaseAuthKey);
                localStorage.setItem(appTokenKey, user.uid);
                this.userSignin(user);
            }
        });
    }

    render() {
        if (localStorage.getItem(firebaseAuthKey) === "1") {
            return <h1 > </h1>
        } else if (this.state.loggedIn) {
            return (
                <div>
                    <Link to="/mydogs"><button className="btn btn-outline-info"> My Dogs </button> </Link>
                    <Link to="/"><button className="btn btn-outline-info" onClick={this.logOut}> Log Out </button></Link>
                </div>
            )
        } else {
            return <LoginInput handleGoogleLogin={
                this.handleGoogleLogin
            }
            />;
        }
    }
}

const LoginInput = ({ handleGoogleLogin }) => (
    <div >
        <Link to="/"><button className="btn btn-outline-info" onClick={handleGoogleLogin} >Sign In With Google </button></Link>
    </div>
);

export default Login