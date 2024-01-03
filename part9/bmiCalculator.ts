type BmiCategory = 'Underweight' | 'Normal(Healthy Weight)' | 'Overweight' | 'Obese';

interface BmiResult {
  bmi: number;
  category: BmiCategory;
}

function calculateBmi(weightKg: number, heightM: number): BmiResult {
  const bmi = weightKg / (heightM * heightM);

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

function parseInput(args: string[]): { weight: number; height: number } {
  if (args.length !== 4) {
    throw new Error('Invalid number of arguments. Usage: node script.js <weight> <height>');
  }

  const weight = parseFloat(args[2]);
  const height = parseFloat(args[3]);

  if (isNaN(weight) || isNaN(height)) {
    throw new Error('Invalid arguments. Please provide valid weight and height values.');
  }

  return { weight, height };
}

try {
  const { weight, height } = parseInput(process.argv);
  const result = calculateBmi(weight, height);

  console.log(`BMI: ${result.bmi}`);
  console.log(`Category: ${result.category}`);
} catch (error) {
  console.error(error.message);
}