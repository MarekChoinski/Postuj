import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner: React.FC = () => {

    return (
        <Spinner
            animation="grow"
            className="loading_spinner"
            role="status"
        >
            <span className="sr-only">
                Loading...
            </span>
        </Spinner>
    );

};

export default LoadingSpinner;