import React, { useState, useEffect } from 'react';

function TimerApp() {
    const [time, setTime] = useState(0); // Main timer in seconds
    const [breakTime, setBreakTime] = useState(0); // Break timer in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(false); // Check if on break
    const [originalTime, setOriginalTime] = useState(0); // Original time for reset
    const [hours, setHours] = useState(''); // Hours input
    const [minutes, setMinutes] = useState(''); // Minutes input
    const [breakInterval, setBreakInterval] = useState(0); // Break interval in minutes
    const [nextBreakTime, setNextBreakTime] = useState(0); // Time until the next break

    useEffect(() => {
        let timer;

        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);

                // Check if it's time for the next break
                if (nextBreakTime > 0) {
                    setNextBreakTime((prevTime) => prevTime - 1);
                } else {
                    pauseTimer();
                    setTimeout(() => {
                        setIsRunning(true); // Resume after a short pause
                        scheduleNextBreak(); // Schedule the next break
                    }, 2000); // Pause for 2 seconds
                }
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
            startBreak(); // Start break timer when the main timer reaches 0
        }

        return () => clearInterval(timer);
    }, [isRunning, time, nextBreakTime]);

    const getRandomTimeWithin10Percent = (totalSeconds) => {
        const deviation = totalSeconds * 0.1; // Calculate 10% deviation
        const minTime = totalSeconds - deviation;
        const maxTime = totalSeconds + deviation;
        return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    };

    const startTimer = () => {
        const totalSeconds =
            parseInt(hours || 0) * 3600 + parseInt(minutes || 0) * 60;

        const randomTime = getRandomTimeWithin10Percent(totalSeconds);

        setTime(randomTime); // Set time to the random value
        setOriginalTime(randomTime); // Store original time for reset
        setIsRunning(true);
        scheduleNextBreak(); // Schedule the first break
    };

    const scheduleNextBreak = () => {
        const intervalInSeconds = breakInterval * 60; // Convert minutes to seconds
        const randomBreakTime = getRandomTimeWithin10Percent(intervalInSeconds);
        setNextBreakTime(randomBreakTime); // Set next break time
    };

    const startBreak = () => {
        setBreakTime(300); // Set break time to 5 minutes (300 seconds)
        setIsOnBreak(true); // Set break status
        setIsRunning(true); // Start the break timer
    };

    useEffect(() => {
        let breakTimer;

        if (isOnBreak && breakTime > 0) {
            breakTimer = setInterval(() => {
                setBreakTime((prevBreakTime) => prevBreakTime - 1);
            }, 1000);
        } else if (breakTime === 0) {
            setIsOnBreak(false); // End break when timer reaches 0
            setIsRunning(false); // Stop running
            alert("Break time is over!"); // Alert when break is done
        }

        return () => clearInterval(breakTimer);
    }, [isOnBreak, breakTime]);

    const pauseTimer = () => {
        setIsRunning(false); // Pause the main timer
    };

    const resetTimer = () => {
        setTime(originalTime); // Reset the timer to the original time
        setIsRunning(false); // Stop the timer
        setIsOnBreak(false); // End any break in progress
        setNextBreakTime(0); // Reset the next break time
    };

    return (
        <div>
            <h1>
                {isOnBreak ? "Break Timer:" : "Main Timer:"} {Math.floor(time / 3600)}h {Math.floor((time % 3600) / 60)}m {time % 60}s
            </h1>
            <div>
                {!isOnBreak && (
                    <>
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="Hours"
                            min="0"
                        />
                        <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            placeholder="Minutes"
                            min="0"
                            max="59"
                        />
                        <select onChange={(e) => setBreakInterval(Number(e.target.value))} value={breakInterval}>
                            <option value="0">Select Break Interval</option>
                            <option value="10">Every 10 minutes</option>
                            <option value="20">Every 20 minutes</option>
                            <option value="30">Every 30 minutes</option>
                        </select>
                    </>
                )}
            </div>
            <button onClick={startTimer} disabled={isRunning || isOnBreak}>
                Start Timer
            </button>
            <button onClick={pauseTimer} disabled={!isRunning}>
                Pause Timer
            </button>
            <button onClick={resetTimer}>
                Reset Timer
            </button>
        </div>
    );
}

export default TimerApp;
