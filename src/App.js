/* global google */
import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import SideBar from './SideBar';

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
        "infowindow": {
          "info": "This is an InfoWindow",
          "show": false
        }
      },
      {
        "id": 1,
        "position": {
          "lat": 51.5559573,
          "lng": -0.1775898
        },
        "title": "Waterstones",
        "infowindow": {
          "info": "This is an InfoWindow",
          "show": false
        }
      },
      {
        "id": 2,
        "position": {
          "lat": 51.571337,
          "lng": -0.167617
        },
        "title": "Kenwood House",
        "infowindow": {
          "info": "This is an InfoWindow",
          "show": false
        }
      },
      {
        "id": 3,
        "position": {
          "lat": 51.566927,
          "lng": -0.147071
        },
        "title": "Highgate cementery",
        "infowindow": {
          "info": "This is an InfoWindow",
          "show": false
        }
      },
      {
        "id": 4,
        "position": {
          "lat": 51.542414,
          "lng": -0.148923
        },
        "title": "The Stables Market",
        "infowindow": {
          "info": "This is an InfoWindow",
          "show": false
        }
      },
      {
        "id": 5,
        "position": {
          "lat": 51.569902,
          "lng": -0.173975
        },
        "title": "Spaniards Inn",
        "infowindow": {
          "info": "This is an InfoWindow",
          "show": false
        }
      }
    ],
    sideBarOpen: false
  }

  handleMarkerClick = (marker) => {
    //this.setState({ markers: [marker] });
    this.setState(prevState => {
      return this.state.markers = prevState.markers.map(mk => {
        if (mk.id === marker.id) {
          mk.infowindow.show = !mk.infowindow.show;
        }
        return mk;
      })
    })
  }

  /**
   * Fetch all markers.
   
  componentDidMount() {
    fetch(`./markers.json`)
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(data => {
        console.log(data);
        this.setState({
          markers: data
        });
      }).catch(err => {
        console.log(`Request failed. Returned status of ${err}`);
      })
  }
  */

  render() {
    return (
      <div id="outer-container">
        <SideBar
          isOpen={this.state.sideBarOpen}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
          markers={this.state.markers}
        />
        <main id="page-wrap">
          <div>
            <MapContainer
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBVIuzCa8szWMl9TlCOoveWgr8z49YqeQ&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={this.state.markers}
              onMarkerClick={(marker) => this.handleMarkerClick(marker)}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
