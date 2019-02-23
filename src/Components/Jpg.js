import React, { Component } from 'react';


class Jpg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageStatus: "loading",
            url: props.url
        };
    }

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
                {!(this.state.imageStatus === "loaded") && <h3>{this.state.imageStatus}</h3>}
            </li>
        )
    }
}

export default Jpg;