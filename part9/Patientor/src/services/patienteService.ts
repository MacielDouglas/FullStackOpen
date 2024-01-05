import patients from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: PatientEntry): PatientEntry => {
  // Adicionar a lógica real de adicionar pacientes aqui.
  // Por enquanto, estamos apenas retornando o mesmo paciente que recebemos.
  return patient;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const patientService = {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};

export default patientService;