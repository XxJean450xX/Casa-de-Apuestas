// client/src/components/RegisterPlayer.jsx
import React from "react";

export default function RegisterPlayer({ onSubmit }) {
  return (
    <section id="register-player" className="section">
      <h2>Registrar Jugador</h2>
      <form className="form-card" onSubmit={onSubmit}>
        <input name="id" placeholder="ID único" />
        <input name="name" placeholder="Nombre" />
        <input name="balance" type="number" placeholder="Saldo inicial" />
        <button type="submit">Registrar</button>
      </form>
    </section>
  );
}
