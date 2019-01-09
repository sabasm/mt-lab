import React, {Component} from 'react';

class BackgroundVideo extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: 'http://techslides.com/demos/sample-videos/small.mp4'
        }
    }

    render () {
        return (
            <video id="background-video" muted loop autoPlay>
                <source src={this.state.videoURL} type="video/mp4" />
                <source src={this.state.videoURL} type="video/ogg" />
            </video>
        )
    }
};

export default BackgroundVideo;