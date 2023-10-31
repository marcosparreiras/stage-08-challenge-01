const { Router } = require('express');
const authUser = require('../middleweres/authUser');
const MovieNotesController = require('../controllers/MovieNotesController');

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoutes.use(authUser);
movieNotesRoutes.get('/', movieNotesController.index);
movieNotesRoutes.post('/', movieNotesController.create);
movieNotesRoutes.get('/:note_id', movieNotesController.show);
movieNotesRoutes.put('/:note_id', movieNotesController.update);
movieNotesRoutes.delete('/:note_id', movieNotesController.delete);

module.exports = movieNotesRoutes;
