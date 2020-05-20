import React from "react";
import Alert from "react-bootstrap/Alert";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

export const FailNotification = () =>
    <Alert variant="danger">
        <Alert.Heading><CancelOutlinedIcon/> Incorrect answer. Try again!</Alert.Heading>
    </Alert>