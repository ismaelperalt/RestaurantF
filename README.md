# Restaurant Dashboard — Frontend React

## Descripción

Este proyecto es una interfaz frontend desarrollada con **React** que simula un módulo de gestión de pedidos para un restaurante.

La aplicación permite visualizar mesas con pedidos activos organizados por estado, consultar el detalle de cada pedido y navegar entre vistas con una experiencia responsive.

Este proyecto fue desarrollado como prueba técnica enfocada en:

* Experiencia de usuario (UX)
* Diseño visual
* Arquitectura de componentes
* Buenas prácticas en frontend
* Diseño responsive
* Organización del código

---

## Características principales

Dashboard de pedidos del restaurante
Organización visual por estados:

* 🟡 Pendiente
* 🔵 En preparación
* 🟢 Servido

Vista tipo tablero (3 columnas)
Detalle de pedido por mesa
Componentes reutilizables
Routing con React Router
Diseño responsive (desktop, tablet, mobile)
Mock data para simulación de pedidos
Contenerización con Docker

---

##  Arquitectura del proyecto

```
src/
 ├─ components/
 │   ├─ TableCard.jsx
 │   ├─ OrderDetail.jsx
 │   ├─ StatusBadge.jsx
 │   └─ Layout.jsx
 │
 ├─ pages/
 │   ├─ Dashboard.jsx
 │   └─ OrderPage.jsx
 │
 ├─ data/
 │   └─ mockOrders.js
 │
 ├─ styles/
 │   └─ global.css
 │
 ├─ App.jsx
 └─ main.jsx
```

---

## Tecnologías utilizadas

* React
* Vite
* React Router DOM
* CSS
* Docker
* Docker Compose

---

## ⚙️ Instalación y ejecución local

### 1. Clonar repositorio

```
git clone https://github.com/ismaelperalt/RestaurantF.git
cd restaurant-app
```

### 2. Instalar dependencias

```
npm install
```

### 3. Ejecutar aplicación

```
npm run dev
```

### 4. Abrir en navegador

```
http://localhost:5173
```

---

## 🐳 Ejecutar con Docker (recomendado)

### Construir y ejecutar contenedor

```
docker compose up --build
```

Abrir:

```
http://localhost:5173
```

---
## 👨‍💻 Autor

Desarrollado por Ismael Peralta.

