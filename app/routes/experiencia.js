const express = require('express');
const router = express.Router();
const Experiencia = require('../models/Experiencia.js');

// Obtener todas las experiencias
router.get('/', async (req, res) => {
  try {
    const experiencias = await Experiencia.findAll();
    res.json(experiencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva experiencia
router.post('/', async (req, res) => {
  try {
    const { titulo, empresa, fechaInicio, fechaFin, descripcion, UsuarioId, foto } = req.body;

    const nueva = await Experiencia.create({
      titulo,
      empresa,
      fechaInicio,
      fechaFin,
      descripcion,
      UsuarioId,
      foto
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar experiencia
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Experiencia.update(data, { where: { id } });
    res.json({ message: 'Experiencia actualizada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar experiencia
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Experiencia.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'No encontrada' });

    res.json({ message: 'Experiencia eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
