import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';

class App extends Component {
  state = {
    markers: [
      {
        "id": 1,
        "position": {
          "lat": 51.528462,
          "lng": -0.154751
        },
        "title": "Secret Gardens",
        "info": "This is an InfoWindow"
      },
      {
        "id": 2,
        "position": {
          "lat": 51.5559573,
          "lng": -0.1775898
        },
        "title": "Waterstones",
        "info": "This is an InfoWindow"
      },
      {
        "id": 3,
        "position": {
          "lat": 51.571337,
          "lng": -0.167617
        },
        "title": "Kenwood House",
        "info": "This is an InfoWindow"
      },
      {
        "id": 4,
        "position": {
          "lat": 51.566927,
          "lng": -0.147071
        },
        "title": "Highgate cementery",
        "info": "This is an InfoWindow"
      },
      {
        "id": 5,
        "position": {
          "lat": 51.542414,
          "lng": -0.148923
        },
        "title": "The Stables Market",
        "info": "This is an InfoWindow"
      },
      {
        "id": 6,
        "position": {
          "lat": 51.569902,
          "lng": -0.173975
        },
        "title": "Spaniards Inn",
        "info": "This is an InfoWindow"
      }
    ],
    isOpen: false
  }

  onToggleOpen = () => {
    this.setState(state => {
      state.isOpen = !state.isOpen;
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
      <div >
        <MapContainer
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBVIuzCa8szWMl9TlCOoveWgr8z49YqeQ&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={this.state.markers}
          isOpen={this.state.isOpen}
          onClick={()=>this.onToggleOpen()}
        />
      </div>
    );
  }
}

export default App;
