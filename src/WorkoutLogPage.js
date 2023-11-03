import React, { Component } from 'react';

class WorkoutLogPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: null,
      notes: {},
    };
  }

  handleDateClick = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  handleNoteChange = (event) => {
    const { selectedDate } = this.state;
    const note = event.target.value;
    this.setState((prevState) => ({
      notes: {
        ...prevState.notes,
        [selectedDate]: note,
      },
    }));
  };

  render() {
    const { selectedDate, notes } = this.state;

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    return (
      <div>
        <h2>Workout Log</h2>
        <div className="workout-log">
          <div>
            <p>Today's Date: {currentMonth}/{currentDay}/{currentYear}</p>
          </div>
          
          
            <div>
              <h3>Workout Notes for Day</h3>
              <textarea
                value={notes[selectedDate] || ''}
                onChange={this.handleNoteChange}
                placeholder="Enter Your Workout Split"
              />
            </div>
          
        </div>
      </div>
    );
  }
}

export default WorkoutLogPage;
