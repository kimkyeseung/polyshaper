import { cloneDeep } from 'lodash';
import {
  IMAGE_UPLOAD,
  SET_UP_CANVAS_SIZE,
  MAKE_FACE,
  MAKE_VERTEX,
  EDIT_MODE_TOGGLE,
  AUTO_POPULATE,
  SET_BACKGROUND_POLY,
  DOWNLOAD_FLATTEN_IMG
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
  backgroundMaxRows: 0,
  flattenImage: false
};

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case IMAGE_UPLOAD: {
      newState.uploadedImage = action.imageFile;
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
      newState.vertexNode.push(action.vertex);
      return newState;
    }

    case EDIT_MODE_TOGGLE: {
      newState.polyEditMode = action.on;
      return newState;
    }

    case AUTO_POPULATE: {
      const backgroundVertexNode = [];
      let row = 0;
      let col = 0;
      let maxCols = newState.backgroundMaxCols;
      let maxRows = newState.backgroundMaxRows;
      let amount = maxCols * maxRows;
      for (let i = 0; i < amount; i++) {
        let vertex = {};
        if (row % 2 === 0) {
          vertex.x = (col * newState.backgroundCellSize) - newState.backgroundCellSize;
        } else {
          vertex.x = (col * newState.backgroundCellSize) - newState.backgroundCellSize - newState.backgroundCellSize / 2;
        }
        vertex.x = vertex.x + (Math.random() - 0.5) * newState.backgroundVariance * newState.backgroundCellSize * 2;
        vertex.y = (row * newState.backgroundCellSize * 0.865) - newState.backgroundCellSize;
        vertex.y = vertex.y + (Math.random() - 0.5) * newState.backgroundVariance * newState.backgroundCellSize * 2;
        vertex.col = col;
        vertex.row = row;
        backgroundVertexNode.push(vertex);
        col++;
        if ((i + 1) % maxCols === 0) {
          row++;
          col = 0;
        }
      }
      newState.backgroundVertexNode = backgroundVertexNode;
      return newState;
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

    default: {
      return state;
    }
  }
};

export default reducer
