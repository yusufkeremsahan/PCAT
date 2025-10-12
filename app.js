import express from 'express';
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
    //res.sendFile(path.resolve(__dirname ,"temp/index.html"));
    res.render('add');
})
