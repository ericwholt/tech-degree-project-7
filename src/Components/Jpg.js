import React, { Component } from 'react';
import '../css/image-loading.css';

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
                {!(this.state.imageStatus === "loaded") &&
                    <div className="sk-cube-grid">
                        {this.state.imageStatus}
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div>
                }
            </li>
        )
    }
}

export default Jpg;