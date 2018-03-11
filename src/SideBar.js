import './SideBar.css';
import React from 'react';
//import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { push as Menu } from 'react-burger-menu'

const SideBar = (props) => {

    var sidebarContent = <b>Sidebar content</b>

    return (
        <Menu
            id="push"
            isOpen={props.isOpen}
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
        >
            {props.markers.map(mk => (
                <div key={mk.id}>
                    <a id="home" className="menu-item" href="/">{mk.title} </a>
                </div>
            ))}
        </Menu>
    );
}

export default SideBar;