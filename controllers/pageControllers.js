import Photo from '../models/Photo.js';

const getAboutPage = (req, res) => {
    res.render('about',{currentPage: 'about'});
};

const getAddPage = (req, res) => {
    res.render('add',{currentPage: 'add'});
};

const getEditPage = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit', {
        photo,
        currentPage: 'none'
    });
};

export default{getAboutPage, getAddPage, getEditPage};