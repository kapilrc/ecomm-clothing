import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';


import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop.component';
import Homepage from './pages/homepage/homepage.component';
import SigninAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component';
import { auth } from './firebase/firebase.utils';

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({currentUser: user})
      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth()
  }

  render(){

    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/sign-in" component={SigninAndSignUpPage} /> 
        </Switch>
      </div>
    );
  }
}

export default App;
