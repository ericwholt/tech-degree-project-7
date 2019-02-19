import React from 'react'
import '../css/loading.css';

const Loading = () => {
    return (
        <div className="loading">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <h3>Loading</h3>
        </div>
    )
}

export default Loading;
