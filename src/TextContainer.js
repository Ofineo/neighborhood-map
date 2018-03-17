import React from 'react';
import './textContainer.css';
import StarsRating from './StarsRating';

const TextContainer = (props) => {
    return (
        <div>
            <p>{props.infoWindow.marker.title}</p>
            {props.infoWindow.content.venue.tips.groups["0"].items["0"] && (
                <div>
                    <h4>Reviews</h4>
                    <p>{props.infoWindow.content.venue.tips.groups["0"].items["0"].text}</p>
                </div>
            )}
            <StarsRating
                rating={props.infoWindow.content.venue.rating}
            />
        </div>

    );
}
export default TextContainer;