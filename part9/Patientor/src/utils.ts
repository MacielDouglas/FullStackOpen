import {Gender, NewPatientEntry} from './types';

//isString
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

//isDate
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

//parseName
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

//parseDate
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth');
  }

  return dateOfBirth;
};

//parseSSn
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

//parseOccupation
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

//isGender.
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map((v) => v.toString()).includes(param);
};

//parseGender
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    object.name !== undefined &&
    object.dateOfBirth !== undefined &&
    object.ssn !== undefined &&
    object.gender !== undefined &&
    object.occupation !== undefined
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newEntry;
  }

  throw new Error('Incorrect or missing data');
};

export default toNewPatientEntry;
