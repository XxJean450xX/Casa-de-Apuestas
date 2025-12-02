// client/src/components/TicketList.jsx
import React from "react";

export default function TicketList({ tickets, onRefresh }) {
  return (
    <section id="list-tickets" className="section">
      <h2>Listado de Apuestas</h2>

      <button onClick={onRefresh} className="refresh-btn">
        Actualizar
      </button>

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
    </section>
  );
}
