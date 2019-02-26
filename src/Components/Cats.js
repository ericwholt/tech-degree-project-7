import React, { Component } from 'react';

//Component Imports
import Results from './Results';

class Cats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Cats'
        };
    }
    componentDidMount() {
        this.props.preformSearch('cats');
    }

    render() {
        return (
            <Results />
        )
    }
}


export default Cats;