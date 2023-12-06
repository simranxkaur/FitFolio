// WorkoutContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workoutSplit, setWorkoutSplit] = useState(null);
  const [logWorkouts, setLogWorkouts] = useState({});
  const [weeklySessions, setWeeklySessions] = useState([]);
  const [setsData, setSetsData] = useState({});

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedSplit = JSON.parse(localStorage.getItem('workoutSplit'));
    const storedLogWorkouts = JSON.parse(localStorage.getItem('logWorkouts'));
    const storedWeeklySessions = JSON.parse(localStorage.getItem('weeklySessions'));
    
    if (storedSplit) {
      setWorkoutSplit(storedSplit);
    }

    if (storedLogWorkouts) {
      setLogWorkouts(storedLogWorkouts);
    }

    if (storedWeeklySessions) {
      setWeeklySessions(storedWeeklySessions);
    }
  }, []);

  const updateWorkoutSplit = (newSplit) => {
    setWorkoutSplit(newSplit);
    localStorage.setItem('workoutSplit', JSON.stringify(newSplit));
  };

  const updateLogWorkouts = (newLog) => {
    setLogWorkouts(newLog);
    localStorage.setItem('logWorkouts', JSON.stringify(newLog));
  };

  const updateWeeklySessions = (newSessions) => {
    setWeeklySessions(newSessions);
    localStorage.setItem('weeklySessions', JSON.stringify(newSessions));
  };

  const updateSetsData = (newSetsData) => {
    setSetsData(newSetsData);
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutSplit,
        updateWorkoutSplit,
        logWorkouts,
        updateLogWorkouts,
        weeklySessions,
        updateWeeklySessions,
        setsData,
        updateSetsData,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};
