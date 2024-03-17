/* eslint-disable react/prop-types */
import { useEffect, } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoutes = ({ children }) => {
    const location = useLocation();
    const { data, isFetching } = useUser();
    

    // Save previous location when the user tries to access a private route
    useEffect(() => {
        if (!data) {
           const isLocation=location.pathname
            localStorage.setItem('prevLocation',isLocation)
        }
    }, [data, location]);

    if (isFetching) {
        return <span className="loading loading-spinner mx-auto text-accent"></span>;
    }

    if (data) {
        // If user is authenticated, render children
        return children;
    } else {
        // If user is not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoutes;
