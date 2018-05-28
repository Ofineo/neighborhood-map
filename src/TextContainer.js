import React from 'react';
import './textContainer.css';
import StarsRating from './StarsRating';
import PropTypes from 'prop-types';

const TextContainer = (props) => {
    return (
        <aside>
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
            <a target="_blank" id="thanks" rel="noopener noreferrer" href="https://developer.foursquare.com/">Information provided by Foursquare.</a>
        </aside>

    );
}

TextContainer.propTypes = {
    infoWindow: PropTypes.object
};

export default TextContainer;