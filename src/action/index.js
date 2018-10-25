import { IMAGE_UPLOAD, MAKE_FACE, MAKE_VERTEX, EDIT_MODE_TOGGLE } from '../constants/actionTypes';

let faceId = 0;

export const uploadImageHandler = imageFile => {
  return {
    type: IMAGE_UPLOAD,
    imageFile
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
