import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
const app = express();


//Template Engine
app.set("view engine","ejs");

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port, () =>{
    console.log(`Sunucu ${port} portunda çalışıyor..`);
})


app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/about', (req, res)=>{
    res.render('about');
})
app.get('/add', (req, res)=>{
    res.render('add');
})

app.post('/photos', (req,res)=>{
    console.log(req.body);
    return res.redirect('/');
})
