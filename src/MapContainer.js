/* global google */

import React, { View } from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';

const MapContainer = compose(
    // withScriptjs,
    withGoogleMap,

)((props) => {

    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{
                lat: 51.560842,
                lng: -0.163138
            }}
        >
            {props.infoWindow.isOpen && <InfoWindow
                position={{
                    lat: props.infoWindow.marker.position.lat + 0.0017,
                    lng: props.infoWindow.marker.position.lng
                }}
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
                    animation={props.animation}
                    onClick={() => props.onMarkerClick(marker)}
                    icon={props.icon}
                >
                </Marker>
            ))}
        </GoogleMap>
    )
})
export default MapContainer;