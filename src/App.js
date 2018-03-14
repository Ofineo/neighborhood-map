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
    markersShown: [],
    markersAnimation: google.maps.Animation.DROP,
    sideBarOpen: false
  }

  componentDidMount() {
    this.setState({
      markersShown: this.state.markers,
      markersAnimation: google.maps.Animation.DROP
    })
  }

  handleMarkerClick = (marker) => {
    this.setState(prevState => {
      return this.state.markers = prevState.markers.map(mk => {
        if (mk.id === marker.id) {
          mk.infowindow.show = !mk.infowindow.show;
        } else {
          mk.infowindow.show = false;
        }
        return mk;
      })
    })
    // this.setState({
    //   markersAnimation: google.maps.Animation.BOUNCE

    // })
  }

  updateQuery = (query) => {
    console.log(query);

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState(prevState => {
        return this.state.markersShown = prevState.markers.filter((c) => match.test(c.title));
      })
    } else {
      this.setState(prevState => {
        return this.state.markersShown = prevState.markers;
      })
    }
  }

  updateMarker= (MarkerComponent)=>{
    console.log(MarkerComponent);
    //MarkerComponent.setAnimation(DROP);
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
          isOpen={this.state.sideBarOpen}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
          markers={this.state.markersShown}
          onMarkerClick={(marker) => this.handleMarkerClick(marker)}
          updateQuery={(query) => this.updateQuery(query)}
          updateMarker={(MarkerComponent)=>this.updateMarker(MarkerComponent)}
        />
        <main id="page-wrap">
          <div>
            <MapContainer
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={this.state.markersShown}
              onMarkerClick={(marker) => this.handleMarkerClick(marker)}
              icon={image}
              animation={this.state.markersAnimation}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
