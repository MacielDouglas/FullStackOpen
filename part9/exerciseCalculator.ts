export interface Exercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  target: number;
  ratingDescription: string;
  average: number;
}

export function calculateExercises(daysExercises: number[], days: number): Exercises {
  const sum = daysExercises.reduce((item, value) => item + value, 0);

  const objective = daysExercises.length * 2;
  const periodLength = daysExercises.length;
  const trainingDays = daysExercises.filter((item) => item !== 0).length;
  const success = sum >= objective;
  const target = days;
  const average = sum / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (sum === 0) {
    rating = 1;
    ratingDescription = 'No exercise done';
  } else if (sum < objective) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'Objective met or exceeded';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

export function parseInput(args: string[]): { days: number; exercises: number[] } {
  if (args.length < 4) {
    throw new Error('Insufficient arguments. Usage: node script.js <target> <exercise1> <exercise2> ...');
  }

  const days = parseInt(args[2]);
  const exercises = args.slice(3).map((arg) => parseFloat(arg));

  if (isNaN(days) || exercises.some(isNaN)) {
    throw new Error('Invalid arguments. Please provide a valid target (number) and exercise values (numbers).');
  }

  return { days, exercises };
}


// interface Exercises {
//   periodLength: number;
//   trainingDays: number;
//   success: boolean;
//   rating: number;
//   target: number;
//   ratingDescription: string;
//   average: number;
// }

// function calculateExercises(daysExercises: number[], days: number): Exercises {
//   const sum = daysExercises.reduce((item, value) => item + value, 0);

//   const objective = daysExercises.length * 2;
//   const periodLength = daysExercises.length;
//   const trainingDays = daysExercises.filter((item) => item !== 0).length;
//   const success = sum >= objective;
//   const target = days;
//   const average = sum / periodLength;

//   let rating: number;
//   let ratingDescription: string;

//   if (sum === 0) {
//     rating = 1;
//     ratingDescription = 'No exercise done';
//   } else if (sum < objective) {
//     rating = 2;
//     ratingDescription = 'Not too bad but could be better';
//   } else {
//     rating = 3;
//     ratingDescription = 'Objective met or exceeded';
//   }

//   return {
//     periodLength,
//     trainingDays,
//     success,
//     rating,
//     ratingDescription,
//     target,
//     average,
//   };
// }

// function parseInput(args: string[]): { days: number; exercises: number[] } {
//   if (args.length < 4) {
//     throw new Error('Insufficient arguments. Usage: node script.js <target> <exercise1> <exercise2> ...');
//   }

//   const days = parseInt(args[2]);
//   const exercises = args.slice(3).map((arg) => parseFloat(arg));

//   if (isNaN(days) || exercises.some(isNaN)) {
//     throw new Error('Invalid arguments. Please provide a valid target (number) and exercise values (numbers).');
//   }

//   return { days, exercises };
// }

// try {
//   const { days, exercises } = parseInput(process.argv);
//   const result = calculateExercises(exercises, days);
//   console.log(result);
// } catch (error) {
//   console.error(error.message);
// }



