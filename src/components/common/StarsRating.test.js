import React from 'react';
import StarsRating from './StarsRating';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<StarsRating/>', () => {
    it('should be empty when no rating', () => {
        let wrapper = shallow(<StarsRating />);
        wrapper.setProps({rating: 5});
        expect(wrapper.contains(<span className="rating-stars">★★★★★ </span>)).toEqual(true);
    });
});