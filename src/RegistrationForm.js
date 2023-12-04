//we could prolly delete this nonsense
import React, { Component } from 'react';

class RegistrationForm extends Component {
  state = {
    username: '',
    password: '',
    registrationMessage: '', // To display registration status
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegistration = () => {
    // Extract registration data from state
    const { username, password } = this.state;

    // Prepare the registration data to send to the server
    const registrationData = { username, password };

    // Send a POST request to the server for registration
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Registration successful') {
          // Registration was successful
          this.setState({
            registrationMessage: 'Registration successful',
            username: '', // Clear input fields
            password: '', // Clear input fields
          });
        } else {
          // Handle registration failure
          this.setState({
            registrationMessage: 'Registration failed',
          });
        }
      })
      .catch((error) => {
        console.error('Registration request failed:', error);
        this.setState({
          registrationMessage: 'Registration failed',
        });
      });
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
        <p>{this.state.registrationMessage}</p>
      </div>
    );
  }
}

export default RegistrationForm;