//we can prolly delete this

import React, { Component } from 'react';
import SplitCreation from './WorkoutPlanner';

class LoginScreen extends Component 
{
  constructor() {
    super();
    this.state = {
      showLogin: true,
      showHelloMessage: false,
      showAdditionalButtons: false,
      showSplit: false
    };
  }

  handleLoginClick = () => {
    this.setState({
      showLogin: false,
      showHelloMessage: true,
      showAdditionalButtons: true,
    });
  };

  handleSplitClick = () => {
    this.setState({
      showSplit: true
    });
  };

  handleLogClick = () => {
    this.setState({
      showSplit: false
    });
  };

  handleHistClick = () => {
    this.setState({
      showSplit: false
    });
  };

  render() {
    return (
      <div>
        {this.state.showLogin && (
          <div>
            <h2>Login Form</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
            />
            <button onClick={this.handleLoginClick}>Login</button>
          </div>
        )}
        {this.state.showHelloMessage && (
          <div>
            <h1>Hello, User! What would you like to do?</h1>
          </div>
        )}
        {this.state.showAdditionalButtons && (
          <div>
            <button onClick={this.handleSplitClick}> Design your workout split. </button>
            <button onClick={this.handleLogClick}> Log your workouts. </button>
            <button onClick={this.handleHistClick}> View your workout history. </button>
          </div>
        )}
        {this.state.showSplit && <SplitCreation/>}
      </div>
    );
  }
}

export default LoginScreen;