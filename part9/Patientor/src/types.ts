export type Gender = "male" | "female" | "other";

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

interface BasePatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
}

export interface PatientEntry extends BasePatientEntry {
  ssn: string;
}

export type NonSensitivePatientEntry = Omit<BasePatientEntry, 'ssn'>;
