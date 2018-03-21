import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
    state = {
        query: ''
    }

    componentDidMount() {
        document.getElementsByClassName('bm-burger-button')[0].lastChild.setAttribute('tabindex', '1');
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            this.changeTabIndex(0);
            document.getElementById('search-box').focus();
        } else {
            this.changeTabIndex(-1);
        }
    }

    //manage tabIndex focus when sidebar menu open or closed
    changeTabIndex = (tabIndex) => {
        document.getElementById('search-box').setAttribute('tabindex', tabIndex);
        let elem = document.getElementsByClassName('menu-item markers');
        for (let i = 0; i < elem.length; i++) {
            elem[i].setAttribute('tabindex', tabIndex);
        }
        document.getElementsByTagName('button')[0].setAttribute('tabindex', tabIndex);
    }

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
                />
                <span id="filter"><i className="fas fa-filter"></i></span>
            </div>
        );
    }
}

export default Filter;