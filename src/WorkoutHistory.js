import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './WorkoutHistory.css';
import { useWorkoutContext } from './WorkoutContext';


//disables days that aren't in the current month
const tileDisabled = ({date, view }) => {

        //I DON'T KNOW HOW TO MAKE THIS FUNCTION WORK
        //FUCK
        //const currentDate = new Date(view);
        //return date.getMonth() !== 3

};

function WorkoutHistory () 
{

    const [value, onChange] = useState(new Date());
    const { workoutSplit, logWorkouts, updateLogWorkouts } = useWorkoutContext();
    const [setsData, setSetsData] = useState({});
    const [exercisePRs, setExercisePRs] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    const handleDateClick = (value) => {
        // Log the selected date to the console
        console.log('Selected Date:', value);
        //const workoutSplit = localStorage.getItem('workoutSplit');

        console.log('Split info: ',workoutSplit.daysPerWeek)

        // Update the state with the selected date
        onChange(value);
    };

    const isSplitDay = ({ date, view }) => {

        if (view === "month")
        {
            console.log(workoutSplit.daysPerWeek)

            switch(workoutSplit.daysPerWeek) {
                case 3:
                    if(date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5)
                        return "workoutDay";
                    break;
                case 4:
                    if(date.getDay() === 0 || date.getDay() === 2 || date.getDay() === 4 || date.getDay() === 6)
                        return "workoutDay";
                    break;
                case 5:
                    if(date.getDay() === 1)
                        return "workoutDay";
                    break;
            }
        }
        return null;
      };
 
    return (
        
        <div>
            <br></br>
            <Calendar
                onChange={handleDateClick}
                value={value}
                tileClassName={isSplitDay}
                //tileDisabled={tileDisabled}
            />
        </div>
    );
}

export default WorkoutHistory