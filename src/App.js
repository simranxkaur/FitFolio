import logo from './logo.svg';
import './App.css';
import WorkoutPlanner from './WorkoutPlanner';
import LogWorkouts from './LogWorkouts';
import WorkoutHistory from './WorkoutHistory';
import React, { useState } from 'react';

function App() {
  const [visibleForms, setVisibleForms] = useState([]);

  const handleButtonClick = (formType) => {
    if (visibleForms.includes(formType))
    {
      // Hide the form if same form is clicked again
      setVisibleForms([])
    }
    else
    {
      // Add form to visible forms and hide all others
      setVisibleForms([formType])
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Fitfolio: An App to Track Your Progress in the Gym!
        </p>
        <div>
          <button onClick={() => handleButtonClick('split')}>
            {visibleForms.includes('split') ? 'Hide Workout Split Form' : 'Design your workout split'}
          </button>

          <button onClick={() => handleButtonClick('log')}>
            {visibleForms.includes('log') ? 'Hide Workout Log Form' : 'Log your workouts'}
          </button>

          <button onClick={() => handleButtonClick('hist')}>
            {visibleForms.includes('hist') ? 'Hide Workout History' : 'View your workout history'}
          </button>
          {visibleForms.includes('split') && <WorkoutPlanner />}
          {visibleForms.includes('log') && <LogWorkouts />}
          {visibleForms.includes('hist') && <WorkoutHistory />}
        </div>
      </header>
    </div>
  );
}

export default App;