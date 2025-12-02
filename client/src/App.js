// client/src/App.js
import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import RegisterPlayer from "./components/RegistrarJugador";
import RegisterEvent from "./components/RegistrarEvento";
import CreateTicket from "./components/CrearApuesta";
import TicketList from "./components/ListadoApuestas";
import FilterByPlayer from "./components/FilterByPlayer";
import FilterByAmount from "./components/FilterByAmount";

const API = "http://localhost:4000/api";

function App() {
  const [tickets, setTickets] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => fetchTickets(), []);

  async function fetchTickets() {
    const res = await fetch(API + "/tickets");
    const data = await res.json();
    setTickets(data);
  }

  async function registerPlayer(e) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target).entries());
    body.balance = parseFloat(body.balance);

    const res = await fetch(API + "/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setMsg((await res.json()).error || "Jugador creado");
    e.target.reset();
  }

  async function registerEvent(e) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target).entries());

    const res = await fetch(API + "/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setMsg((await res.json()).error || "Evento creado");
    e.target.reset();
  }

  async function createTicket(e) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target).entries());
    body.amount = parseFloat(body.amount);

    const res = await fetch(API + "/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const j = await res.json();
    setMsg(j.error || `Apuesta creada. Ganancia potencial: ${j.potential}`);
    fetchTickets();
    e.target.reset();
  }

  return (
    <>
      <Navbar />

      <RegisterPlayer onSubmit={registerPlayer} />
      <RegisterEvent onSubmit={registerEvent} />
      <CreateTicket onSubmit={createTicket} />
      <FilterByPlayer tickets={tickets} />
      <FilterByAmount tickets={tickets} />
      <TicketList tickets={tickets} onRefresh={fetchTickets} />

      <div style={{ textAlign: "center", padding: 20 }}>
        {msg && <p>{msg}</p>}
      </div>
    </>
  );
}

export default App;
