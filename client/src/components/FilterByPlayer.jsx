import React, { useState } from "react";

const API = "http://localhost:4000/api";

export default function FilterByPlayer() {
  const [playerId, setPlayerId] = useState("");
  const [tickets, setTickets] = useState([]);
  const [msg, setMsg] = useState("");

  const handleFilter = async (e) => {
    e.preventDefault();

    if (!playerId.trim()) {
      setMsg("Por favor ingresa un ID de jugador.");
      return;
    }

    try {
      const res = await fetch(`${API}/tickets`);
      const data = await res.json();

      const filtered = data.filter((t) =>
        t.player_id.toLowerCase().includes(playerId.toLowerCase())
      );

      setTickets(filtered);
      setMsg(filtered.length ? "" : "No hay apuestas para este jugador.");
    } catch (err) {
      setMsg("Error consultando apuestas.");
    }
  };

  return (
    <section className="section" id="filter-player">
      <h2>Filtrar Apuestas por Jugador</h2>

      <form className="form-card" onSubmit={handleFilter}>
        <input
          placeholder="ID del jugador"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />

        <button type="submit">Filtrar</button>
      </form>

      {msg && <p>{msg}</p>}

      {tickets.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Jugador</th>
                <th>Evento</th>
                <th>Pronóstico</th>
                <th>Monto</th>
                <th>Cuota</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.ticket_id}>
                  <td>{t.ticket_code}</td>
                  <td>
                    {t.player_id} - {t.player_name}
                  </td>
                  <td>{t.event_code}</td>
                  <td>{t.prediction}</td>
                  <td>{t.amount}</td>
                  <td>{t.selected_odd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
