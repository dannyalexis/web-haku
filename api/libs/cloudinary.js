import dotenv from "dotenv";
import cloudinaryModule from "cloudinary";
const cloudinary = cloudinaryModule.v2;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
/*
export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "haku",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
*/
