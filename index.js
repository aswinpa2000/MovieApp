//Basic Server Structure

// 1. import express
const express = require("express");
const MovieInfo = require('./models/MovieDB');
var cors = require('cors');
const path = require('path');
const { resolveSoa } = require("dns");



// 2. initialising express
const app = new express();
app.use(cors());


// Parsing body parameter
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));

//Cors Policy
// app.use((req,res,next) =>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
//     res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
//     res.setHeader("Access-Control-Allow-Credentials",true);
//     next();
// })


// 3. Api creation
app.get('/', (req,res) =>{
    res.send('Congrats !! server is Running');
});

app.get('/api', (req,res)=>{
    res.json([{"name":"Aswin","place":"wayanad"},{"name":"Amal","place":"kozhikode"}]);
});

//create a movie
app.post('/api/create', (req,res) =>{
    try{
    // console.log(req.body); //server data
    let movie = new MovieInfo(req.body); //passing to db
    movie.save(); //saving to db
    res.send('Data Added');
    }
    catch(error){
        res.status(500).send(error)
    }    
})

//read
app.get('/api/view', async(req,res) =>{
    try{
        let result = await MovieInfo.find();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error)
    } 
})

// update
app.post('/api/update',async (req,res) =>{
    try{
        let result = await MovieInfo.findByIdAndUpdate(req.body._id, req.body);
        res.send('Data Updated');
    }
    catch(error){
        res.status(500).send(error)
    } 
})

//delete
app.post('/api/delete',async (req,res) =>{
    try{
        let result = await MovieInfo.findByIdAndDelete(req.body._id);
        res.send('Data Deleted');
    }
    catch(error){
        res.status(500).send(error)
    }   
})

//search
app.post('/api/search', async(req,res)=>{
    try{
        // let result = await MovieInfo.find(req.body); 
        let result = await MovieInfo.find({ "movieName": { $regex: '.*' + req.body.movieName + '.*' } });
        res.json(result);
    }
    catch(error){
        res.status(500).send(error)
    }  
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
});

// 4. setting the PORT number
app.listen(8000, ()=>{
    console.log('Server is running in port 8000');
}); 