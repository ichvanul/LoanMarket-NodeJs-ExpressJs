require('dotenv').config();
const express = require ('express');
const app = express();
const exphbs = require('express-handlebars');
const port = 5000;
const bodyParser = require('body-parser');
const route = require('./src/routers/index.js');
const logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
//set views file
app.engine('handlebars', exphbs ({ defaultLayout: 'main' }));
//set view engine
app.set('view engine', 'handlebars');

app.get('/branch', (req, res) => {
  res.render('index')
})

app.get('/adviser', (req, res) => {
  res.render('adviser')
})

app.use('/api/v1/', route);
app.listen(port, ()=>{
  console.log('App Listen post 5000');
})