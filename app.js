import express, { urlencoded } from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import methodOverride from 'method-override';
import photoController from './controllers/photoControllers.js'; 
import pageController from './controllers/pageControllers.js';

const DB_URI = process.env.MONGODB_URL || 'mongodb://localhost/pcat-test-db';
const uploadDir = 'public/uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const port = process.env.PORT || 3000;
const app = express();

//Connect DB
mongoose.connect(DB_URI)
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.error('DB Connection Error:', err);
});

//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

//Photo Controllers
app.post('/photos', photoController.createPhoto)
app.get('/', photoController.getAllPhotos )
app.get('/photos/:id',photoController.getPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

//Page Controllers
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor..`);
})