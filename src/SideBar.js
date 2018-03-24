/* global google*/
import './SideBar.css';
import React from 'react';
//import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { push as Menu } from 'react-burger-menu';
import Filter from './Filter';

const SideBar = (props) => {

    let image = {
        url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|3366CC|40|_|%E2%80%A2',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(14, 36),
        scaledSize: new google.maps.Size(25, 36)
    }

    return (
        <Menu
            id="push"
            isOpen={props.isOpen}
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            disableCloseOnEsc
            onStateChange={(state) => props.handleStateChange(state)}
            onFocus={(e) => props.menuOnFocus(e)}
        >
            <Filter
                role="search"
                updateQuery={(query) => props.updateQuery(query)}
                isOpen={props.isOpen}
            />
            {props.markers.map(mk => (
                <section role="listbox" key={mk.id}>
                    <p
                        id={'marker-' + mk.id}
                        className="menu-item markers"
                        onClick={() => props.onMarkerClick(mk,image)}
                        onFocus={() => props.onMarkerFocus(mk)}
                        onMouseOver={() => props.onMarkerMouseOver(mk)}
                    >
                        {mk.title}
                    </p>
                </section>
            ))}
        </Menu>
    );
}

export default SideBar;