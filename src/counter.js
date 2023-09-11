import React, { useCallback, useEffect, useRef, useState } from "react";
import moment, { max } from 'moment';

const calculateDuration = eventTime => moment.duration(Math.max(eventTime.unix() - moment().unix(), 0), 'seconds');

function Counter({eventTime}) {
    const [duration, setDuration] = useState(calculateDuration(eventTime));
    const [maxDuration] = useState(calculateDuration(eventTime)); // Calculate maxDuration once and store it

    const [isModalOpen, setIsModalOpen] = useState(false);

    const timerRef = useRef(0);
    const timerCallback = useCallback(() => {
        setDuration(calculateDuration(eventTime));
    }, [eventTime]);

    // Calculate the width percentage for each progress bar
    const progressBarWidth = {
        days: duration.days() === 0 ? 100 : (100 - (duration.days() / maxDuration.days()) * 100),
        hours: duration.days() === 0 ? (duration.hours() === 0 ? 100 : 100 - (duration.hours() / maxDuration.hours())) : 0,
        minutes: duration.hours() === 0 ? (duration.minutes() === 0 ? 100 : 100 - (duration.minutes() / maxDuration.minutes())) : 0,
        seconds: duration.minutes() === 0 ? (duration.seconds() === 0 ? 100 : 100 - (duration.seconds() / maxDuration.seconds())) : 0,
    };

    useEffect(() => {
        timerRef.current = setInterval(timerCallback, 1000);

         // Check if the timer has reached 0 and open the modal
        if (duration.asSeconds() === 0) {
            setIsModalOpen(true);
        }

        return () => {
            clearInterval(timerRef.current);
        }
    }, [eventTime]);

    return (
        <div className="countdown">
            <div className="counter days">
                <span className="digits">{duration.days()}</span>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressBarWidth.days}%` }}></div>
                </div>
                <span className="label">days</span>
            </div>
            <div className="counter hours">
                <span className="digits">{duration.hours()}</span>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressBarWidth.hours}%` }}></div>
                </div>
                <span className="label">hours</span>
            </div>
            <div className="counter minutes">
                <span className="digits">{duration.minutes()}</span>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressBarWidth.minutes}%` }}></div>
                </div>
                <span className="label">minutes</span>
            </div>
            <div className="counter seconds">
                <span className="digits">{duration.seconds()}</span>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressBarWidth.seconds}%` }}></div>
                </div>
                <span className="label">seconds</span>
            </div>
            {isModalOpen && (
                <div></div>
            )}
        </div>
    )
}

export default Counter;
