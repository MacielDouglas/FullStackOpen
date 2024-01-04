export type BmiCategory = 'Underweight' | 'Normal(Healthy Weight)' | 'Overweight' | 'Obese';

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
}

export function calculateBmi(heightM: number, weightK: number): BmiResult {

  const bmi =  weightK / ((heightM / 100) * (heightM / 100) );

  let category: BmiCategory;

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 24.9) {
    category = 'Normal(Healthy Weight)';
  } else if (bmi < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return {
    bmi: parseFloat(bmi.toFixed(2)), // Round to two decimal places
    category,
  };
}