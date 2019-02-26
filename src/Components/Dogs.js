import React, { Component } from 'react';

//Component Imports
import Results from './Results';

class Dogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Dogs'
        };
    }
    componentDidMount() {
        this.props.preformSearch('dogs');
    }

    render() {
        return (
            <Results />
        )
    }
}


export default Dogs;