const db = require("./connection");
module.exports = {
  createTicket: (code, playerId, eventCode, prediction, amount, selectedOdd) =>
    new Promise((res, rej) => {
      db.run(
        "INSERT INTO tickets (code,player_id,event_code,prediction,amount,selected_odd) VALUES (?,?,?,?,?,?)",
        [code, playerId, eventCode, prediction, amount, selectedOdd],
        function (err) {
          if (err) return rej(err);
          res();
        }
      );
    }),
  getAllTickets: () =>
    new Promise((res, rej) => {
      const sql = `SELECT t.code as ticket_code, t.id as ticket_id, t.player_id, p.name as player_name, t.event_code, t.prediction, t.amount, t.selected_odd
                 FROM tickets t
                 JOIN players p ON p.id = t.player_id
                 ORDER BY t.id DESC`;
      db.all(sql, [], (err, rows) => {
        if (err) return rej(err);
        res(rows);
      });
    }),
  getTicketsByPlayer: (playerId) =>
    new Promise((res, rej) => {
      const sql = `SELECT * FROM tickets WHERE player_id = ? ORDER BY id DESC`;
      db.all(sql, [playerId], (err, rows) => {
        if (err) return rej(err);
        res(rows);
      });
    }),

  getTicketsAboveAmount: (amount) =>
    new Promise((res, rej) => {
      const sql = `SELECT * FROM tickets WHERE amount > ? ORDER BY amount DESC`;
      db.all(sql, [amount], (err, rows) => {
        if (err) return rej(err);
        res(rows);
      });
    }),
};
