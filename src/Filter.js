import React, { Component } from 'react';
import './Filter.css';
import { Button } from 'reactstrap';

class Filter extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(state => state.query = query)
    }

    render() {
        return (
            <div className="search-books-input-wrapper">
                <input id="search-box" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} type="text" placeholder="filter by marker name" />
                <span id="filter"><i class="fas fa-filter"></i></span>
            </div>
        );
    }
}

export default Filter;