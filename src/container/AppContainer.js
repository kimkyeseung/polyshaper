import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { uploadImageHandler, makeVertex } from '../action';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    uploadedImage: 'https://s-i.huffpost.com/gen/5498728/thumbs/o-KOREAN-POLICE-570.jpg',
    // uploadedImage: state.uploadedImage,
    dotNode: state.dotNode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImageHandler(imageFile) {
      dispatch(uploadImageHandler(imageFile));
    },

    makeVertex(x, y) {
      dispatch(makeVertex(x, y));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
