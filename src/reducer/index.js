import { cloneDeep } from 'lodash';
import { IMAGE_UPLOAD, MAKE_FACE, MAKE_VERTEX } from '../constants/actionTypes';

const defaultState = {
  // uploadedImage: 'https://s-i.huffpost.com/gen/5498728/thumbs/o-KOREAN-POLICE-570.jpg',
  uploadedImage: null,
  scale: 1,
  vertexSnapGap: 10,
  vertexNode: [],
  faceNode: []
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

    default: {
      return state;
    }
  }
};

export default reducer
