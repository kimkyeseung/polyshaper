import { IMAGE_UPLOAD, MAKE_FACE, MAKE_VERTEX } from '../constants/actionTypes';

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
