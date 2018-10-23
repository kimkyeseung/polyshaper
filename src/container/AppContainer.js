import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { uploadImageHandler } from '../action';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    uploadedImage: state.uploadedImage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImageHandler(imageFile) {
      dispatch(uploadImageHandler(imageFile));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
