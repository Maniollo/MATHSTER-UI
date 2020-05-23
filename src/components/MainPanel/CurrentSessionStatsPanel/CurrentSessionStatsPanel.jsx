import React from "react";
import Typography from "@material-ui/core/Typography";
import {SessionAttemptTable} from "./SessionAttemptTable/SessionAttemptTable";
import {SessionStats} from "./SessionStats/SessionStats";

const mockData = [
    {
        id: 1,
        operation: {
            factorA: 3,
            factorB: 5,
            operationType: "ADDITION",
        },
        correct: true,
        result: 8
    },
    {
        id: 2,
        operation: {
            factorA: 2,
            factorB: 5,
            operationType: "ADDITION",
        },
        correct: false,
        result: 8
    },
    {
        id: 3,
        operation: {
            factorA: 1,
            factorB: 5,
            operationType: "ADDITION",
        },
        correct: true,
        result: 6
    },
    {
        id: 4,
        operation: {
            factorA: 5,
            factorB: 1,
            operationType: "SUBTRACTION",
        },
        correct: true,
        result: 4
    },
    {
        id: 5,
        operation: {
            factorA: 6,
            factorB: 1,
            operationType: "SUBTRACTION",
        },
        correct: true,
        result: 5
    },
    {
        id: 6,
        operation: {
            factorA: 5,
            factorB: 1,
            operationType: "SUBTRACTION",
        },
        correct: false,
        result: 3
    },
    {
        id: 7,
        operation: {
            factorA: 3,
            factorB: 5,
            operationType: "ADDITION",
        },
        correct: true,
        result: 8
    },
    {
        id: 8,
        operation: {
            factorA: 2,
            factorB: 5,
            operationType: "ADDITION",
        },
        correct: false,
        result: 8
    },
    {
        id: 9,
        operation: {
            factorA: 1,
            factorB: 5,
            operationType: "ADDITION",
        },
        correct: true,
        result: 6
    },
    {
        id: 10,
        operation: {
            factorA: 5,
            factorB: 1,
            operationType: "SUBTRACTION",
        },
        correct: true,
        result: 4
    },
    {
        id: 11,
        operation: {
            factorA: 6,
            factorB: 1,
            operationType: "SUBTRACTION",
        },
        correct: true,
        result: 5
    },
    {
        id: 12,
        operation: {
            factorA: 5,
            factorB: 1,
            operationType: "SUBTRACTION",
        },
        correct: false,
        result: 3
    }
]

const filterByCorrectness = (sessionHistory, correct) => sessionHistory.filter(el => el.correct === correct);

export const CurrentSessionStatsPanel = ({sessionHistory}) => <div style={{"marginTop": 20}}>
    <Typography>
        Current session
    </Typography>
    <SessionStats noOfAll={sessionHistory.length}
                  noOfCorrect={filterByCorrectness(sessionHistory, true).length}
                  noOfIncorrect={filterByCorrectness(sessionHistory, false).length}
    />
    <SessionAttemptTable records={sessionHistory}/>
    {/*<SessionAttemptTable records={mockData}/>*/}
</div>;
