import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const LoadingPage = () =>
    <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>
