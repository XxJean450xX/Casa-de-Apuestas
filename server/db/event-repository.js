const db = require("./connection");
module.exports = {
  createEvent: (code, description, oddHome, oddDraw, oddAway) =>
    new Promise((res, rej) => {
      db.run(
        "INSERT INTO events (code,description,odd_home,odd_draw,odd_away) VALUES (?,?,?,?,?)",
        [code, description, oddHome, oddDraw, oddAway],
        function (err) {
          if (err) return rej(err);
          res();
        }
      );
    }),
  getEventByCode: (code) =>
    new Promise((res, rej) => {
      db.get(
        "SELECT code,description,odd_home,odd_draw,odd_away FROM events WHERE code = ?",
        [code],
        (err, row) => {
          if (err) return rej(err);
          res(row);
        }
      );
    }),
};
