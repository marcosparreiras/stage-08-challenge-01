const movie_notes = `
CREATE TABLE IF NOT EXISTS movie_notes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR,
  description VARCHAR,
  rating INTEGER,
	user_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
)
`;

module.exports = movie_notes;
