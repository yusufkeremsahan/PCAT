import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import Photo from'./models/Photo.js'; 
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

//Template Engine
app.set("view engine","ejs");

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port, () =>{
    console.log(`Sunucu ${port} portunda çalışıyor..`);
})


app.post('/photos', async (req,res)=>{
    Photo.create(req.body);
    return res.redirect('/');
})


app.get('/', async (req, res)=>{
    const photos = await Photo.find({})
    res.render('index', {photos});
})

app.get('/about', (req, res)=>{
    res.render('about');
})
app.get('/add', (req, res)=>{
    res.render('add');
})


