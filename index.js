const express = require('express');
const path = require('path');
const db = require('./db');
const employeeRoute = require('./controller/employeeController');

const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Home and About routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));

// Employees routes
app.use('/employees', employeeRoute);

// Start server
db.query("SELECT 1")
  .then(() => app.listen(7000, () => console.log("Server running on http://localhost:7000")))
  .catch(err => console.log("DB connection error:", err));
