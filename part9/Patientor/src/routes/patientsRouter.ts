import express from 'express';
import patienteService from '../services/patienteService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patienteService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patienteService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  res.send('Criando um paciente!!!');
});

export default router;