import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { uploadImageHandler, setUpCanvasSize, makeFace, makeVertex, editMode, autoPopulate, setBackgroundPoly } from '../action';
import App from '../components/App';

const mapStateToProps = state => {
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
    backgroundMaxCols: state.backgroundMaxCols,
    backgroundMaxRows: state.backgroundMaxRows
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

    autoPopulate() {
      dispatch(autoPopulate());
    },

    setBackgroundPoly(data, category) {
      dispatch(setBackgroundPoly(data, category));
      dispatch(autoPopulate());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
