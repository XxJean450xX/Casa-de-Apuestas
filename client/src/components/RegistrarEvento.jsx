// client/src/components/RegisterEvent.jsx
import React from "react";

export default function RegisterEvent({ onSubmit }) {
  return (
    <section id="register-event" className="section">
      <h2>Registrar Evento</h2>
      <form className="form-card" onSubmit={onSubmit}>
        <input name="code" placeholder="Código del evento" />
        <input name="description" placeholder="Descripción" />

        <div className="grid">
          <input name="odd_home" placeholder="Cuota Local" />
          <input name="odd_draw" placeholder="Cuota Empate" />
          <input name="odd_away" placeholder="Cuota Visitante" />
        </div>

        <button type="submit">Crear Evento</button>
      </form>
    </section>
  );
}
