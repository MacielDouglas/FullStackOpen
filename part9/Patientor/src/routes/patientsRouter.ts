import express from 'express';
import patienteService from '../services/patienteService';
import toNewPatientEntry from '../utils/utils';
import toNewEntry from '../utils/newEntry';

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


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patienteService.addPatient(newPatientEntry);
    res.json(addedEntry);    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
    
  });

  router.post('/:id/entries', (req, res) => {
    try{
        const patient = patienteService.findById(req.params.id);
        if( patient === undefined ){
            res.status(404).send(`patient not found`);
            return;
        }
        const newEntry = toNewEntry(req.body);
        const addedEntry = patienteService.addEntry(patient, newEntry);
        res.json(addedEntry);

    }catch(error: unknown){
        let errorMessage = 'Something went wrong';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;