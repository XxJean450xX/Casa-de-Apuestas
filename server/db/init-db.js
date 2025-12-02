const db = require("./connection");

const schema = `
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  balance REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
  code TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  odd_home REAL NOT NULL,
  odd_draw REAL NOT NULL,
  odd_away REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  player_id TEXT NOT NULL,
  event_code TEXT NOT NULL,
  prediction TEXT NOT NULL,
  amount REAL NOT NULL,
  selected_odd REAL NOT NULL,
  FOREIGN KEY(player_id) REFERENCES players(id),
  FOREIGN KEY(event_code) REFERENCES events(code)
);
`;
db.exec(schema, (err) => {
  if (err) {
    console.error("Error creando tablas", err);
    process.exit(1);
  }
  console.log("Tablas creadas / verificadas");
  process.exit(0);
});
