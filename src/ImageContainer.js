import React from 'react';
import TextContainer from './TextContainer';

const ImageContainer = (props) => {
    return (
        <div>
            <img src={`${props.infoWindow.content.venue.photos.groups["0"].items["0"].prefix}200x150${props.infoWindow.content.venue.photos.groups["0"].items["0"].suffix}`} />
            <TextContainer
            infoWindow={props.infoWindow}
            />
        </div>

    );
}
export default ImageContainer;