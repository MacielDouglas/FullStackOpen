import diagnoses from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

// const diagnosesData: DiagnosisEntry[] = diagnoses;

// const getDiagnoses = (): DiagnosisEntry[] => {
//   return diagnosesData;
// };

// export default (
//   getDiagnoses
// );

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
};

