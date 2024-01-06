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

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<BasePatientEntry, 'ssn'>;
