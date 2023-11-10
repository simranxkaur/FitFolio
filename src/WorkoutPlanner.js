import React, { useState, useEffect } from 'react';
import './WorkoutPlanner.css';

function WorkoutPlanner() {
  const [splitName, setSplitName] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [exercisesByDay, setExercisesByDay] = useState({});
  const [splitList, setSplitList] = useState([]);

  const availableExercises = [
    'Bench Press',
    'Barbell Squat',
    'Deadlift',
    'Overhead Press',
    'Bent-Over Rows',
    'Pull-Ups',
    'Chin-Ups',
    'Dips',
    'Leg Press',
    'Leg Curls',
    'Leg Extensions',
    'Calf Raises',
    'Hammer Curls',
    'Tricep Extensions',
    'Lat Pulldowns',
    'Incline Bench Press',
    'Seated Rows',
  ];

  const handleAddExercise = (day) => {
    const newExercises = exercisesByDay[day] || [];
    newExercises.push('');
    setExercisesByDay({ ...exercisesByDay, [day]: newExercises });
  };

  const handleRemoveExercise = (day, index) => {
    const newExercises = exercisesByDay[day].filter((_, i) => i !== index);
    setExercisesByDay({ ...exercisesByDay, [day]: newExercises });
  };

  const handleSaveSplit = () => {
    if (splitName) {
      const newSplit = {
        name: splitName,
        daysPerWeek,
        exercisesByDay,
      };
      setSplitList([newSplit]);
      setSplitName('');
      setDaysPerWeek(3); // Default to 3 days per week
      setExercisesByDay({});
    }
  };

  useEffect(() => {
    const storedSplitList = localStorage.getItem('workoutSplit');
    if (storedSplitList) {
      setSplitList(JSON.parse(storedSplitList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workoutSplit', JSON.stringify(splitList));
  }, [splitList]);

  return (
    <div>
      <h2>Workout Split Planner</h2>
      {splitList.length === 0 ? (
        <>
          <label>
            Split Name:
            <input
              type="text"
              value={splitName}
              onChange={(e) => setSplitName(e.target.value)}
            />
          </label>
          <label>
            Days Per Week:
            <select
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
            >
              <option value={3}>3 days</option>
              <option value={4}>4 days</option>
              <option value={5}>5 days</option>
            </select>
          </label>

          {Array.from({ length: daysPerWeek }).map((_, index) => {
            const day = `Day ${index + 1}`;
            return (
              <div key={day}>
                <h3>{day}</h3>
                <button onClick={() => handleAddExercise(day)}>Add Exercise</button>
                <table>
                  <tbody>
                    {exercisesByDay[day] &&
                      exercisesByDay[day].map((exercise, exerciseIndex) => (
                        <tr key={exerciseIndex}>
                          <td>
                            <select
                              value={exercise}
                              onChange={(e) => {
                                const updatedExercises = [...exercisesByDay[day]];
                                updatedExercises[exerciseIndex] = e.target.value;
                                setExercisesByDay({
                                  ...exercisesByDay,
                                  [day]: updatedExercises,
                                });
                              }}
                            >
                              <option value="">Select an exercise</option>
                              {availableExercises.map((availableExercise) => (
                                <option key={availableExercise} value={availableExercise}>
                                  {availableExercise}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button onClick={() => handleRemoveExercise(day, exerciseIndex)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            );
          })}

          <button onClick={handleSaveSplit}>Save Split</button>
        </>
      ) : (
        <table>
          <tbody>
            {splitList.map((split, index) => (
              <tr key={index}>
                {Array.from({ length: split.daysPerWeek }).map((_, dayIndex) => {
                  const day = `Day ${dayIndex + 1}`;
                  return (
                    <td key={day}>
                      <h3>{day}</h3>
                      <ul>
                        {split.exercisesByDay[day] &&
                          split.exercisesByDay[day].map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex}>{exercise}</li>
                          ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WorkoutPlanner;