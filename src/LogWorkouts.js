import WorkoutPlanner from './WorkoutPlanner';
import { useWorkoutContext } from './WorkoutContext';
import { createContext, useContext, useState, useEffect } from 'react';

function LogWorkouts () {
    const { workoutSplit, logWorkouts, updateLogWorkouts } = useWorkoutContext();
    const [setsData, setSetsData] = useState({});
    const [exercisePRs, setExercisePRs] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Retrieve existing PRs from local storage
        const storedPRs = localStorage.getItem('exercisePRs');
        setExercisePRs(storedPRs ? JSON.parse(storedPRs) : {});

        console.log('workoutSplit:', workoutSplit);
        console.log('logWorkouts:', logWorkouts);
        console.log('setsData:', setsData);
    }, [workoutSplit, logWorkouts, setsData]);

    const handleSetsChange = (exercise, setIndex, field, value) => {
        const updatedSetsData = { ...setsData };
        updatedSetsData[exercise][setIndex][field] = value;
        setSetsData(updatedSetsData);

        const updatedLogWorkouts = { ...logWorkouts };
        updatedLogWorkouts[exercise] = setsData[exercise];
        updateLogWorkouts(updatedLogWorkouts);
    };

    const handleSaveToLocalStorage = () => {
        // Check for PRs and trigger alert
        checkAndUpdatePRs(logWorkouts);

        localStorage.setItem('savedLogWorkouts', JSON.stringify(logWorkouts));
        setIsSaved(true);
    };

    const checkAndUpdatePRs = (enteredData) => {
        const exerciseName = Object.keys(enteredData)[0];
        const enteredSets = enteredData[exerciseName];
    
        // Check for existing PRs
        const existingPRs = exercisePRs[exerciseName] || [];
        const isNewPR = enteredSets.some((enteredSet) => {
          return existingPRs.every(
            (existingSet) =>
              enteredSet.weight > existingSet.weight || (enteredSet.weight == existingSet.weight && enteredSet.reps > existingSet.reps)
          );
        });
    
        if (isNewPR) {
          alert(`New PR for ${exerciseName}!`);

          // Update the PRs
          const updatedPRs = { ...exercisePRs, [exerciseName]: enteredSets };
          setExercisePRs(updatedPRs);
          localStorage.setItem('exercisePRs', JSON.stringify(updatedPRs));
        }
    };

    return (
        <div>
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
                                    const setsArray = Array.from({ length: numberOfSets }, (_, index) => ({
                                    weight: '',
                                    reps: '',
                                    }));
                                    setSetsData({ ...setsData, [exercise]: setsArray });
                                }}
                                />

                                {setsData[exercise] && setsData[exercise].map((set, setIndex) => (
                                    <div key={setIndex}>
                                    <input
                                        type="text"
                                        placeholder="Enter weight (lbs)"
                                        value={set.weight}
                                        onChange={(e) => handleSetsChange(exercise, setIndex, 'weight', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter reps"
                                        value={set.reps}
                                        onChange={(e) => handleSetsChange(exercise, setIndex, 'reps', e.target.value)}
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