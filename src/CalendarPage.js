import React, { Component } from 'react';

class CalendarPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: null,
      selectedMonth: 1, // Initialize with January (1)
      selectedYear: 2023, // Initialize with a year of your choice
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

  handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value, 10);
    this.setState({
      selectedMonth,
    });
  };

  handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    this.setState({
      selectedYear,
    });
  };

  render() {
    const { selectedDate, notes, selectedMonth, selectedYear } = this.state;

    return (
      <div>
        <h2>Calendar</h2>
        <div className="calendar">
          {/* Dropdowns for Month and Year */}
          <div>
            <label>Month:</label>
            <select onChange={this.handleMonthChange} value={selectedMonth}>
              {Array.from({ length: 12 }, (_, month) => (
                <option key={month + 1} value={month + 1}>
                  {new Date(selectedYear, month, 1).toLocaleString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Year:</label>
            <select onChange={this.handleYearChange} value={selectedYear}>
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index} value={selectedYear + index}>
                  {selectedYear + index}
                </option>
              ))}
            </select>
          </div>
          <div>
            {Array.from({ length: 31 }, (_, day) => {
              const date = day + 1;
              return (
                <button
                  key={day}
                  onClick={() => this.handleDateClick(date)}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
        {selectedDate && (
          <div>
            <h3>Workout From Day {selectedDate}</h3>
            <textarea
              value={notes[selectedDate] || ''}
              onChange={this.handleNoteChange}
              placeholder="Workout History"
            />
          </div>
        )}
      </div>
    );
  }
}

export default CalendarPage;
