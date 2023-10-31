const { Router } = require('express');
const userRoutes = require('./user.routes');
const movieNotesRoutes = require('./movie_notes.routes');
const loginRoutes = require('./login.routes');

const routes = Router();
routes.use('/login', loginRoutes);
routes.use('/users', userRoutes);
routes.use('/notes', movieNotesRoutes);

module.exports = routes;
