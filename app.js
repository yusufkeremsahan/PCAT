import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import Photo from'./models/Photo.js'; 
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import fs from 'fs';

const uploadDir = 'public/uploads';

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

//Template Engine
app.set("view engine","ejs");

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());

app.listen(port, () =>{
    console.log(`Sunucu ${port} portunda çalışıyor..`);
})


app.post('/photos', async (req,res)=>{
    //console.log(req.files.image);
    //Photo.create(req.body);
    //return res.redirect('/');

    let uploadImage= req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
    uploadImage.mv(uploadPath,async () =>{
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name
        })
        res.redirect('/');
    }
    )
})

app.get('/', async (req, res)=>{
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {photos});
})

app.get('/about', (req, res)=>{
    res.render('about');
})
app.get('/add', (req, res)=>{
    res.render('add');
})

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    });
});
