import express from 'express';
const app = express();

import { calculateBmi, BmiResult } from './bmiCalculator';

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight)) {
    res.send({error: 'malformated parameters'}).status(400)
  }

  const bmi: BmiResult = calculateBmi(height, weight)

  const dataBmi = {
    weight, 
    height,
    bmi
  }
  res.send(dataBmi).status(200)

})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});