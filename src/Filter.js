import React, { Component } from 'react';
import './Filter.css';
import PropTypes from 'prop-types';

class Filter extends Component {
    state = {
        query: ''
    }
    /*
    Set the first tab focus on the burger menu to open the sidebar menu
    */
    componentDidMount() {
        document.getElementsByClassName('bm-burger-button')[0].lastChild.setAttribute('tabindex', '1');
    }
    /* 
    Remove focus from closed sidebar menu or focus on the search box if open
    */
    componentDidUpdate() {
        if (this.props.isOpen) {
            this.changeTabIndex(0);
            document.getElementById('search-box').focus();
        } else {
            this.changeTabIndex(-1);
        }
    }
    /*
    manage tabIndex focus when sidebar menu open or closed
    */
    changeTabIndex = (tabIndex) => {
        document.getElementById('search-box').setAttribute('tabindex', tabIndex);
        let elem = document.getElementsByClassName('menu-item markers');
        for (let i = 0; i < elem.length; i++) {
            elem[i].setAttribute('tabindex', tabIndex);
        }
        document.getElementsByTagName('button')[0].setAttribute('tabindex', tabIndex);
    }
    /*
    Manage the user input
    */
    updateSearchBox = (query) => {
        this.setState({ query })
        this.props.updateQuery(query);
    }

    render() {

        return (
            <div
                className="search-books-input-wrapper"
            >
                <input
                    id="search-box"
                    value={this.state.query}
                    onChange={(event) => this.updateSearchBox(event.target.value)}
                    type="text"
                    placeholder="filter by marker name"
                    label="filter by marker name"
                />
                <span id="filter"><i className="fas fa-filter"></i></span>
            </div>
        );
    }
}

Filter.propTypes={
    isOpen: PropTypes.bool.isRequired,
    updateQuery: PropTypes.func
}

export default Filter;