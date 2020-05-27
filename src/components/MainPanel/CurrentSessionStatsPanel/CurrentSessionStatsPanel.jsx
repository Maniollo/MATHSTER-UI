import React from "react";
import Typography from "@material-ui/core/Typography";
import {SessionAttemptTable} from "./SessionAttemptTable/SessionAttemptTable";
import {SessionStats} from "./SessionStats/SessionStats";

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
</div>;
