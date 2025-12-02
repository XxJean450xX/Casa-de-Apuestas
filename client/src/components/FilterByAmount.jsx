import React, { useState } from "react";

const API = "http://localhost:4000/api";

export default function FilterByAmount() {
  const [minAmount, setMinAmount] = useState("");
  const [tickets, setTickets] = useState([]);
  const [msg, setMsg] = useState("");

  const handleFilter = async (e) => {
    e.preventDefault();

    if (!minAmount || isNaN(minAmount)) {
      setMsg("Ingresa un monto válido.");
      return;
    }

    try {
      const res = await fetch(`${API}/tickets`);
      const data = await res.json();

      const filtered = data.filter((t) => t.amount >= parseFloat(minAmount));

      setTickets(filtered);
      setMsg(filtered.length ? "" : "No hay apuestas con monto mayor.");
    } catch (err) {
      setMsg("Error consultando apuestas.");
    }
  };

  return (
    <section className="section" id="filter-amount">
      <h2>Apuestas por Encima de un Monto</h2>

      <form className="form-card" onSubmit={handleFilter}>
        <input
          type="number"
          placeholder="Monto mínimo"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />

        <button type="submit">Buscar</button>
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
