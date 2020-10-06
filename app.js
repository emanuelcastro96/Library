const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('MyApp');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

// ***************************

const app = express();
const port = process.env.PORT || 4000;

const nav = require('./src/routes/navRoutes.js');
const bookRouter = require('./src/routes/bookRoutes')(nav);

const config = {
  user: 'LAPTOP-FA6PVA5T\\Emanuel',
  password: '',
  server: 'LAPTOP-FA6PVA5T\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
  database: 'Library',
  port: 1434,
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    trustedConnection: true
  }
};

sql.connect(config).catch((err) => {
  debug(err);
});

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index',
    { title: 'Library', nav });
});

app.listen(4000, () => {
  debug(`Listening on port ${chalk.green(4000)}`);
});
