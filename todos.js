// REQUIREMENTS
require('dotenv').config();

// SETUP FILES
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;

const Todo = require('./models/todo.js')
const show = console.log;
// const routeController = require('./controllers/controller.js');
const session = require('express-session')
const bcrypt = require('bcrypt')

// SETUP DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todolist'

mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true });
db.on('error', (error) => show(err.message + ' is Mongo running?'));
db.on('connected', () => show('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => show('mongo disconnected'));
// open the connection to mongo
db.on('open' , () => {});


// MIDDLEWARE
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
    secret: 'SECRET', //process.env.SECRET,
     resave: false,
      saveUninitialized: false
    }))
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// INDEX ROUTE
app.get('/', (req, res) => {
    //res.send('listitem');
    Todo.find({}, (error, allTodos) => {
        res.render('Index', {
            todos: allTodos
        });
    })
});

// CREATE ROUTE
app.post('/', (req, res) => {
    req.body.isDone = false;
    // todos.push(req.body);
    Todo.create(req.body, (error, newTodo) => {
        res.redirect('/')
    })
    // res.redirect('/');
});

// DELETE ROUTE
app.delete('/:id', (req,res) => {
    Todo.findByIdAndRemove(req.params.id, (error, item) => {
        if (error) {
            show(error)
        } else {
            res.redirect('/')
        }
    })
})

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
db.once('open', ()=> {
    show('Connected to mongo');
});

// LISTEN ROUTE
app.listen(PORT, () => {
    show(`Listening on port: ${PORT}...`);
})