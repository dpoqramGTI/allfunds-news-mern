# MERN News – Prueba Técnica (Fullstack Clean Architecture)

Proyecto **Fullstack MERN (MongoDB, Express, React, Node.js)** para **gestionar noticias (nuevas y archivadas) con actualizaciones en tiempo real** usando **Mongo Change Streams + Socket.IO**.

Incluye **Clean Architecture + DDD en el backend**, **MVVC modular en el frontend**, y **tests unitarios, integración y E2E (Cypress)**.

---

## 🚀 WEB Demo

![Demo Web](./docs/Demo.gif)

---

## ⚡ Quick Start

Con Docker (recomendado):

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:9000](http://localhost:9000)
- **MongoDB** en réplica (necesario para Change Streams).

#### No es necesario poblar la base de datos, el seeding se realiza de forma automática.

## 📊 Arquitectura y Patrones

### **Backend: Clean Architecture + DDD**

- **domain/**: Entidades puras (`news.entity.ts`) y contratos (`news.repository.interface.ts`).
- **application/**: Casos de uso (`listNews.usecase.ts`, `archiveNews.usecase.ts`, etc.).
- **infrastructure/**: Repositorios (`news.repository.ts`) y modelos (`news.model.ts`).
- **presentation/**: Controladores y rutas (`news.controller.ts`, `news.routes.ts`).
- **config/**: Configuración de base de datos, sockets y Change Streams (`db.ts`, `socket.ts`, `changeStream.ts`).
- **scripts/**: Utilidades de arranque como `wait-for-replica.js`.
- **seed/**: Scripts para poblar datos iniciales (`seedNews.ts`).

#### Patrones aplicados:

- Repository Pattern para aislar acceso a datos.
- Dependency Injection manual en casos de uso.
- Observer / Pub-Sub con Change Streams y Socket.IO.

---

### **Frontend: MVVC modular (por feature)**

Cada feature tiene su estructura independiente:

- **components/**: Componentes UI (`NewsItem.tsx`, `NewsList.tsx`, `NewsCard.tsx`, `NewsImage.tsx`).
- **hooks/**: Hooks reutilizables (`useNews.ts`).
- **contexts/**: Providers y contexto global (`NewsProvider.tsx`).
- **services/**: Llamadas a API (`newsApi.ts`).
- **types/**: Tipado (`news.ts`).
- **styles/**: Estilos modulares para componentes (`NewsCard.styles.ts`, `NewsImage.styles.ts`).
- **pages/**: Vistas de alto nivel (`NewNewsPage.tsx`, `ArchivedNewsPage.tsx`).
- **layouts/**: Layout global con `Header.tsx` y `Layout.tsx`, junto a `themes/` para `ThemeProvider` y `theme.ts`.

#### Patrones aplicados:

- MVVC (Modelo–Vista–ViewContext) para separar datos, presentación y estado global.
- Provider Pattern para manejar estado compartido.
- Componentes contenedores vs presentacionales.

---

## 🛠️ Instalación y Ejecución (manual)

1. Instalar dependencias:

   ```bash
   cd backend && npm install
   cd frontend && npm install
   ```

2. Levantar MongoDB en réplica:

   ```bash
   mongod --dbpath "<ruta-a-db>" --replSet "rs0"
   mongosh
   rs.initiate()
   ```

3. Ejecutar servidores:

   ```bash
   cd backend && npm run dev
   cd frontend && npm run dev
   ```

---

## 🤪 Testing

Unitarios (frontend y backend):

```bash
cd backend && npm install && npm run test
cd frontend && npm install && npm run test
```

E2E (Cypress):

```bash
npm install
npm run test:e2e:open
```

---

## 📂 Estructura del Proyecto

```
allfunds-news/
├─ backend/
│  ├─ scripts/                # Scripts de utilidades (espera de réplica)
│  ├─ seed/                   # Poblar datos iniciales (seedNews.ts)
│  ├─ src/
│  │  ├─ config/              # Configuración (DB, sockets, Change Streams)
│  │  └─ news/                # Módulo "news" (Clean Architecture)
│  │     ├─ domain/           # Entidades y contratos
│  │     ├─ application/      # Casos de uso
│  │     ├─ infrastructure/   # Repositorios y modelo Mongoose
│  │     └─ presentation/     # Rutas y controladores
│  ├─ tests/                  # Unitarios e integración
│
├─ frontend/
│  ├─ src/
│  │  ├─ features/news/       # Feature modular (MVVC)
│  │  │  ├─ components/       # Componentes UI (NewsList, NewsCard, etc.)
│  │  │  ├─ contexts/         # Providers y contexto global
│  │  │  ├─ hooks/            # Hooks reutilizables
│  │  │  ├─ pages/            # Vistas (React Pages)
│  │  │  ├─ services/         # API Client
│  │  │  ├─ styles/           # Estilos modulares para UI
│  │  │  ├─ types/            # Modelos y tipados
│  │  │  └─ index.ts          # Reexport centralizado
│  │  ├─ components/          # Componentes compartidos (Pagination)
│  │  ├─ layouts/             # Header, Layout global y ThemeProvider
│  │  └─ themes/              # Tema global y configuración
│  └─ tests/                  # Pruebas unitarias e integración (RTL)
│
└─ cypress/                   # Tests end-to-end con Cypress
```

---

## 👤 Autor

Prueba técnica realizada por **Daniel PR (2025)**
**Fullstack Developer** – [dpoqram@gmail.com](mailto:dpoqram@gmail.com)
