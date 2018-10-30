import React from 'react';
import Panel from '../Panel';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

function setup() {
  const actions = {
    downloadFlattenImage: jest.fn(),
    autoPopulate: jest.fn(),

  }

  const component = shallow(
    <Panel
      editMode={this.props.editMode}
      autoPopulate={this.props.autoPopulate}
      canvasWidth={this.props.canvasWidth}
      canvasHeight={this.props.canvasHeight}
      backgroundVertexNode={this.props.backgroundVertexNode}
      backgroundMaxCols={this.props.backgroundMaxCols}
      backgroundMaxRows={this.props.backgroundMaxRows}
      backgroundVariance={this.props.backgroundVariance}
      backgroundCellSize={this.props.backgroundCellSize}
      setBackgroundPoly={this.props.setBackgroundPoly}
      downloadFlattenImage={this.props.downloadFlattenImage}
    />
  );
  
  return {
    component,
    actions
  }
};

describe('Panel component', () => {
  let component = null;

  it('render correctly', () => {
    component = renderer.create(<Panel />);
  });

  it('match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

});