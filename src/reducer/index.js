import { cloneDeep } from 'lodash';
import { IMAGE_UPLOAD, MAKE_FACE, MAKE_VERTEX, EDIT_MODE_TOGGLE } from '../constants/actionTypes';

const defaultState = {
  uploadedImage: null,
  scale: 1,
  vertexSnapGap: 10,
  vertexNode: [],
  faceNode: [],
  polyEditMode: false
};

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case IMAGE_UPLOAD: {
      newState.uploadedImage = action.imageFile;
      return newState;
    }

    case MAKE_FACE: {
      let newFaceNode = {
        vertices: action.vertices.map(vertex => vertex.id),
        backgroundColor: action.color,
        id: action.id
      }
      newState.faceNode.push(newFaceNode);
      return newState;
    }

    case MAKE_VERTEX: {
      newState.vertexNode.push(action.vertex);
      return newState;
    }

    case EDIT_MODE_TOGGLE: {
      newState.polyEditMode = action.on;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducer
