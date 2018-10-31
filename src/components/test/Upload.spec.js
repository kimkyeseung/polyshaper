import 'jsdom-global/register';
import React from 'react';
import Upload from '../Upload';
import { shallow, mount } from 'enzyme';

jest.mock('axios');

function setup() {
  const uploadImageHandler = jest.fn();

  const component = shallow(<Upload />);

  return {
    component,
    uploadImageHandler,
    state: {
      active: false,
      target: false,
      hover: false
    }
  };
}

describe('Upload component', () => {
  beforeEach(() => {
    document = {
      ...document,
      addEventListener: () => { },
      removeEventListener: () => { }
    }
  });

  it('has states correctly', () => {
    const { component } = setup();
    expect(component.state().active).toEqual(false);
    expect(component.state().target).toEqual(false);
    expect(component.state().hover).toEqual(false);
  });

  describe('lifecycle should work well', () => {
    describe('component did mount', () => {
      it('works well', () => {
        const map = {};
        window.addEventListener = jest.fn((event, cb) => {
          map[event] = cb;
        });
        const component = mount(<Upload />);
        map.dragover({x: 10, y: 50});
        expect(global.document.addEventListener).toHaveBeenCalled();
      });
    });
  });
});