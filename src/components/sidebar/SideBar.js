import './SideBar.css';
import React from 'react';
//import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { push as Menu } from 'react-burger-menu';
import Filter from './Filter';
import PropTypes from "prop-types";

const SideBar = (props) => {

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
                        onClick={() => props.onMarkerClick(mk)}
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
SideBar.propTypes={
    markers: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
    pageWrapId: PropTypes.string,
    outerContainerId: PropTypes.string,
    onMarkerClick: PropTypes.func.isRequired,
    onMarkerFocus: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
    handleStateChange: PropTypes.func.isRequired,
    onMarkerMouseOver: PropTypes.func.isRequired
}

export default SideBar;