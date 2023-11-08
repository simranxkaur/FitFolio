import React, { Component } from 'react';

class SplitCreation extends Component {

  constructor() {
    super();
    this.state = {
      showAddConfirm: false
    };
  }

  handleExerciseAddClick = () => {
    this.setState({
      showAddConfirm: true
      //code for adding a split! :3
    });
  };

    render() {
    return (
      <div>
        <h2>Split creation</h2>
        <div>
              <input
                type="text"
                name="eName"
                placeholder="Exercise Name"
              />
              <select name="Exercise Type">
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
              </select>
              <button onClick={this.handleExerciseAddClick}>Add Exercise</button>
        </div>
        {this.state.showAddConfirm && <h3>Added succesfully!</h3>}
      </div>
    );
  }
}

export default SplitCreation;