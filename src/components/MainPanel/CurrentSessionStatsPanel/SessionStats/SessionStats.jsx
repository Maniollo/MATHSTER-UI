import React from "react";
import SessionTimer from "./SessionTimer/SessionTimer";

const getPercentageOfCorrect = (noOfCorrect, noOfAll) => noOfCorrect ? Math.floor(noOfCorrect / noOfAll * 100) : 0;

export const SessionStats = ({noOfAll, noOfCorrect, noOfIncorrect}) => <div>
    <span style={{"margin": 10}}>Number of attempts: {noOfAll}</span>
    <span style={{"margin": 10}}>{noOfCorrect} / {noOfIncorrect}</span>
    <span>{getPercentageOfCorrect(noOfCorrect, noOfAll)}%</span>
    <SessionTimer />
</div>
