import express from 'express';
const app = express();

import { calculateBmi, BmiResult } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight)) {
    res.send({error: 'malformatted parameters'}).status(400)
  }

  const bmi: BmiResult = calculateBmi(height, weight)

  const dataBmi = {
    weight, 
    height,
    bmi
  }
  res.send(dataBmi).status(200)

})

app.post('/exercises', (req, res) => {
  const body = req.body
  const dailyExercises: number[] = body.daily_exercises;
  const target: number = body.target;

  if(!target || !dailyExercises){
    res.status(400).send({ error: 'parameters missing' })
  } 

  if(isNaN(target) || dailyExercises.some(isNaN)){
    res.status(400).send({ error: 'malformatted parameters' })
  }

  
  try{
    const result = calculateExercises(dailyExercises, target);

    res.send({result}).status(200);
  }catch(error){
    if(error instanceof Error){
       res.status(400).send({ error: error.message })
    }

    res.status(400).send({ error: 'something went wrong' });
}


})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});