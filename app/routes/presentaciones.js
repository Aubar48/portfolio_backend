const express = require('express');
const router = express.Router();
const Presentacion = require('../models/Presentacion.js');

// Obtener todas las presentaciones
router.get('/', async (req, res) => {
  try {
    const presentaciones = await Presentacion.findAll();
    res.json(presentaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva presentación
router.post('/', async (req, res) => {
  try {
    const { nombre, titulo, descripcion, foto, linkLinkedin, linkGithub, linkCV, UsuarioId } = req.body;

    const nueva = await Presentacion.create({
      nombre,
      titulo,
      descripcion,
      foto,
      linkLinkedin,
      linkGithub,
      linkCV,
      UsuarioId,
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar presentación
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Presentacion.update(data, { where: { id } });
    res.json({ message: 'Presentación actualizada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar presentación
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Presentacion.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'No encontrada' });

    res.json({ message: 'Presentación eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
