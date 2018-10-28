import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { uploadImageHandler, setUpCanvasSize, makeFace, makeVertex, editMode, autoPopulate, setBackgroundPoly } from '../action';
import App from '../components/App';

const mapStateToProps = state => {
  console.log('mstp');
  return {
    uploadedImage: state.uploadedImage,
    scale: state.scale,
    vertexSnapGap: state.vertexSnapGap,
    faceNode: state.faceNode,
    vertexNode: state.vertexNode,
    polyEditMode: state.polyEditMode,
    canvasWidth: state.canvasWidth,
    canvasHeight: state.canvasHeight,
    backgroundVertexNode: state.backgroundVertexNode,
    backgroundVariance: state.backgroundVariance,
    backgroundCellSize: state.backgroundCellSize,
    backgroundMaxCols: Math.ceil(((state.canvasWidth + state.backgroundCellSize * 2) / state.backgroundCellSize) + 2),
    backgroundMaxRows: Math.ceil((state.canvasHeight + state.backgroundCellSize * 2) / (state.backgroundCellSize * 0.865))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImageHandler(imageFile) {
      dispatch(uploadImageHandler(imageFile));
    },

    setUpCanvasSize(width, height) {
      dispatch(setUpCanvasSize(width, height));
    },

    makeFace(vertices, color) {
      dispatch(makeFace(vertices, color));
    },

    makeVertex(vertex) {
      dispatch(makeVertex(vertex));
    },

    editMode(boolean) {
      dispatch(editMode(boolean));
    },

    autoPopulate(backgroundVertexNode) {
      dispatch(autoPopulate(backgroundVertexNode));
    },

    setBackgroundPoly(data, category) {
      dispatch(setBackgroundPoly(data, category));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
