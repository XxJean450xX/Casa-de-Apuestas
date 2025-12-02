// client/src/components/CreateTicket.jsx
import React from "react";

export default function CreateTicket({ onSubmit }) {
  return (
    <section id="create-ticket" className="section">
      <h2>Crear Apuesta</h2>
      <form className="form-card" onSubmit={onSubmit}>
        <input name="code" placeholder="Código de apuesta" />
        <input name="player_id" placeholder="ID del jugador" />
        <input name="event_code" placeholder="Código del evento" />

        <select name="prediction">
          <option value="">Seleccione pronóstico</option>
          <option value="HOME">Local</option>
          <option value="DRAW">Empate</option>
          <option value="AWAY">Visitante</option>
        </select>

        <input name="amount" type="number" placeholder="Monto" />

        <button type="submit">Registrar Apuesta</button>
      </form>
    </section>
  );
}
