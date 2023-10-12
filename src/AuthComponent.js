import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

class AuthComponent extends Component {
  state = {
    showRegistrationForm: false,
    showLoginForm: false,
  };

  showRegistration = () => {
    this.setState({ showRegistrationForm: true, showLoginForm: false });
  };

  showLogin = () => {
    this.setState({ showRegistrationForm: false, showLoginForm: true });
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.showRegistration}>Register</button>
          <button onClick={this.showLogin}>Login</button>
        </div>
        {this.state.showRegistrationForm && <RegistrationForm />}
        {this.state.showLoginForm && <LoginForm />}
      </div>
    );
  }
}

export default AuthComponent;