import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from "@mui/material";



const PatientView = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    useEffect(() => {
        const fetchPatient = async () => {
            if (id !== undefined) {
                const patientData = await patientService.getById(id);
                setPatient(patientData);
            }
        };
        const fetchDiagnoses = async () => {
            const diagnosesData = await diagnosesService.getAll();
            setDiagnoses(diagnosesData);
        };
        void fetchPatient();
        void fetchDiagnoses();
    }, [id]);

    if (patient === undefined) {
        return <p>Patient not found</p>;
    }

    const findDiagnoseDesc = (c: string) => {
        const diagnose = diagnoses?.find(d => d.code === c);
        return diagnose?.name;
    };

    return (
        <div>
            <Box>
                <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: '0.5em' }}>
                    {patient.name} 
                    {patient.gender === 'female' && <FemaleIcon></FemaleIcon>}
                    {patient.gender === 'male' && <MaleIcon></MaleIcon>}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '1em'}}>
                    ssn: {patient.ssn}<br></br>
                    occupation: {patient.occupation}
                </Typography>
                {patient.entries.length !== 0  &&
                <Box>
                    <Divider style={{ marginBottom: '0.5em'}}></Divider>
                    <Typography variant="h6" style={{ marginBottom: '0.5em'}}>
                        Entries
                    </Typography>
                    <Typography variant="body2">
                        {patient.entries.map(e => (
                            <div key={e.id}>{e.date} <em>{e.description}</em>
                                <ul>
                                    {e.diagnosisCodes?.map(c => (
                                        <li key={c}>{c} {findDiagnoseDesc(c)} </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Typography>
                </Box>}
            </Box>
            
        </div>
    );
};

export default PatientView;