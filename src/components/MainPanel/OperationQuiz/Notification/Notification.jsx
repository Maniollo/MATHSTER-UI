import React from "react";
import {SuccessNotification} from "./SuccessNotification/SucessNotification";
import {FailNotification} from "./FailNotification/FailNotification";

export const Notification = ({isAnswerCorrect}) => <div>
    {isAnswerCorrect ? <SuccessNotification/> : <FailNotification/>}
</div>;