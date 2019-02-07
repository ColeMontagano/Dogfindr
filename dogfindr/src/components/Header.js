import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Login2 from "./Login2"

class Header extends Component {
  state = {
    dogId: "",
    loggedIn: false
  }

  loggedInState = () => {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" onChange={(e) => { this.setState({ dogId: e.target.value }) }} placeholder="Enter Dog ID" aria-label="Search" />
              <Link to={`/mydog/${this.state.dogId}`}><button className="btn btn-outline-info my-2 my-sm-0 navbutton" type="btn">Find Dog</button></Link>
            </form>
            <li className="nav-item">
              <Login2 userData={this.props.userData} loggedInState={this.loggedInState} logout={this.props.logOut} loggedIn={() => this.props.loggedIn} history={this.props.renderProps} activeDog={this.props.activeDog} />
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header