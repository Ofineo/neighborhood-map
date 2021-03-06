import React from 'react';
import './StarsRating.css';
import PropTypes from 'prop-types';

const StarRating = (props) => {

    const style = {
        overflow: 'hidden',
        display: 'inline-block',
        fontSize: '1.5em',
        width: props.rating * 8.1,
    };

    return (
        <div className="crop" >
            {props.rating && (
                <div style={style}>
                    <span><b>Rating</b></span>
                    <br />
                    <span className="rating-stars">★★★★★ </span>
                    <span>{props.rating}</span>
                </div>
            )}
        </div>
    );
}

StarRating.propTypes={
    rating: PropTypes.number
}
export default StarRating;