import logo from './logo.svg';
import './App.css';
import WorkoutPlanner from './WorkoutPlanner';
import React, { useState } from 'react';

function App() {
  const [isSplitCreationVisible, setSplitCreationVisible] = useState(false);

  const handleButtonClick = () => {
    setSplitCreationVisible(!isSplitCreationVisible); // Toggle the visibility
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Fitfolio: An App to Track Your Progress in the Gym!
        </p>
        <div>
          <button onClick={handleButtonClick}>
            {isSplitCreationVisible ? 'Hide Workout Split Form' : 'Design your workout split'}
          </button>
          <button> Log your workouts. </button>
          <button> View your workout history. </button>
          {isSplitCreationVisible && <WorkoutPlanner />}
        </div>
      </header>
    </div>
  );
}

export default App;