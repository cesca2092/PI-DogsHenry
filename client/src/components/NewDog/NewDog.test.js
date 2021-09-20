import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import  NewDog  from './';


configure({adapter: new Adapter()});

describe('<NewDog />', () => {

    describe('Estructura', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<NewDog />);
        })
        it('Renderiza un div <div>', () => {
            expect(wrapper.find('div')).toHaveLength(3)
        })
    })
})