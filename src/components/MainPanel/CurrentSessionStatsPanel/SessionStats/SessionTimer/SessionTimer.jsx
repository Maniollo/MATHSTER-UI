import React from "react";

class SessionTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000)
    }

    tick = () => {
        const actualSecs = this.state.seconds;
        const actualMinutes = this.state.minutes;
        const actualHours = this.state.hours;
        let updatedSec = actualSecs + 1;
        let updatedMinutes = actualMinutes;
        let updatedHours = actualHours;

        if (actualSecs + 1 === 60) {
            updatedSec = 0;
            updatedMinutes = actualMinutes + 1
            if (updatedMinutes === 60) {
                updatedMinutes = 0;
                updatedHours = actualHours + 1
            }
        }

        this.setState({
            seconds: updatedSec,
            minutes: updatedMinutes,
            hours: updatedHours
        });
    }

    asTwoDigit = it => it < 10 ? `0${it}` : it;

    render() {
        const {hours, minutes, seconds} = this.state
        return <div>
            <span>Session time: {this.asTwoDigit(hours)}:{this.asTwoDigit(minutes)}:{this.asTwoDigit(seconds)}</span>
        </div>;
    }
}

export default SessionTimer;