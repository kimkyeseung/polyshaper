import { cloneDeep } from 'lodash';
import {
  IMAGE_UPLOAD,
  SET_UP_CANVAS_SIZE,
  MAKE_FACE,
  MAKE_VERTEX,
  EDIT_MODE_TOGGLE,
  AUTO_POPULATE,
  SET_BACKGROUND_POLY
} from '../constants/actionTypes';

const defaultState = {
  uploadedImage: null,
  scale: 1,
  vertexSnapGap: 10,
  vertexNode: [],
  faceNode: [],
  polyEditMode: false,
  canvasWidth: 0,
  canvasHeight: 0,

  backgroundVertexNode: [],
  backgroundVariance: 0.4,
  backgroundCellSize: 60,
  backgroundMaxCols: 0,
  backgroundMaxRows: 0
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

    case SET_UP_CANVAS_SIZE: {
      newState.canvasWidth = action.width;
      newState.canvasHeight = action.height;
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

    case AUTO_POPULATE: {
      newState.backgroundVertexNode = action.backgroundVertexNode;
      return newState;
    }

    case SET_BACKGROUND_POLY: {
      if (action.category === 'variance') {
        console.log('variance');
        newState.backgroundVariance = action.data;
      } else if (action.category === 'cellsize') {
        console.log('backgroundCellSize');
        newState.backgroundCellSize = action.data;
      }
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducer
