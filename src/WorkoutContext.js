// This file is used to store and get the split information which can be accessed globally

import { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workoutSplit, setWorkoutSplit] = useState(() => {
    // Try to get the workout split from local storage
    const storedSplit = localStorage.getItem('workoutSplit');
    return storedSplit ? JSON.parse(storedSplit) : null;
  });

  const [logWorkouts, setLogWorkouts] = useState(null);

  const updateWorkoutSplit = (newSplit) => {
    setWorkoutSplit(newSplit);
    // Store the workout split in local storage
    localStorage.setItem('workoutSplit', JSON.stringify(newSplit));
  };

  const updateLogWorkouts = (newLogWorkouts) => {
    setLogWorkouts(newLogWorkouts);
  };

  useEffect(() => {
    const storedLogWorkouts = localStorage.getItem('logWorkouts');
    if (storedLogWorkouts) {
      setLogWorkouts(JSON.parse(storedLogWorkouts));
    }
  }, []);

  useEffect(() => {
    // Store the log workouts in local storage
    localStorage.setItem('logWorkouts', JSON.stringify(logWorkouts));
  }, [logWorkouts]);

  return (
    <WorkoutContext.Provider value={{ workoutSplit, updateWorkoutSplit, logWorkouts, updateLogWorkouts}}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};