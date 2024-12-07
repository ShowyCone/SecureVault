# Secure Vault

**Secure Vault** es una aplicación web diseñada para almacenar texto cifrado en un entorno seguro. Los usuarios pueden organizar su información en carpetas protegidas y acceder a sus datos mediante un sistema de autenticación robusto que incluye verificación en dos pasos (2FA). En el futuro, se añadirá un gestor de contraseñas y soporte para imágenes cifradas.

---

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **frontend/**: Contiene el código cliente, desarrollado con React. Gestiona la interfaz de usuario y se comunica con el backend a través de la API.
- **backend/**: Contiene la API construida con Node.js y Express.js. Proporciona las funciones de autenticación, cifrado de datos, y manejo de la base de datos.

---

## Instalación y Configuración

### Clonar el Repositorio

```bash
git clone https://github.com/showycone/SecureVault.git
cd SecureVault
```

### Configuración del Backend

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con las siguientes variables:
   ```env
   PORT=5000
   DATABASE_URL=mysql://usuario:contraseña@localhost:3306/secure_vault
   JWT_SECRET=tu_secreto
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```

### Configuración del Frontend

1. Navega a la carpeta del frontend:
   ```bash
   cd ../frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con las siguientes variables:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```

---

## Uso del Proyecto

1. Abre tu navegador y ve a `http://localhost:5173`.
2. Registra una nueva cuenta.
3. Inicia sesión y organiza tus datos en carpetas cifradas.
4. (Próximamente) Accede al gestor de contraseñas o sube imágenes.

---

## Tecnologías Usadas

- **Frontend**:
  - React
  - React Router DOM
  - TailwindCSS
  - Axios
  - Framer Motion
- **Backend**:
  - Node.js
  - Express.js
  - JSON Web Tokens (JWT) para autenticación
  - bcrypt para hashing de contraseñas
- **Base de Datos**: MySQL
- **Seguridad**: Encriptación AES, 2FA con Google/Microsoft Authenticator.

---

## To-Do List

- [x] Crear el sistema básico de carpetas.
- [x] Implementar autenticación segura con JWT.
- [ ] Integrar 2FA con aplicaciones de autenticación (Google/Microsoft Authenticator).
- [ ] Soporte para almacenamiento de imágenes cifradas.
- [ ] Agregar el gestor de contraseñas.

---

## Cómo Contribuir

Aunque este proyecto es privado y desarrollado por un solo desarrollador, cualquier sugerencia o comentario puede hacerse a través de [este correo](mailto:alexrafael2003@gmail.com).

---

## Autor

**ShowyCone**  
Creador y desarrollador de Secure Vault. Si tienes alguna pregunta, no dudes en contactarme.
