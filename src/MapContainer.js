import React from 'react';
import { compose } from "recompose";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import ImageContainer from './ImageContainer';
import './MapContainer.css'

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
export default MapContainer;