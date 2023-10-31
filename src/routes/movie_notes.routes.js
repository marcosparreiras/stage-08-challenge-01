const { Router } = require('express');
const MovieNotesController = require('../controllers/MovieNotesController');

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoutes.get('/', movieNotesController.index);
movieNotesRoutes.post('/:user_id', movieNotesController.create);
movieNotesRoutes.get('/:note_id', movieNotesController.show);
movieNotesRoutes.put('/:note_id', movieNotesController.update);
movieNotesRoutes.delete('/:note_id', movieNotesController.delete);

module.exports = movieNotesRoutes;
