import React, { Component } from 'react';

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loginError: '',
      isLoggedIn: false,
      showAdditionalButtons: false
    };
  }

  handleLoginClick = () => {
    const { username, password } = this.state;

    // Check if the provided username and password are correct
    if (username === 'user' && password === 'password') {
      this.setState({
        isLoggedIn: true,
        loginError: '',
        showAdditionalButtons: true
      });
    } else {
      this.setState({ loginError: 'Invalid credentials' });
    }
  };

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div>
        {!this.state.isLoggedIn && (
          <div>
            <h2>Login Form</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <button onClick={this.handleLoginClick}>Login</button>
            {this.state.loginError && <p>{this.state.loginError}</p>}
          </div>
        )}
        {this.state.isLoggedIn && (
          <div>
            <h1>Hello, User! What would you like to do?</h1>
            {/* Additional buttons and content for logged-in users */}
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