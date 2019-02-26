import React, { Component } from 'react';

//Component Imports
import Results from './Results';

class Goats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Goats'
        };
    }
    componentDidMount() {
        this.props.preformSearch('goats');
    }

    render() {
        return (
            <Results />
        )
    }
}


export default Goats;