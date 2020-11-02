//Budget API

//const { publicEncrypt } = require('crypto');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const path = require('path');
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

let url = 'mongodb://localhost:27017/mongo-pb';

app.use(cors());


app.use('/', express.static('public'));

const budget = {
    myBudget: [
    {
        title: 'Eating out',
        budget:70
    },
    {
        title: 'Rent',
        budget:330
    },
    {
        title: 'Groceries',
        budget:100
    },
    {
        title: 'Internet',
        budget:100
    },
    {
        title: 'Laundry',
        budget:100
    },
    {
        title: 'Groceries',
        budget:100
    },
    {
        title: 'Groceries',
        budget:100
    }

]};

const budData = require("./budData")


// app.get('/hello',(req, res) => {
//     res.send('Hello world!');
// });

// app.get('/budget',(req, res) => {
//     res.json(budget);
// });
app.get("/budget", (req, res) => {
    //console.log(budget);
    //res.send(budget);
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      budData.find({}).then((data) =>{
        res.json(data);
        mongoose.connection.close();
      }).catch((mongooseErr) => {
        res.status("200").send(mongooseErr);
      })
    })
    .catch((connectionErr) => {
      res.status("200").send(connectionErr);
    })
  });

  app.post("/add", (req,res)=>{
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      let addBudData = {$set:{
        title:req.body.title,
        budget:req.body.budget,
        color:req.body.color
      }}
      budData.update({title:req.body.title},addBudData,{upsert:true}).then((data) =>{
        mongoose.connection.close();
        res.json(data);
        
      }).catch((mongooseErr) => {
        res.status("200").send(mongooseErr);
      })
    })
    .catch((connectionErr) => {
      res.status("200").send(connectionErr);
    })
  });

app.listen(port, () =>{
    console.log(`API listening at http://localhost:${port}`)
});