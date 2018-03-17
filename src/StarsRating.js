import React from 'react';
import './StarsRating.css';

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
                    <br/>
                    <span>★★★★★ {props.rating}</span>
                </div>
            )}
        </div>
    );
}
export default StarRating;