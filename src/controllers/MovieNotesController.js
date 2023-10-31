const connectDB = require('../database/sqlite');
const AppErro = require('../utils/AppError');
const validateRequestBody = require('../utils/validateRequestBody');

class MovieNotesController {
    async index(req, res) {
        const { title } = req.query;
        const db = await connectDB();
        let results;
        if (title) {
            results = await db.all(
                'SELECT * FROM movie_notes WHERE title LIKE (?)',
                [`%${title}%`]
            );
        } else {
            results = await db.all('SELECT * FROM movie_notes');
        }
        const movies_notes = await Promise.all(
            results.map(async (movie_note) => {
                const tags = await db.all(
                    'SELECT name FROM movie_tags WHERE note_id = (?)',
                    [movie_note.id]
                );
                const tagsName = tags.map((tag) => tag.name);
                return { ...movie_note, tags: tagsName };
            })
        );
        res.status(200).json({ movies_notes });
    }

    async show(req, res) {
        const { note_id } = req.params;
        const db = await connectDB();
        const note = await db.get('SELECT * FROM movie_notes WHERE id = (?)', [
            note_id,
        ]);
        if (!note) {
            throw new AppErro('Note not found');
        }
        const tagsResults = await db.all(
            'SELECT name FROM movie_tags WHERE note_id = (?)',
            [note_id]
        );
        const tags = tagsResults.map((tag) => tag.name);
        note.tags = tags;
        res.status(200).json({ note });
    }

    async create(req, res) {
        const user_id = req.user_id;
        validateRequestBody(
            ['title', 'description', 'rating', 'tags'],
            req.body
        );
        const { title, description, rating, tags } = req.body;
        if (rating < 1 || rating > 5) {
            throw new AppErro('Rating must be between 1 and 5');
        }
        const db = await connectDB();
        const result = await db.run(
            'INSERT INTO movie_notes(title, description, rating, user_id) VALUES (?, ?, ?, ?)',
            [title, description, rating, user_id]
        );
        tags.forEach(async (tag) => {
            await db.run(
                'INSERT INTO movie_tags(note_id, user_id, name) VALUES (?, ?, ?)',
                [result.lastID, user_id, tag]
            );
        });
        res.status(201).json({ success: true });
    }

    async update(req, res) {
        const { note_id } = req.params;
        const db = await connectDB();
        validateRequestBody(['title', 'description', 'rating'], req.body);
        const { description, rating, title } = req.body;
        const note = await db.get('SELECT * FROM movie_notes WHERE id = (?)', [
            note_id,
        ]);
        if (!note) {
            throw new AppErro('Note not found');
        }
        if (rating < 1 || rating > 5) {
            throw new AppErro('Rating must be between 1 and 5');
        }
        await db.run(
            'UPDATE movie_notes SET description = (?), rating = (?), title = (?), updated_at = DATETIME("now") WHERE id = (?)',
            [description, rating, title, note_id]
        );
        res.status(200).json({ success: true });
    }

    async delete(req, res) {
        const { note_id } = req.params;
        const db = await connectDB();
        const note = await db.get('SELECT * FROM movie_notes WHERE id = (?)', [
            note_id,
        ]);
        if (!note) {
            throw new AppErro('Note not found');
        }
        await db.run('DELETE FROM movie_notes WHERE id = (?)', [note_id]);
        res.status(204).json();
    }
}

module.exports = MovieNotesController;
