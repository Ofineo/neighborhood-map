/* global google */
import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import SideBar from './SideBar';
import escapeRegExp from "escape-string-regexp";

class App extends Component {
  state = {
    markers: [
      {
        "id": 0,
        "position": {
          "lat": 51.528462,
          "lng": -0.154751
        },
        "title": "Secret Gardens",
        "fourSquareId": "57d01d5638fa8331f862a9d8",
      },
      {
        "id": 1,
        "position": {
          "lat": 51.5559573,
          "lng": -0.1775898
        },
        "title": "Waterstones",
        "fourSquareId": "4b5306b9f964a520ee8c27e3",
      },
      {
        "id": 2,
        "position": {
          "lat": 51.571337,
          "lng": -0.167617
        },
        "title": "Kenwood House",
        "fourSquareId": "4ac518cef964a52034a620e3",
      },
      {
        "id": 3,
        "position": {
          "lat": 51.566927,
          "lng": -0.147071
        },
        "title": "Highgate cementery",
        "fourSquareId": "4ac518cef964a5201ba620e3",
      },
      {
        "id": 4,
        "position": {
          "lat": 51.542414,
          "lng": -0.148923
        },
        "title": "The Stables Market",
        "fourSquareId": "4ac518ebf964a52049ac20e3",
      },
      {
        "id": 5,
        "position": {
          "lat": 51.569902,
          "lng": -0.173975
        },
        "title": "Spaniards Inn",
        "fourSquareId": "4ac518baf964a520dfa120e3",
      }
    ],
    markersShown: [],
    markersAnimation: google.maps.Animation.DROP,
    menuOpen: false,
    mapInfoWindow: {
      isOpen: false,
      content: '',
      marker: {}
    }
  }

  componentDidMount() {
    this.setState({
      markersShown: this.state.markers,
      markersAnimation: google.maps.Animation.DROP
    })
  }

  handleMarkerClick = (marker) => {
    this.setState(prevState => {
      prevState.mapInfoWindow.isOpen = false;
    })
    this.fourSquareAPI(marker);
  }

  handleOnMouseOver =(marker)=>{
    console.log('marker was moused over',marker);
  }

  updateQuery = (query) => {
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState(prevState => {
        return prevState.markersShown = prevState.markers.filter((c) => match.test(c.title));
      })
    } else {
      this.setState(prevState => {
        return prevState.markersShown = prevState.markers;
      })
    }
  }

  fourSquareAPI = (marker) => {
    const requestApi = 'https://api.foursquare.com/v2/venues/';
    const tokenClientId = 'VWFJCKVIGJHNSBKPC2NUVU4SHASM0QQWWBEHAHVKRPU30AVP';
    const tokenClientSecret = 'ICBQHURYSAQELUERLHU50CXU4NGRIOHGFXBAXCLAA1IJ4SFF';

    fetch(`${requestApi}${marker.fourSquareId}?&client_id=${tokenClientId}&client_secret=${tokenClientSecret}&v=20180314`,
      {
        method: 'GET',
      }).then(response => response.json())
      .then(data => {
        console.log(data.response, this.state.mapInfoWindow.isOpen);
        this.setState({
          mapInfoWindow: {
            isOpen: true,
            content: data.response,
            marker
          }
        })
      }).catch(error => console.error(error));
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  currentMarker =(c)=>{
    console.log('component',c);
  }

  render() {

    const image = {
      url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|3366CC|40|_|%E2%80%A2',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(14, 36),
      scaledSize: new google.maps.Size(25, 36)
    }


    return (
      <div id="outer-container">
        <SideBar
          isOpen={this.state.menuOpen}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
          markers={this.state.markersShown}
          onMarkerClick={(marker) => this.handleMarkerClick(marker)}
          updateQuery={(query) => this.updateQuery(query)}
          handleStateChange={(state) => this.handleStateChange(state)}
          onMarkerMouseOver={(marker)=>this.handleOnMouseOver(marker)}
        />
        <main id="page-wrap">
          <div>
            <MapContainer
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={this.state.markersShown}
              onMarkerClick={(marker) => this.handleMarkerClick(marker)}
              currentMarker={(component)=>this.currentMarker(component)}
              icon={image}
              animation={this.state.markersAnimation}
              infoWindow={this.state.mapInfoWindow}
            />
          </div>
        </main>
      </div >
    );
  }
}

export default App;
