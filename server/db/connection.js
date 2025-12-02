const sqlite3 = require("sqlite3");
const path = require("path");
const dbFile = path.join(__dirname, "..", "db", "betmaster.db");
const db = new sqlite3.Database(dbFile);
module.exports = db;
