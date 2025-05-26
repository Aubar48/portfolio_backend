const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./app/config/database');

const usuarioRoutes = require('./app/routes/usuario.js');
const educacionRoutes = require('./app/routes/educacion.js');
const experienciaRoutes = require('./app/routes/experiencia.js');
const proyectosRoutes = require('./app/routes/proyectos.js');
const presentacionesRoutes = require('./app/routes/presentaciones.js');

const app = express();
const PORT = process.env.PORT || 41104;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/educacion', educacionRoutes);
app.use('/api/experiencia', experienciaRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/presentacion', presentacionesRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // sincroniza modelos con la base
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error conectando a la base:', error);
  }
});
