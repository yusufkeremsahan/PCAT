import Photo from '../models/Photo.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', { photos });
};
const getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    });
};
const createPhoto = async (req, res) => {
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name
        })
        res.redirect('/');
    })
}
const updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photos/${req.params.id}`);
}
const deletePhoto =  async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.deleteOne(photo);
    res.redirect('/')
}
export default { getAllPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto };
