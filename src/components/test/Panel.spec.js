import React from 'react';
import Panel from '../Panel';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

function setup() {
  const downloadFlattenImage = jest.fn();

  const component = shallow(
    <Panel
      downloadFlattenImage={downloadFlattenImage}
    />
  );
  
  return {
    component,
    downloadButton: component.find('.download-image'),
    props: {
      downloadFlattenImage
    }
  };
}

describe('Panel component', () => {
  it('should trigger `downloadFlattenImageProp` when download image button is clicked', () => {
    const { props, downloadButton } = setup();
    downloadButton.simulate('click');
    expect(props.downloadFlattenImage.mock.calls.length).toBe(1);
    expect(props.downloadFlattenImage.mock.calls[0][0]).toBe(true);
  });
});