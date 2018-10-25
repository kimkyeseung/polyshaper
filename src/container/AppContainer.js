import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { uploadImageHandler, makeFace, makeVertex, editMode } from '../action';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    uploadedImage: state.uploadedImage,
    scale: state.scale,
    vertexSnapGap: state.vertexSnapGap,
    faceNode: state.faceNode,
    vertexNode: state.vertexNode,
    polyEditMode: state.polyEditMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImageHandler(imageFile) {
      dispatch(uploadImageHandler(imageFile));
    },

    makeFace(vertices, color) {
      dispatch(makeFace(vertices, color));
    },

    makeVertex(vertex) {
      dispatch(makeVertex(vertex));
    },

    editMode(boolean) {
      dispatch(editMode(boolean));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
