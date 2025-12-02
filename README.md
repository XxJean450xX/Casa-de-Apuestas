# BetMaster - Taller (React + Node.js + SQLite)

Proyecto entregable del taller de "Casa de Apuestas". Contiene:
- `server/` : API en Node.js + Express + sqlite3 (archivo DB en server/db/betmaster.db)
- `client/` : App React básica para interactuar con la API

Instrucciones rápidas:
1. Instalar dependencias del servidor:
   cd server
   npm install
   npm run init-db
   npm start

2. Instalar dependencias del cliente:
   cd client
   npm install
   npm start

API endpoints principales:
- POST /api/players {id, name, balance}
- GET  /api/players/:id
- POST /api/players/:id/recharge {amount}
- POST /api/events {code, description, odd_home, odd_draw, odd_away}
- GET  /api/events/:code
- POST /api/tickets {code, player_id, event_code, prediction, amount}
- GET  /api/tickets

Requerimientos del taller cubiertos:
- Registro de jugadores, eventos y apuestas.
- Cálculo de cuota seleccionada y ganancia potencial devuelta en la respuesta.
- Validaciones: existencia de jugador/evento, saldo suficiente, ids únicos.
- Persistencia en SQLite (init-db.js crea tablas).
- Script `start` en server/package.json para iniciar servidor.
# Casa-de-Apuestas
