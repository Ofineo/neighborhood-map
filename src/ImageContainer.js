import React from 'react';
import TextContainer from './TextContainer';
import { UncontrolledCarousel } from 'reactstrap';



const ImageContainer = (props) => {

    const photos = [
        {
            src: `${props.infoWindow.content.venue.photos.groups["0"].items["0"].prefix}200x150${props.infoWindow.content.venue.photos.groups["0"].items["0"].suffix}`,
            altText: '',
            caption: ''
        },
        {
            src: `${props.infoWindow.content.venue.photos.groups["0"].items["1"].prefix}200x150${props.infoWindow.content.venue.photos.groups["0"].items["1"].suffix}`,
            altText: '',
            caption: ''
        },
        {
            src: `${props.infoWindow.content.venue.photos.groups["0"].items["2"].prefix}200x150${props.infoWindow.content.venue.photos.groups["0"].items["2"].suffix}`,
            altText: '',
            caption: ''
        }
    ];

    return (
        <div>
            <UncontrolledCarousel items={photos} />
            <TextContainer
                infoWindow={props.infoWindow}
            />
        </div>

    );
}
export default ImageContainer;