import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const ErrorPage = () =>
    <Alert variant="danger">
        <Alert.Heading>Server error!</Alert.Heading>
        <p>
            Server error. Try again or contact with administrator!
        </p>
    </Alert>