const movie_tags = `
CREATE TABLE IF NOT EXISTS movie_tags (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_id INTEGER,
  user_id INTEGER,
  name VARCHAR,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (note_id) REFERENCES movie_notes (id) ON DELETE CASCADE
)
`;

module.exports = movie_tags;
