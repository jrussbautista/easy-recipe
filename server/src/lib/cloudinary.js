import cloudinary from "cloudinary";

export const Cloudinary = {
  upload: async (image) => {
    cloudinary.v2.config({
      cloud_name: "djlbfjouc",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
    const res = await cloudinary.v2.uploader.upload(image, {
      folder: "easy_recipe",
    });
    return res.secure_url;
  },
};
