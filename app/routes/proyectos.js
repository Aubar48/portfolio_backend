const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto.js');

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo proyecto
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, linkGithub, linkDeploy, UsuarioId, foto } = req.body;

    const nuevo = await Proyecto.create({
      titulo,
      descripcion,
      linkGithub,
      linkDeploy,
      UsuarioId,
      foto
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar proyecto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Proyecto.update(data, { where: { id } });
    res.json({ message: 'Proyecto actualizado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar proyecto
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Proyecto.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' });

    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
