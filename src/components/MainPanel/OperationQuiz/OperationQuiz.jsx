import React from 'react'
import {Operation} from "./Operation/Operation";
import {Notification} from "./Notification/Notification";

export const OperationQuiz = props => (
    <div style={{"height": 200, "margin": 6}}>
        <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center"}}>
            <Operation operation={props.operation}/>
            <input ref={props.inputRef}
                   onChange={props.onChange}
                   onKeyDown={props.onKeyDown}
                   disabled={props.disableInput}
                   value={props.value}
                   style={{"fontSize": 60, "width": 150, "textAlign": "center"}}
            />
        </div>
        <div style={{"justifyContent": "center", "margin": 6}}>
            {props.wasAnswered && <Notification isAnswerCorrect={props.isAnswerCorrect}/>}
        </div>
    </div>
);