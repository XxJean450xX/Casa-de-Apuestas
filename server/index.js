const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/connection");
const playerRepo = require("./db/player-repository");
const eventRepo = require("./db/event-repository");
const ticketRepo = require("./db/ticket-repository");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes - Players
app.post("/api/players", async (req, res) => {
  try {
    const { id, name, balance } = req.body;
    if (!id || !name || balance == null)
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    const exists = await playerRepo.getPlayerById(id);
    if (exists) return res.status(409).json({ error: "Player id ya existe" });
    await playerRepo.createPlayer(id, name, parseFloat(balance));
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/players/:id", async (req, res) => {
  try {
    const p = await playerRepo.getPlayerById(req.params.id);
    if (!p) return res.status(404).json({ error: "Jugador no encontrado" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/players/:id/recharge", async (req, res) => {
  try {
    const { amount } = req.body;
    const player = await playerRepo.getPlayerById(req.params.id);
    if (!player)
      return res.status(404).json({ error: "Jugador no encontrado" });
    const newBal = player.balance + parseFloat(amount);
    await playerRepo.updatePlayerBalance(req.params.id, newBal);
    res.json({ ok: true, balance: newBal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Events
app.post("/api/events", async (req, res) => {
  try {
    const { code, description, odd_home, odd_draw, odd_away } = req.body;
    if (
      !code ||
      !description ||
      odd_home == null ||
      odd_draw == null ||
      odd_away == null
    )
      return res.status(400).json({ error: "Faltan datos" });
    const exists = await eventRepo.getEventByCode(code);
    if (exists) return res.status(409).json({ error: "Event code ya existe" });
    await eventRepo.createEvent(
      code,
      description,
      parseFloat(odd_home),
      parseFloat(odd_draw),
      parseFloat(odd_away)
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/events/:code", async (req, res) => {
  try {
    const e = await eventRepo.getEventByCode(req.params.code);
    if (!e) return res.status(404).json({ error: "Evento no encontrado" });
    res.json(e);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tickets (bets)
app.post("/api/tickets", async (req, res) => {
  try {
    const { code, player_id, event_code, prediction, amount } = req.body;
    if (!code || !player_id || !event_code || !prediction || amount == null)
      return res.status(400).json({ error: "Faltan datos" });
    const player = await playerRepo.getPlayerById(player_id);
    if (!player) return res.status(404).json({ error: "Jugador no existe" });
    const event = await eventRepo.getEventByCode(event_code);
    if (!event) return res.status(404).json({ error: "Evento no existe" });
    const preds = {
      HOME: event.odd_home,
      DRAW: event.odd_draw,
      AWAY: event.odd_away,
    };
    const selOdd = preds[prediction];
    if (!selOdd) return res.status(400).json({ error: "Pronóstico inválido" });
    if (player.balance < amount)
      return res.status(400).json({ error: "Saldo insuficiente" });
    const potential = amount * selOdd;
    await ticketRepo.createTicket(
      code,
      player_id,
      event_code,
      prediction,
      parseFloat(amount),
      selOdd
    );
    await playerRepo.updatePlayerBalance(
      player_id,
      player.balance - parseFloat(amount)
    );
    res.json({ ok: true, potential });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/tickets", async (req, res) => {
  try {
    const t = await ticketRepo.getAllTickets();
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// RFx2 - Filtrar por jugador
app.get("/api/tickets/player/:id", async (req, res) => {
  try {
    const rows = await ticketRepo.getTicketsByPlayer(req.params.id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RFx3 - Listar apuestas por encima de un monto
app.get("/api/tickets/above/:amount", async (req, res) => {
  try {
    const rows = await ticketRepo.getTicketsAboveAmount(
      parseFloat(req.params.amount)
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));
