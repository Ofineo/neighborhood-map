/* global google */

import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MapContainer = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{
            lat: 51.560842,
            lng: -0.163138
        }}
    >
        {props.markers.map(marker => (
            <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                animation={google.maps.Animation.DROP}
            >
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                    <p>{marker.info}</p>
                </div>
            </InfoWindow>}
            </Marker>
        ))}
    </GoogleMap>
))
export default MapContainer;