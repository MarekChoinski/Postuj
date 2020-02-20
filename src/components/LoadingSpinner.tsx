import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner: React.FC = () => {

    return (
        <Spinner
            animation="grow"
            style={{
                marginTop: "30vh",
                marginLeft: "50vw",

            }}
            role="status"
        >
            <span className="sr-only">
                Loading...
                </span>
        </Spinner>
    );

};

export default LoadingSpinner;