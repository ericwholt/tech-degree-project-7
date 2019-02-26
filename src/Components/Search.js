import React, { Component } from 'react';

//Component Imports
import Results from './Results';



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (

            < Results fromSearch={true} />
        )
    }
}


export default Search;