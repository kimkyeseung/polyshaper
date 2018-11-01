import { cloneDeep } from 'lodash';
import {
  IMAGE_UPLOAD,
  SET_UP_CANVAS_SIZE,
  MAKE_FACE,
  MAKE_VERTEX,
  EDIT_MODE_TOGGLE,
  AUTO_POPULATE,
  SET_BACKGROUND_POLY,
  DOWNLOAD_FLATTEN_IMG,
  SELECT_LAYER,
  SELECT_FACE,
  ADJUST_VERTEX_POSITION
} from '../constants/actionTypes';
import autoPopulate from '../lib/autoPopulate';

export const defaultState = {
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
  backgroundMaxRows: 0,
  flattenImage: false,

  selectedLayer: null,
  selectedFace: null
};

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case IMAGE_UPLOAD: {
      if (action.imageFile) {
        newState.uploadedImage = action.imageFile;
      } else {
        newState.uploadedImage = null;
      }
      newState.backgroundVertexNode = [];
      newState.vertexNode = [];
      newState.faceNode = [];
      return newState;
    }

    case MAKE_FACE: {
      let newFaceNode = {
        vertices: action.vertices.map(vertex => vertex.id),
        backgroundColor: action.color,
        id: action.id
      };
      newState.faceNode.push(newFaceNode);
      return newState;
    }

    case SET_UP_CANVAS_SIZE: {
      newState.canvasWidth = action.width;
      newState.canvasHeight = action.height;
      newState.backgroundMaxCols = Math.ceil(((newState.canvasWidth + newState.backgroundCellSize * 2) / newState.backgroundCellSize) + 2);
      newState.backgroundMaxRows = Math.ceil((newState.canvasHeight + newState.backgroundCellSize * 2) / (newState.backgroundCellSize * 0.865));
      return newState;
    }

    case MAKE_VERTEX: {
      if (action.vertex) {
        newState.vertexNode.push(action.vertex);
      }
      return newState;
    }

    case EDIT_MODE_TOGGLE: {
      newState.polyEditMode = action.on;
      return newState;
    }

    case AUTO_POPULATE: {
      return autoPopulate(newState);
    }

    case SET_BACKGROUND_POLY: {
      if (action.category === 'variance') {
        newState.backgroundVariance = Number(action.data);
      } else if (action.category === 'cellsize') {
        newState.backgroundCellSize = Number(action.data);
        newState.backgroundMaxCols = Math.ceil(((newState.canvasWidth + newState.backgroundCellSize * 2) / newState.backgroundCellSize) + 2);
        newState.backgroundMaxRows = Math.ceil((newState.canvasHeight + newState.backgroundCellSize * 2) / (newState.backgroundCellSize * 0.865));
      }
      return newState;
    }

    case DOWNLOAD_FLATTEN_IMG: {
      if (action.request) {
        newState.flattenImage = true;
      } else {
        newState.flattenImage = false;
      }
      return newState;
    }

    case SELECT_LAYER: {
      newState.selectedLayer = action.layer;
      return newState;
    }

    case SELECT_FACE: {
      newState.selectedFace = action.face;
      return newState;
    }

    case ADJUST_VERTEX_POSITION: {
      newState.vertexNode[action.index].x = action.x;
      newState.vertexNode[action.index].y = action.y;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducer
