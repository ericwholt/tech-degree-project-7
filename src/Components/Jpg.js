import React, { Component } from 'react';


class Jpg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageStatus: "loading",
            url: props.url
        };
    }

    // Once image is loaded set state to laoded
    handleImageLoaded(e) {
        this.setState({ imageStatus: "loaded" });
    }
    render() {
        return (
            <li>
                <img
                    src={this.state.url} alt=""
                    onLoad={this.handleImageLoaded.bind(this)}
                />
                {/* Add loading to indvidual images until fully loaded. */}
                {!(this.state.imageStatus === "loaded") && <h3>{this.state.imageStatus}</h3>}
            </li>
        )
    }
}

export default Jpg;