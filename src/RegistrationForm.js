// RegistrationForm.js
import React, { Component } from 'react';

class RegistrationForm extends Component {
  state = {
    username: '',
    password: '',
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegistration = () => {
    // You can handle the registration logic here, e.g., send the data to a server or store it in state.
  };

  render() {
    return (
      <div>
        <h2>Registration Form</h2>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button type="button" onClick={this.handleRegistration}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;