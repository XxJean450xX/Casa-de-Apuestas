// client/src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">BetMaster</div>
      <ul className="nav-links">
        <li>
          <a href="#register-player">Registrar Jugador</a>
        </li>
        <li>
          <a href="#register-event">Registrar Evento</a>
        </li>
        <li>
          <a href="#create-ticket">Crear Apuesta</a>
        </li>
        <li>
          <a href="#filter-player">Filtrar por Jugador</a>
        </li>
        <li>
          <a href="#filter-amount">Apuestas por Monto</a>
        </li>
        <li>
          <a href="#list-tickets">Listado Apuestas</a>
        </li>
      </ul>
    </nav>
  );
}
