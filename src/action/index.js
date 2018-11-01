import {
  IMAGE_UPLOAD,
  SET_UP_CANVAS_SIZE,
  MAKE_FACE, MAKE_VERTEX,
  EDIT_MODE_TOGGLE,
  AUTO_POPULATE,
  SET_BACKGROUND_POLY,
  DOWNLOAD_FLATTEN_IMG,
  SELECT_LAYER,
  SELECT_FACE,
  ADJUST_VERTEX_POSITION
} from '../constants/actionTypes';

let faceId = 0;

export const uploadImageHandler = imageFile => {
  return {
    type: IMAGE_UPLOAD,
    imageFile
  };
};

export const setUpCanvasSize = (width, height) => {
  return {
    type: SET_UP_CANVAS_SIZE,
    width,
    height
  };
};

export const makeFace = (vertices, color) => {
  return {
    type: MAKE_FACE,
    vertices,
    id: faceId++,
    color
  };
};

export const makeVertex = vertex => {
  return {
    type: MAKE_VERTEX,
    vertex
  };
};

export const editMode = boolean => {
  return {
    type: EDIT_MODE_TOGGLE,
    on: boolean
  };
};

export const autoPopulate = backgroundVertexNode => {
  return {
    type: AUTO_POPULATE,
    backgroundVertexNode
  };
};

export const setBackgroundPoly = (data, category) => {
  return {
    type: SET_BACKGROUND_POLY,
    data,
    category
  };
};

export const downloadFlattenImage = request => {
  return {
    type: DOWNLOAD_FLATTEN_IMG,
    request
  }
};
export const layerSelectHandler = layer => {
  return {
    type: SELECT_LAYER,
    layer
  };
};

export const faceSelectHandler = face => {
  return {
    type: SELECT_FACE,
    face
  };
};

export const selectedVertexAdjustPosition = (x, y, index) => {
  console.log(x, y, index);
  return {
    type: ADJUST_VERTEX_POSITION,
    index,
    x,
    y
  };
};