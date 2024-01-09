// Enums son típicamente utilizados cuando hay un conjunto de valores predeterminados que no se espera que cambien el futuro. Usualmente, son utilizados para valores mucho más estrictos en cuanto a posibles cambios (por ejemplo, días de la semana, meses, direcciones cardinales), pero ya que nos ofrecen una gran forma de validar nuestros valores entrantes, también podríamos usarlos en nuestro caso.
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface BasePatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn?: string;
  entries: Entry[]
}

export interface PatientEntry extends BasePatientEntry {
  ssn: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<BasePatientEntry, 'ssn' | 'entries'>;

export type NoSsnPatient = Omit<BasePatientEntry, 'ssn'>;

type UnionOmit<T, K extends string | number | symbol> 
    = T extends unknown ?
        Omit<T, K> 
        : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;


