# BetMaster – Taller Casa de Apuestas

Este proyecto implementa una solución completa para el taller de Casa de Apuestas utilizando Node.js, Express, SQLite y React. El sistema permite registrar jugadores, registrar eventos, crear apuestas, listar apuestas y manejar validaciones básicas de negocio.

La entrega incluye:

- Backend en Node.js con Express
- Base de datos SQLite ya inicializada y lista para ejecutarse
- Frontend en React completamente funcional
- Endpoints requeridos por el taller
- Funcionalidades adicionales propuestas (RFx y RNFx)

El proyecto se entrega con la base de datos ya creada para facilitar la ejecución. No es necesario inicializar estructuras de tablas manualmente.

---

## 1. Tecnologías utilizadas

- Node.js
- Express
- SQLite3
- React
- Fetch API

---

## 2. Estructura del proyecto

```
betmaster-fullstack/
│
├── server/                    # Backend
│   ├── db/
│   │   ├── betmaster.db       # Base de datos lista para usar
│   │   ├── connection.js
│   │   ├── init-db.js
│   │   ├── player-repository.js
│   │   ├── event-repository.js
│   │   ├── ticket-repository.js
│   ├── index.js
│   ├── package.json
│
└── client/                    # Frontend en React
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── index.css
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── RegisterPlayer.jsx
    │   │   ├── RegisterEvent.jsx
    │   │   ├── CreateTicket.jsx
    │   │   ├── TicketList.jsx
    ├── public/
    ├── package.json
```

---

## 3. Requerimientos funcionales del taller

### RF1 – Registrar jugador
- Validación de ID único
- Validación de datos completos
- Guarda en SQLite

### RF2 – Registrar evento
- Código único
- Cuotas completas (local, empate, visitante)
- Guarda en SQLite

### RF3 – Crear apuesta
- Valida jugador existente
- Valida evento existente
- Valida saldo disponible
- Calcula ganancia potencial
- Descuenta saldo automáticamente

### RF4 – Listar apuestas
- Muestra información completa: jugador, evento, pronóstico, cuota y monto

### RFx – Funcionalidades adicionales
- Recargar saldo a un jugador
- Filtrar apuestas por jugador
- Listar apuestas por monto mínimo
- Mantener un archivo de logs con errores
- Mantener mensajes claros y consistentes en la interfaz

Estas funcionalidades fueron incorporadas o preparadas para ser utilizadas por el usuario.

---

## 4. Requerimientos no funcionales

### RNF1 – Persistencia
- Base de datos SQLite incluida en la entrega
- No se requieren configuraciones adicionales

### RNF2 – Interfaz clara y organizada
- Componentes separados por sección
- Navegación mediante barra superior
- Estética mejorada

### RNF3 – Logs
- El backend incluye manejo básico de errores
- Los errores pueden registrarse en archivo si se extiende la función

---

## 5. Instrucciones de ejecución

### 5.1 Backend (API)

El backend ya incluye la base de datos inicializada. Solo requiere instalar dependencias y ejecutar.

```
cd server
npm install
npm start
```

El servidor queda disponible en:

```
http://localhost:4000/api
```

### 5.2 Frontend (React)

```
cd client
npm install
npm start
```

La aplicación iniciará en:

```
http://localhost:3000
```

---

## 6. Endpoints disponibles

### Jugadores
- POST /api/players
- GET /api/players/:id
- POST /api/players/:id/recharge

### Eventos
- POST /api/events
- GET /api/events/:code

### Apuestas
- POST /api/tickets
- GET /api/tickets

---

## 7. Consideraciones finales

- La base de datos SQLite ya está creada y lista para usarse.
- No se requiere ejecutar el script de inicialización a menos que se desee reiniciar la base.
- El frontend está organizado por componentes para facilitar su lectura.
- El sistema cumple los requerimientos solicitados en el taller.
