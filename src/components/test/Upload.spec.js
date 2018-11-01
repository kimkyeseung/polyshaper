import 'jsdom-global/register';
import React from 'react';
import Upload from '../Upload';
import { shallow, mount } from 'enzyme';
import { JSDOM } from 'jsdom';

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
//윈도우 객체 가짜로 만들어서 애드이벤트리스너 가짜로 만들고, 드래그 이벤트 호출되었는지 테스트.

describe('Upload component', () => {
  it('has states correctly', () => {
    const { component } = setup();
    expect(component.state().active).toEqual(false);
    expect(component.state().target).toEqual(false);
    expect(component.state().hover).toEqual(false);
  });

  describe('window should listen event on componentDidMount', () => {
    beforeEach(() => {
      const { window } = new JSDOM('<!doctype html><html><body></body></html>');
      window.addEventListener = jest.fn();
      window.removeEventListener = jest.fn();
      global.window = window;
    });

    it('listen event dragover', () => {
      const { component } = setup();
      expect(global.window.addEventListener).toHaveBeenCalledWith('dragover', component.instance().dropTarget);
    });

    it('listen event dragleave', () => {
      const { component } = setup();
      expect(global.window.addEventListener).toHaveBeenCalledWith('dragleave', component.instance().dropLeave);
    });

    it('listen event drop', () => {
      const { component } = setup();
      expect(global.window.addEventListener).toHaveBeenCalledWith('drop', component.instance().handleDrop);
    });

    it('remove event dragover', () => {
      const { component } = setup();
      expect(global.window.removeEventListener).toHaveBeenCalledWith('dragover', component.instance().dropTarget);
    });

    it('remove event dragleave', () => {
      const { component } = setup();
      expect(global.window.removeEventListener).toHaveBeenCalledWith('dragleave', component.instance().dropLeave);
    });

    it('remove event drop', () => {
      const { component } = setup();
      expect(global.window.removeEventListener).toHaveBeenCalledWith('drop', component.instance().handleDrop);
    });
  });

  describe('window should remove listen event on', () => {
    beforeEach(() => {
      const { window } = new JSDOM('<!doctype html><html><body></body></html>');
      window.removeEventListener = jest.fn();
      global.window = window;
    });

  });
});
