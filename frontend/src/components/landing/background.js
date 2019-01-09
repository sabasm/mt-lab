import React, {Component} from 'react';

class BackgroundVideo extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: 'https://firebasestorage.googleapis.com/v0/b/mt-lab-298ee.appspot.com/o/assets%2Flanding%20page%2Fcover%20video.mp4?alt=media&token=43f5b1d3-bbda-41fc-a5b0-46f1ff653656'
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