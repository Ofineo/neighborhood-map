import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                initialCenter={{
                    lat: 51.560842,
                    lng: -0.163138
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Secret Gardens'}
                    position={{ lat: 51.528462, lng: -0.154751 }} />
                <Marker
                    onClick={this.onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Waterstones'}
                    position={{ lat: 51.5559573, lng: -0.1775898 }} />
                <Marker
                    onClick={this.onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Kenwood House'}
                    position={{ lat: 51.571337, lng: -0.167617 }} />
                <Marker
                    onClick={this.onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Spaniards Inn'}
                    position={{ lat: 51.569902, lng: -0.173975 }} />
                <Marker
                    onClick={this.onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Highgate cementery'}
                    position={{ lat: 51.566927, lng: -0.147071 }} />
                <Marker
                    onClick={this.onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'The Stables Market'}
                    position={{ lat: 51.542414, lng: -0.148923 }} />
            
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>

        );

    }

}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBVIuzCa8szWMl9TlCOoveWgr8z49YqeQ'
})(MapContainer)