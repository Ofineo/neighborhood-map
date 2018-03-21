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
            onFocus={(e)=>props.menuOnFocus(e)}
        >
            <Filter
                updateQuery={(query) => props.updateQuery(query)}
                isOpen={props.isOpen}
            />
            {props.markers.map(mk => (
                <div key={mk.id}>
                    <p
                        id={'marker-' + mk.id}
                        className="menu-item markers"
                        onClick={() => props.onMarkerClick(mk)}
                        onFocus={() => props.onMarkerFocus(mk)}
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