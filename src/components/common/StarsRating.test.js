import React from 'react';
import StarsRating from './StarsRating';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<StarsRating/>', () => {
    
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<StarsRating />);
    });

    it('should be populated when there is a rating', () => {
        wrapper.setProps({ rating: 5 });
        expect(wrapper.contains(<span className="rating-stars">★★★★★ </span>)).toEqual(true);
    });
    it('should be empty when no rating', () => {
        expect(wrapper.contains(<span className="rating-stars">★★★★★ </span>)).toEqual(false);
    });
});