const { Router } = require('express');
const userRoutes = require('./user.routes');
const movieNotesRoutes = require('./movie_notes.routes');

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/notes', movieNotesRoutes);

module.exports = routes;
