import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { Header, Home, Mydog, Userdogs, Newdog } from './components'

class App extends Component {
  state = {
    currentDog: {},
    loggedIn: false,
    loading: true,
    user: {},
    userId: String
  }

  activeDog = (data) => {
    this.setState({
      currentDog: data
    })
  }

  userData = (user, id) => {
    this.setState({
      user: { user },
      userId: id
    })
  }


  render() {
    return (
      < div className="App" >
        <Header userData={this.userData} loggedIn={this.state.loggedIn} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/mydog/:id" render={(renderProps) => <Mydog renderProps={renderProps} currentDog={this.state.currentDog} />} />
          <Route path="/mydogs" render={() => <Userdogs userId={this.state.userId} />} />
          <Route path="/newdog" render={(...routerProps) => <Newdog routerProps={routerProps} user={this.state.user} activeDog={this.activeDog} userId={this.state.userId} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
