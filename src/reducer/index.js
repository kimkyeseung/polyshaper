import { cloneDeep } from 'lodash';
import { IMAGE_UPLOAD, MAKE_VERTEX } from '../constants/actionTypes';

const defaultState = {
  uploadedImage: null,
  dotNode: [],
}

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case IMAGE_UPLOAD: {
      newState.uploadedImage = action.imageFile;
      return newState;
    }
    case MAKE_VERTEX: {
      newState.dotNode.push({x: action.point.x, y: action.point.y});
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer
