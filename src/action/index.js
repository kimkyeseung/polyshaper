import { IMAGE_UPLOAD, MAKE_VERTEX } from '../constants/actionTypes';

export const uploadImageHandler = imageFile => {
  return {
    type: IMAGE_UPLOAD,
    imageFile
  };
};

export const makeVertex = (x, y) => {
  return {
    type: MAKE_VERTEX,
    point: {x, y}
  }
}
