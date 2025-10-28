import Photo from '../models/Photo.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllPhotos = async (req, res) => {
    const page = req.query.page;
    const photoPerPage = 3;
    const totalPhotos = await Photo.find().countDocuments();

    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1) * photoPerPage)
    .limit(photoPerPage);
    res.render('index', { 
        photos,
        current: page,
        pages: Math.ceil(totalPhotos/photoPerPage) 
    });
};

const getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    });
};

const createPhoto = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      folder: 'picva_uploads'
    });

    await Photo.create({
      title: req.body.title,
      description: req.body.description,
      image: result.secure_url,
      public_id: result.public_id
    });

    res.redirect('/');
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).send('Error uploading image');
  }
};

const updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photos/${req.params.id}`);
};

const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (photo) {
      if (photo.public_id) {
        try {
          await cloudinary.uploader.destroy(photo.public_id);
        } catch (cloudErr) {
          console.warn('Cloudinary image not found or already deleted:', cloudErr.message);
        }
      }

      await Photo.findByIdAndDelete(req.params.id);
    } else {
      console.warn(`Photo with ID ${req.params.id} not found in DB`);
    }

    res.redirect('/');
  } catch (err) {
    console.error('Error deleting photo:', err);
    res.status(500).send('Error deleting photo');
  }
};

export default { getAllPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto };
