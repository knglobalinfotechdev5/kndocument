import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full"></div>
        </div>
    );
};

export default LoadingSpinner;
