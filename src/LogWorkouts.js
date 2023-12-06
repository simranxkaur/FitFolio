// LogWorkouts.js
import React, { useState } from 'react';
import { useWorkoutContext } from './WorkoutContext';
import { getISOWeek } from 'date-fns';

const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};

function LogWorkouts() {
  const { workoutSplit, logWorkouts, updateLogWorkouts, weeklySessions, updateWeeklySessions } = useWorkoutContext();
  const [weekOf, setWeekOf] = useState(new Date().toISOString().split('T')[0]);
  const [isSaved, setIsSaved] = useState(false);
  const [setsData, setSetsData] = useState({}); // Add this line to define setsData

  const handleSetsChange = (date, exercise, setIndex, field, value) => {
    const updatedSetsData = { ...setsData };
    const dayOfWeek = date;
  
    if (!updatedSetsData[dayOfWeek]) {
      updatedSetsData[dayOfWeek] = {};
    }
  
    if (!updatedSetsData[dayOfWeek][exercise]) {
      updatedSetsData[dayOfWeek][exercise] = [];
    }
  
    // Update the field for the specific set in the exercise
    updatedSetsData[dayOfWeek][exercise][setIndex] = {
      ...updatedSetsData[dayOfWeek][exercise][setIndex],
      [field]: value,
    };
  
    setSetsData(updatedSetsData);
  };
  
  const getWeekKey = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const weekNumber = getISOWeek(date);
    return `${year}-W${weekNumber}`;
  };

  const handleSaveToLocalStorage = () => {
    const updatedLogWorkouts = { ...logWorkouts };
    const weekNumber = getISOWeek(new Date(weekOf));
  
    if (!updatedLogWorkouts[weekNumber]) {
      updatedLogWorkouts[weekNumber] = {};
    }
  
    // Iterate over days in setsData
    Object.keys(setsData).forEach((dayNumber) => {
      // Ensure the day entry exists
      if (!updatedLogWorkouts[weekNumber][dayNumber]) {
        updatedLogWorkouts[weekNumber][dayNumber] = {};
      }
  
      // Iterate over exercises in the current day
      Object.keys(setsData[dayNumber]).forEach((exercise) => {
        const setsArray = Array.isArray(setsData[dayNumber][exercise])
          ? setsData[dayNumber][exercise]
          : Object.values(setsData[dayNumber][exercise]);
  
        // Create or update log entry for the exercise, each set, weight, and reps
        updatedLogWorkouts[weekNumber][dayNumber][exercise] = setsArray.map((set) => ({
          weight: set.weight,
          reps: set.reps,
        }));
      });
    });
  
    updateLogWorkouts(updatedLogWorkouts);
    setIsSaved(true);
  };
  
  return (
    <div>
      <label>
        Week of:
        <input
          type="date"
          value={weekOf}
          onChange={(e) => setWeekOf(e.target.value)}
        />
      </label>
  
      {workoutSplit && workoutSplit.exercisesByDay ? (
        <>
          {Object.keys(workoutSplit.exercisesByDay).map((day) => (
            <div key={day}>
              <h3>{day}</h3>
  
              {workoutSplit.exercisesByDay[day].map((exercise) => (
                <div key={exercise}>
                  <h4>{exercise}</h4>
  
                  <input
                    type="number"
                    placeholder="Enter number of sets"
                    onChange={(e) => {
                      const numberOfSets = parseInt(e.target.value, 10);
                      const setsArray = Array.from(
                        { length: numberOfSets },
                        (_, index) => ({
                          weight: '',
                          reps: '',
                        })
                      );
                      setSetsData({
                        ...setsData,
                        [day]: { ...setsData[day], [exercise]: setsArray },
                      });
                    }}
                  />
  
                  {setsData[day] &&
                    setsData[day][exercise] &&
                    setsData[day][exercise].map((set, setIndex) => (
                      <div key={setIndex}>
                        <input
                          type="text"
                          placeholder="Enter weight (lbs)"
                          value={set.weight}
                          onChange={(e) =>
                            handleSetsChange(day, exercise, setIndex, 'weight', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          placeholder="Enter reps"
                          value={set.reps}
                          onChange={(e) =>
                            handleSetsChange(day, exercise, setIndex, 'reps', e.target.value)
                          }
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
  
          <button onClick={handleSaveToLocalStorage} disabled={isSaved}>
            Save workout
          </button>
          {isSaved && <p>Data has been saved to local storage.</p>}
        </>
      ) : (
        <p>Create a split to log your workout!</p>
      )}
    </div>
  );
}

export default LogWorkouts;
