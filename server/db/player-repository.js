const db = require("./connection");
module.exports = {
  createPlayer: (id, name, balance) =>
    new Promise((res, rej) => {
      db.run(
        "INSERT INTO players (id,name,balance) VALUES (?,?,?)",
        [id, name, balance],
        function (err) {
          if (err) return rej(err);
          res();
        }
      );
    }),
  getPlayerById: (id) =>
    new Promise((res, rej) => {
      db.get(
        "SELECT id,name,balance FROM players WHERE id = ?",
        [id],
        (err, row) => {
          if (err) return rej(err);
          res(row);
        }
      );
    }),
  updatePlayerBalance: (id, newBalance) =>
    new Promise((res, rej) => {
      db.run(
        "UPDATE players SET balance = ? WHERE id = ?",
        [newBalance, id],
        function (err) {
          if (err) return rej(err);
          res();
        }
      );
    }),
};
