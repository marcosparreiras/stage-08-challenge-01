const users = require('./users');
const movie_notes = require('./movie_notes');
const movie_tags = require('./movie_tags');
const connectDB = require('../../sqlite');

async function runMigrations() {
    const db = await connectDB();
    const migrations = [users, movie_notes, movie_tags];
    migrations.forEach(async (migration) => {
        await db.run(migration);
    });
}

module.exports = runMigrations;
