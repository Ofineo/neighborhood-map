import './SideBar.css';
import React from 'react';
//import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { push as Menu } from 'react-burger-menu';
import Filter from './Filter';

const SideBar = (props) => {
    return (
        <Menu
            id="push"
            isOpen={props.isOpen}
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            disableCloseOnEsc
            onStateChange={(state) => props.handleStateChange(state)}
        >
            <Filter
                updateQuery={(query) => props.updateQuery(query)}
            />
            {props.markers.map(mk => (
                <div key={mk.id}>
                    <p
                        id="markers"
                        className="menu-item"
                        onClick={() => props.onMarkerClick(mk)}
                        onMouseOver={() => props.onMarkerMouseOver(mk)}
                    >
                        {mk.title}
                    </p>
                </div>
            ))}
        </Menu>
    );
}

export default SideBar;