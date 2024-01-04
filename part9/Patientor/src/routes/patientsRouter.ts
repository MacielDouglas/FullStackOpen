import express from 'express';
import patienteService from '../services/patienteService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patienteService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Criando um paciente!!!');
});

export default router;