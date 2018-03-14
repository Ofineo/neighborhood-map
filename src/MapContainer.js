/* global google */

import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

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
            {props.markers.map(marker => (
                <Marker
                    key={marker.id}
                    position={marker.position}
                    title={marker.title}
                    animation={props.animation}
                    onClick={() => props.onMarkerClick(marker)}
                    ref={ component => props.updateMarker(component)}
                    icon={props.icon}
                >
                    {marker.infowindow.show === true && (
                        <InfoWindow >
                            <div>
                                <p>{marker.infowindow.info}</p>
                            </div>
                        </InfoWindow>)}
                </Marker>
            ))}
        </GoogleMap>
    )
})
export default MapContainer;