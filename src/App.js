/* global google*/
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
        "animation": null,
        "icon": {},
      },
      {
        "id": 1,
        "position": {
          "lat": 51.5559573,
          "lng": -0.1775898
        },
        "title": "Waterstones",
        "fourSquareId": "4b5306b9f964a520ee8c27e3",
        "animation": null,
        "icon": {},
      },
      {
        "id": 2,
        "position": {
          "lat": 51.571337,
          "lng": -0.167617
        },
        "title": "Kenwood House",
        "fourSquareId": "4ac518cef964a52034a620e3",
        "animation": null,
        "icon": {},
      },
      {
        "id": 3,
        "position": {
          "lat": 51.566927,
          "lng": -0.147071
        },
        "title": "Highgate cementery",
        "fourSquareId": "4ac518cef964a5201ba620e3",
        "animation": null,
        "icon": {},
      },
      {
        "id": 4,
        "position": {
          "lat": 51.542414,
          "lng": -0.148923
        },
        "title": "The Stables Market",
        "fourSquareId": "4ac518ebf964a52049ac20e3",
        "animation": null,
        "icon": {},
      },
      {
        "id": 5,
        "position": {
          "lat": 51.569902,
          "lng": -0.173975
        },
        "title": "Spaniards Inn",
        "fourSquareId": "4ac518baf964a520dfa120e3",
        "animation": null,
        "icon": {},
      }
    ],
    markersShown: [],
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
      markers: this.state.markers.map(marker => marker.animation = google.maps.Animation.DROP)
    })
  }

  handleMarkerClick = (marker, image) => {
    this.setState(prevState => {
      return prevState.markersShown = prevState.markersShown.map(mark => {
        console.log(mark.animation);
        if (mark.title === marker.title) {
          mark.icon = {
            url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|3366CC|40|_|%E2%80%A2',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(14, 36),
            scaledSize: new google.maps.Size(25, 42)
          }
          mark.animation = 4;
        } else {
          mark.animation = 0;
          mark.icon = google.maps.Marker.iconBase;
        }
        console.log(mark);
        return mark;
      });
    });
    this.fourSquareAPI(marker);
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
        this.setState({
          mapInfoWindow: {
            isOpen: true,
            content: data.response,
            marker
          }
        })
      }).catch(error => {
        console.log('ups!...there was an error');
        console.error('this is the error', error);
      });
  }

  handleOnMouseOver = (marker) => {
    console.log('marker was moused over', marker);
  }

  handleMarkerFocus = (marker) => {
    document.getElementById(`marker-${marker.id}`).addEventListener('keydown', e => this.pressedKey(e, marker));
    document.getElementById(`marker-${marker.id}`).removeEventListener('keydown', e => this.pressedKey(e, marker));
  }

  pressedKey = (e, marker) => {
    if (e.code === 'Space') this.handleMarkerClick(marker);
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

  handleStateChange = (state) => {
    this.setState({ menuOpen: state.isOpen });
  }

  currentMarker = (c) => {

  }

  render() {



    return (
      <article id="outer-container">
        <header>
          <span>MY NEIGHBORHOOD TOP LOCATIONS</span>
        </header>
        <SideBar
          isOpen={this.state.menuOpen}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
          markers={this.state.markersShown}
          onMarkerClick={(marker, image) => this.handleMarkerClick(marker, image)}
          onMarkerFocus={(marker) => this.handleMarkerFocus(marker)}
          updateQuery={(query) => this.updateQuery(query)}
          handleStateChange={(state) => this.handleStateChange(state)}
          onMarkerMouseOver={(marker) => this.handleOnMouseOver(marker)}
        />
        <section id="page-wrap" role="application">
          <div >
            <MapContainer
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={this.state.markersShown}
              onMarkerClick={(marker) => this.handleMarkerClick(marker, null)}
              currentMarker={(component) => this.currentMarker(component)}
              infoWindow={this.state.mapInfoWindow}
            />
          </div>
        </section>
      </article >
    );
  }
}
export default App;
