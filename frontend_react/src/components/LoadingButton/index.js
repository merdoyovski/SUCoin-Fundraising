import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

const LoadingButton = (props) => {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <>
            {
                isLoading
                    ?
                    <Button variant="dark" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </Button>
                    :
                    <Button
                        variant="dark"
                        disabled={isLoading}
                        onClick={!isLoading ? handleClick : null}> {props.text}
                    </Button >}
        </>
    );
}

export default LoadingButton