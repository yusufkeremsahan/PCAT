import express from 'express';
const port = 3000;
const app = express();

app.listen(port, () =>{
    console.log(`Sunucu ${port} portunda çalışıyor..`);
})


app.get('/', (req, res)=>{
    res.send("<h1>Merhaba</h1>");
})
