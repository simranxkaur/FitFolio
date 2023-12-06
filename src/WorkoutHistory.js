import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './WorkoutHistory.css';
import { useWorkoutContext } from './WorkoutContext';
import Popup from './popup';
import { getISOWeek } from 'date-fns';


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
    const [logWorkoutsArray] = useState([]);
    const [setsData, setSetsData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    //cost [popupDate, setDate] = useState(new Date());

    const handleDateClick = (value) => {
        // Log the selected date to the console
        console.log('Selected Date:', value);
        const logWorkouts = localStorage.getItem('logWorkouts');
        const logWorkoutsArray = JSON.parse(logWorkouts);
        console.log(logWorkoutsArray[49]);

        setButtonPopup(true);
        console.log("Workout log = ", logWorkouts);
        //console.log('Split info: ',workoutSplit.daysPerWeek)

        // Update the state with the selected date
        onChange(value);
    };

    const isSplitDay = ({ date, view }) =>
    {

        if (view === "month")
        {
                //console.log(workoutSplit.daysPerWeek)
                if (logWorkouts[getISOWeek(date)]) {
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
                        if(date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 4 || date.getDay() === 5)
                            return "workoutDay";
                        break;
                }
            }
        }
        return null;
      };

    
      //master programmer
    const getSplitDay = (date) =>
    {
        
        switch(workoutSplit.daysPerWeek) {
            case 3:
                if(date.getDay() === 1)
                    return "Day 1"
                if(date.getDay() === 3)
                    return "Day 2"
                if(date.getDay() === 5)
                    return "Day 3";
                break;
            case 4:
                if(date.getDay() === 0)
                    return "Day 1";
                if(date.getDay() === 2)
                    return "Day 2";
                if(date.getDay() === 4)
                    return "Day 3"
                if(date.getDay() === 6)
                    return "Day 4";
                break;
            case 5:
                if(date.getDay() === 0)
                    return "Day 1";
                if(date.getDay() === 1)
                    return "Day 2";
                if(date.getDay() === 3)
                    return "Day 3";
                if(date.getDay() === 4)
                    return "Day 4";
                if(date.getDay() === 5)
                    return "Day 5";
                break;
        }
        return 0;
    }

    const printWeekDetails = (value) => {
        if (logWorkouts[getISOWeek(value)]) {
          const exerciseElements = [];
          const splitDay = getSplitDay(value)

          Object.entries(logWorkouts[getISOWeek(value)]).forEach(([day, exercises]) => {
            console.log(`Week ${getISOWeek(value)}, ${day}:`);
            if(splitDay === day)
            {
                Object.entries(exercises).forEach(([exercise, details]) => {
                console.log(`${exercise}: ${JSON.stringify(details)}`);

                const formattedDetails = details.map(({ reps, weight }) => (
                    <p key={`${exercise}-${reps}-${weight}`}>
                      * Reps: {reps}, Weight: {weight}
                    </p>
                  ));

                exerciseElements.push(
                <div key={exercise}>
                    <h4>{exercise}:</h4>
                    {formattedDetails}
                </div>
                );
                });
            }
          });
      
          return exerciseElements;
        } else {
          console.log(`Week ${getISOWeek(value)} not found`);
          return null; // or an appropriate fallback JSX if needed
        }
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
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>{value.toDateString()}</h3>
                    {printWeekDetails(value)}
                </Popup>
        </div>
    );
}

export default WorkoutHistory