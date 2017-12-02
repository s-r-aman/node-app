const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

// app.use((req, res, next) => {
    //     var now = new Date().toString();
    //     let log = `${now}: ${req.method} ${req.url}`;
    //     console.log(log);
    //     fs.appendFileSync('log.txt', log);
    //     next();
    // });
    
app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync("log.txt", log);
      next();
    // res.render('maintainence.hbs');  
});
    
hbs.registerPartials(__dirname + '/views/partials');
    
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear',() => {
    return (new Date()).getFullYear();
});

hbs.registerHelper('title',() => {
    return "Server";
});

hbs.registerHelper('screamIt',(data) => {
    return data.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Server | Home Page',
        // currentYear: (new Date()).getFullYear(),
        message: 'Welcome to the server Home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: (new Date()).getFullYear(),
        message: 'Welcome to the about page!'
    });
});

app.get("/bad", (req, res) => {
  res.send({
      error: 'This page does not exists! '
  });
});

app.listen(port);