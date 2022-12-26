const cloudinary = require("./cdn");
const { preset } = require("./cdn.config");

const uploadImage = (path) => {
  return cloudinary.uploader.upload(path, preset);
};

const deleteImage = (id) => {
  if (!id) return;
  return cloudinary.uploader.destroy(id);
};

module.exports = {
  uploadImage,
  deleteImage,
};
