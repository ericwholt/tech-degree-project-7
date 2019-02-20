import React from 'react'

function NotFound({ location }) {
    return (
        <div>
            <h3 style={h3Style}>Oops</h3>
            <p style={pStyle}>Page not found</p>
        </div >
    )
}

const h3Style = {
    color: '#438bbd',
    fontSize: '4em'
};

const pStyle = {
    fontSize: '2em'
}

export default NotFound
