<div align="center">
  <h1>🏠 Vives House - API REST</h1>
  <p><em>Servidor backend para la aplicación de gestión de pisos compartidos.</em></p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white" alt="Sequelize" />
    <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
    <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-brightgreen" alt="Estado" />
  </p>
</div>

---

## 🌟 Sobre el Proyecto

**Vives House API** es el núcleo backend (Servidor) que da vida a la plataforma web de Vives House. Se encarga de gestionar toda la lógica de negocio, la seguridad, la persistencia de datos y servir una API RESTful documentada e intuitiva para que los clientes frontend puedan interactuar fácilmente con la base de datos de manera segura y eficiente.

## ✨ Características Principales

- 🔐 **Autenticación con JWT:** Sistema robusto de registro e inicio de sesión seguro usando JSON Web Tokens y contraseñas encriptadas con Bcrypt.
- 👥 **Gestión de Usuarios y Roles:** Diferenciación entre administradores y miembros estándar del hogar.
- 🏠 **Control de Casas:** Rutas protegidas para crear hogares y gestionar los miembros que conviven en ellos.
- 💸 **Registro de Gastos:** Lógica para controlar la economía compartida, sabiendo quién ha gastado cuánto y cuándo.
- 🧹 **Tareas Domésticas:** Asignación y seguimiento del estado de las labores del hogar.
- 📑 **Documentación Interactiva:** OpenAPI (Swagger) integrada para probar y revisar de manera sencilla cada uno de los endpoints expuestos (`/api-docs`).

## 🛠️ Tecnologías Utilizadas

- **Entorno de ejecución:** [Node.js](https://nodejs.org/)
- **Framework Web:** [Express.js](https://expressjs.com/)
- **ORM (Base de Datos):** [Sequelize](https://sequelize.org/) (Soporte nativo para MySQL/MariaDB)
- **Validación de Datos:** [express-validator](https://express-validator.github.io/docs/)
- **Seguridad y Tokens:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) y [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Documentación de API:** [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) + [js-yaml](https://github.com/nodeca/js-yaml)

## 🚀 Instalación y Uso Local

Sigue estos pasos para desplegar el servidor en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/Vives-House/Server
cd Server
```

### 2. Instalar dependencias
Asegúrate de tener [Node.js](https://nodejs.org/) instalado y ejecuta:
```bash
npm install
```

### 3. Configurar Variables de Entorno y Configuración
Para que el servidor pueda conectarse a la base de datos, debes crear dos archivos basándote en las plantillas incluidas:

- Copia el archivo `.env.example` y renómbralo a `.env`.
- Copia el archivo `config.local.yaml.example` y renómbralo a `config.local.yaml`.

Estos archivos ya vienen preconfigurados con los valores por defecto (`user_vives` y `password_vives`) para que funcione de forma inmediata y en perfecta sincronía tanto en local como con los tests automatizados.

### 4. Configuración de Base de Datos
Asegúrate de tener un servicio de MySQL ejecutándose localmente o a través de Docker (puedes usar el archivo `docker-compose.yml` incluido).
```bash
docker-compose up -d
```

### 5. Iniciar el servidor de desarrollo
```bash
npm run dev
```
El servidor de desarrollo con autorecarga (Nodemon) estará disponible por defecto en `http://localhost:3000`. 
Puedes revisar la documentación técnica de la API visitando `http://localhost:3000/api-docs`.

### 🧪 Pruebas (Testing)

El servidor cuenta con varios mecanismos para asegurar la calidad del código y el correcto funcionamiento de los endpoints:

1. **Pruebas Unitarias (Jest):**
   Puedes correr la suite de tests ejecutando en la consola:
   ```bash
   npm test
   ```
2. **Colección de Postman:**
   En la raíz del servidor encontrarás el archivo `VivesHouseAPI_PostmanCollection.json`. Puedes importarlo directamente en tu cliente de Postman. Contiene todos los endpoints configurados e incluye scripts de prueba automatizados.
3. **Integración Continua (CI):**
   El repositorio tiene configurado un flujo de trabajo de **GitHub Actions** (`.github/workflows/tests.yml`). Cada vez que haces un `push` o un `pull request` a la rama principal, se levantará automáticamente la base de datos (con Docker), se instalarán las dependencias, y se correrán tanto los tests de Jest como los de Postman usando `newman`. ¡Todo de forma automática!

## 📁 Estructura del Proyecto

```text
src/
├── config/       # Archivos de configuración general (ej. Base de datos)
├── controllers/  # Lógica de los endpoints (procesamiento de req y res)
├── middlewares/  # Funciones intermedias (Autenticación, Manejo de errores globales)
├── routes/       # Definición de rutas y vinculación con middlewares/controladores
├── services/     # Lógica de negocio 
├── tests/        # Pruebas automatizadas (Jest)
├── utils/        # Funciones auxiliares o helpers útiles
├── validators/   # Validadores de peticiones basados en express-validator
├── app.js        # Configuración principal de la aplicación Express
└── server.js     # Archivo de entrada donde se levanta el servidor
```
*Además, cuentas con la carpeta `docs/api` donde reside el archivo `openapi.yaml` de documentación.*

---

## ✍️ Autores

Conoce a los desarrolladores detrás de **Vives House**:

<div align="center">

| <a href="https://github.com/MT22HUGO"><img src="https://avatars.githubusercontent.com/u/232877974?v=4" width="120" style="border-radius: 50%;" alt="Hugo"/></a> | <a href="https://github.com/DavidOrtego"><img src="https://avatars.githubusercontent.com/u/232877571?v=4" width="120" style="border-radius: 50%;" alt="David"/></a> |
| :---: | :---: |
| **[Hugo](https://github.com/MT22HUGO)** | **[David](https://github.com/DavidOrtego)** |
| 💻 *Full Stack Developer* | 💻 *Full Stack Developer* |
| [![GitHub](https://img.shields.io/badge/Perfil-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MT22HUGO) | [![GitHub](https://img.shields.io/badge/Perfil-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DavidOrtego) |

</div>

## 📄 Licencia

Este proyecto está distribuido bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más información.

---
<div align="center">
  Hecho con ❤️ para mejorar la convivencia en casa.
</div>