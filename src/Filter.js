import React, { Component } from 'react';
import './Filter.css';
import { Button } from 'reactstrap';

class Filter extends Component {
    state = {
        query: ''
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