const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
//database connection 
require('./models/database');

const People = require('./models/People');

const app = express(); 
app.set('view engine', 'ejs');

//Place body-parser before the CRUD handlers!
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

//All the handlers are here
app.get('/', (req, res) =>{

    People.find()
    .then(contacts => { 
        console.log(contacts) 
        res.render(__dirname + '/views/index.ejs', {contactlist : contacts});
    })
    .catch(error => { 
        res.render(__dirname + '/views/index.ejs', {contactlist : []});
     });
});

app.post('/phone', (req, res) => {
    let contact = new People({
        name : req.body.name,
        phone : req.body.phone
    });

    contact.save(function (error, document) {
        console.log(document)
        if(typeof document._id !== undefined){
            res.redirect("/");
        }else{
            res.send("Error");
        }
    })
});

app.post('/phone/delete', (req, res) => {
    People.findByIdAndDelete(req.body.id)
    .then(s => {
        res.redirect("/");
    }).catch(error => { 
        res.send("Error");
     })

  })

//localhost 
app.listen(3000, function() {
    console.log('listen on port 3000')
});