import React, { Component } from 'react';

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: true,
      showHelloMessage: false,
      showAdditionalButtons: false,
    };
  }

  handleLoginClick = () => {
    this.setState({
      showLogin: false,
      showHelloMessage: true,
      showAdditionalButtons: true,
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
            <button> Design your workout split. </button>
            <button> Log your workouts. </button>
            <button> View your workout history. </button>
          </div>
        )}
      </div>
    );
  }
}

export default LoginScreen;