const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

async function connectDB() {
    const db = await sqlite.open({
        filename: path.resolve(__dirname, '../', 'database.db'),
        driver: sqlite3.Database,
    });
    await db.exec('PRAGMA foreign_keys = ON');
    return db;
}

module.exports = connectDB;
