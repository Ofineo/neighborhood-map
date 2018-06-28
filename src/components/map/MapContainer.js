import React from 'react';
import { compose } from "recompose";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import ImageContainer from '../common/ImageContainer';
import './MapContainer.css'
import PropTypes from 'prop-types';

const MapContainer = compose(
    withGoogleMap,

)((props) => {

    return (
        <GoogleMap
            tabindex="-1"
            defaultZoom={14}
            defaultCenter={{
                lat: 51.5502042,
                lng: -0.163138
            }}
        >
            {props.infoWindow.isOpen && <InfoWindow
                position={{
                    lat: props.infoWindow.marker.position.lat + 0.0035,
                    lng: props.infoWindow.marker.position.lng
                }}
                onCloseClick={props.infoWindowCloseClick}
            >
                <ImageContainer
                    infoWindow={props.infoWindow}
                />
            </InfoWindow>}

            {props.markers.map(marker => (
                <Marker
                    key={marker.id}
                    position={marker.position}
                    title={marker.title}
                    animation={marker.animation}
                    onClick={() => props.onMarkerClick(marker)}
                    icon={marker.icon}
                >
                </Marker>
            ))}
        </GoogleMap>
    )
})
MapContainer.propTypes={
    infoWindow: PropTypes.object.isRequired,
    markers: PropTypes.array.isRequired,
    loadingElement: PropTypes.element.isRequired,
    containerElement: PropTypes.element.isRequired,
    mapElement: PropTypes.element.isRequired,
    onMarkerClick: PropTypes.func.isRequired
}

export default MapContainer;