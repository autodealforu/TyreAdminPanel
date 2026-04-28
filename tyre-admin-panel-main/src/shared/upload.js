import { UPLOAD_URI, URI } from '../domain/constant';
import axios from 'axios';
export const upload = async (featuredImage) => {
  const newForm = new FormData();
  if (featuredImage) {
    newForm.append(`image`, featuredImage, featuredImage.name);
    const image = await axios.post(`${URI}/api/upload`, newForm);

    if (image.data) {
      return image.data;
    }
  }
};
export const uploadGallery = async (gallery) => {
  const newForm = new FormData();

  if (gallery) {
    Array.from(gallery).forEach((image, index) => {
      newForm.append(`gallery`, image, image.name);
    });
    const image = await axios.post(`${UPLOAD_URI}/api/upload/gallery`, newForm);

    if (image.data) {
      return image.data;
    }
  }
};
export const convertToFormData = ({ values, featuredImage }) => {
  if (featuredImage) {
    const newForm = new FormData();
    let newDataKeys = Object.keys(values);
    const arrayData = newDataKeys.filter((item) => Array.isArray(values[item]));
    console.log(arrayData);
    // arrayData.map((item) => {
    //   if (item && item.length > 0) {
    //   }
    // });

    newForm.append(`values`, JSON.stringify(values));
    if (Object.keys(featuredImage)) {
      Object.keys(featuredImage).map((item, index) => {
        if (featuredImage[item]) {
          if (featuredImage[item].length > 0) {
            Array.from(featuredImage[item]).forEach((image, index) => {
              newForm.append(`${item}`, image, image.name);
            });
          } else {
            newForm.append(
              `${item}`,
              featuredImage[item],
              featuredImage[item].name
            );
          }
        }
      });
    }
    return newForm;
  } else {
    const newForm = new FormData();
    newForm.append(`values`, JSON.stringify(values));
    return newForm;
  }
};
