## Version utilizada

- Node.js (v20.16) api

## Requisitos Previos

- Node.js (v16+)
- npm
- Docker (opcional)

## variables de entorno

# crear un archivo .env en la raiz con las siguientes variables

- PORT=3000
- MONGO_URI='mongodb+srv://challenge-open-pass:challenge123@cluster0.k7ja3.mongodb.net'
- MONGO_ROOT_USERNAME=challenge-open-pass
- MONGO_ROOT_PASSWORD=challenge123

## Inicio Rápido

### Ejecutar con npm

1. Instalar dependencias en el directorio raiz
```bash
npm install
```

2. Iniciar servicio (raiz):
```bash
npm run start
```

Esto iniciará:

Servidor API en http://localhost:3000

Ejecutar con Docker
1. Construir e iniciar contenedores:

```bash
docker-compose up --build
```

2. Para ejecuciones posteriores:
```bash
docker-compose up
```

# Servicio API
Ubicado en el directorio api.

Características
- Endpoints RESTful para obtener data de api externa/BD y generar reportes
- Arquitectura basada en componentes para escalabilidad
- Standard.js para estilo de código
- Jest para pruebas

# Endpoints de API
- GET /api/characters?race=<race>?affiliation?<affiliation> - Obtener personajes con filtros
- GET /api/reports/<planetId> - Obtener reporte por filtro planetId

# Pruebas
```bash
npm test
```

Stack Tecnológico
Backend
- Node.js
- Express
- Standard.js
- Jest
- Docker

## Configuración Docker
Tres configuraciones de Dockerfile:

- Dockerfile - Configuración servicio API
- docker-compose.yml - Orquestación de servicios

# Scripts Disponibles

Directorio raíz:

- npm run start - Iniciar servicio
- npm test - Ejecutar pruebas API
