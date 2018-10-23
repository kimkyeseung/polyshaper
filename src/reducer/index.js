import { cloneDeep } from 'lodash';
import { IMAGE_UPLOAD } from '../constants/actionTypes';

const defaultState = {
  uploadedImage: null
}

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case IMAGE_UPLOAD: {
      newState.uploadedImage = action.imageFile;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer
