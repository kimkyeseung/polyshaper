import { IMAGE_UPLOAD } from '../constants/actionTypes';

export const uploadImageHandler = (imageFile) => {
  return {
    type: IMAGE_UPLOAD,
    imageFile
  };
};
