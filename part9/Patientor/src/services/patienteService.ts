import patients from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry, EntryWithoutId } from '../types';
import { v4 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addEntry = ( patient: PatientEntry, entry: EntryWithoutId ): Entry => {
   const id = uuid();
  const newEntry = {
      id,
      ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

const patientService = {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addEntry
};

export default patientService;