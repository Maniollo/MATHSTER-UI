import React from 'react'
import Input from '@material-ui/core/Input';
import {Operation} from "./Operation/Operation";
import {Notification} from "./Notification/Notification";

export const OperationQuiz = props => (
    <div>
        <Operation operation={props.operation}/>
        <Input id="userAnswer"
               label="Your answer"
               type="number"
               onChange={props.onChange}
               onKeyDown={props.onKeyDown}
               disabled={props.disableInput}
               autoFocus={true}
               value={props.value}
        />
        {props.wasAnswered && <Notification isAnswerCorrect={props.isAnswerCorrect}/>}
    </div>);