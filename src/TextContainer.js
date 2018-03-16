import React from 'react';
import './textContainer.css'

const TextContainer = (props) => {
    return (
        <div>
            <p>{props.infoWindow.marker.title}</p>
            <h4>Reviews</h4>
            <p>{props.infoWindow.content.venue.tips.groups["0"].items["0"].text}</p>
        </div>

    );
}
export default TextContainer;