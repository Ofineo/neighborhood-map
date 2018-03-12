/* global google */

import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MapContainer = compose(
    withScriptjs,
    withGoogleMap,

)((props) => {
    var image = {
        url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|3366CC|40|_|%E2%80%A2',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25,35)
    }
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
                    animation={google.maps.Animation.DROP}
                    onClick={() => props.onMarkerClick(marker)}
                    icon={image}
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