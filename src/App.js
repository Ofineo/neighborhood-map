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
        "icon": google.maps.Marker.iconBase,
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
        "icon": google.maps.Marker.iconBase,
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
        "icon": google.maps.Marker.iconBase
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
        "icon": google.maps.Marker.iconBase,
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
        "icon": google.maps.Marker.iconBase,
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
        "icon": google.maps.Marker.iconBase
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
  /*
  Start the map with all the markers and the Markers DROP animation.
  */
  componentDidMount() {
    this.setState({
      markersShown: this.state.markers,
      markers: this.state.markers.map(marker => {
        marker.animation = google.maps.Animation.DROP;
        return marker;
      })
    })
  }
  /*
  onClick will call the funtion to retrieve data from the foursquare API. 
  It will change the marker icon and set a new animation to clearly show which marker was clicked. 
  */
  handleMarkerClick = (marker) => {
    this.setState(prevState => {
      return prevState.markersShown = prevState.markersShown.map(mark => {
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
        return mark;
      });
    });
    this.fourSquareAPI(marker);
  }
  /*
  Get data from foursquare.
  */
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
        console.log('ups!...there was an error =(');
        console.log('Are you sure you are connected to the internet?');
        console.error('this is the error', error);
      });
  }

  handleOnMouseOver = (marker) => {
    console.log('marker was moused over', marker);
    //TO BE DEVELOPED IN THE FUTURE
  }
  /*
  When sidebar menu is open and tab is somewhere in the list of markers handle keyboard press on marker
  */
  handleMarkerFocus = (marker) => {
    document.getElementById(`marker-${marker.id}`).addEventListener('keydown', e => this.pressedKey(e, marker));
    document.getElementById(`marker-${marker.id}`).removeEventListener('keydown', e => this.pressedKey(e, marker));
  }

  pressedKey = (e, marker) => {
    if (e.code === 'Space') this.handleMarkerClick(marker);
  }
  /*
  filter markers on user input
  */
  updateQuery = (query) => {
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState(prevState => {
        return prevState.markersShown = prevState.markers.filter((c) => match.test(c.title));
      })
    } else {
      this.setState({ markersShown: this.state.markers })
    }
  }
  /*
  Sidebar menu kept on syncrony with state on App.js 
  */
  handleStateChange = (state) => {
    this.setState({ menuOpen: state.isOpen });
  }

  render() {
    return (
      <article id="outer-container">
        <header>
          <h1>MY NEIGHBORHOOD TOP LOCATIONS</h1>
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
              onMarkerClick={(marker) => this.handleMarkerClick(marker)}
              infoWindow={this.state.mapInfoWindow}
            />
          </div>
        </section>
      </article >
    );
  }
}
export default App;
