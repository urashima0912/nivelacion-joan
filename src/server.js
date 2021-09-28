const express = require('express');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');

const server = express();

//Settings.
server.set('PORT', 4500);
server.set('views', path.join(__dirname, 'views'));
server.set('View engine', 'pug');

//Middlewares.
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(session({
    name: 'users-app',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
})
);

//Routes.
server.use('/pages/user', routes.user);
server.use('/api', routes.api);
server.use('/pages/message', routes.message)

//Public folder.
server.use(express.static(path.join(__dirname, 'public')));

module.exports = server;