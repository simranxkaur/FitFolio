import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

class RegisterLoginButtons extends React.Component {
  handleRegisterClick = () => {
    // Add your logic for handling the registration button click here
    alert('Registration button clicked');
  };

  handleLoginClick = () => {
    // Add your logic for handling the login button click here
  };

  render() {
    return (
      <div>
        <button onClick={this.handleRegisterClick}>Register</button>
        <button onClick={this.handleLoginClick}>Login</button>
      </div>
    );
  }
}

export default RegisterLoginButtons;