import React from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export const SuccessNotification = () =>
    <Alert variant="success">
        <Alert.Heading><CheckCircleOutlineIcon/> Correct answer!</Alert.Heading>
    </Alert>