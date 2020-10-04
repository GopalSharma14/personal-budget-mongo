const { publicEncrypt } = require('crypto');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


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

app.get('/hello',(req, res) => {
    res.send('Hello world!');
});

// app.get('/budget',(req, res) => {
//     res.json(budget);
// });
app.get('/budget',(req, res) => {
    res.sendFile(path.normalize(__dirname + '/myfile.json'));
});
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});