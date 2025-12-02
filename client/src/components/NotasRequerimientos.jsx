import React from "react";

export default function NotasRequerimientos() {
  return (
    <div className="card">
      <h3>Notas / Requerimientos adicionales</h3>
      <ol>
        <li>RFx: Recargar saldo a un jugador (ya implementado).</li>
        <li>RFx: Filtrar apuestas por jugador.</li>
        <li>RFx: Listar apuestas por monto mínimo.</li>
        <li>RNFx: Registrar errores en archivo log.</li>
        <li>RNFx: Mensajes consistentes y lenguaje neutro.</li>
      </ol>
    </div>
  );
}
