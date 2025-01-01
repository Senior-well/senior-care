import { React, useState } from "react";
import './PatientInfo.sass';
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { peter, peyton, muhsin, muntasir, logoTrans } from "../../images/Images";

export default function PatientInfo() {
    const [address, setAddress] = useState('1111 Algon Ave., BC')
    const [number, setNumber] = useState('(123) - 456 - 789')

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setNumber(event.target.value);
    }

    const onSubmitEmergency = () => {
        alert('Request send! Support team are on it way!');
    }

    return (
        <>
            {/* Patient Information */}
            <div className="patientInfor">
                <div className="patientInfor-page">
                    <div className="patientStatistics">
                        <img
                            src={peter}
                            alt='Peter Image'
                            style={{
                                width: '200px',
                                borderRadius: '25px',
                                border: '2px solid white',
                                marginBottom: '10px'
                            }}
                        />
                        <Button variant="contained">Upload patient image</Button>
                        <h2>Peter Huynh</h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} sx={{ color: 'white' }}>
                                <DatePicker label='Date of birth'
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'white', // Change label color
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white', // Change the input text color
                                        }
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl sx={{ m: 1, width: '260px' }} variant="outlined">
                            <InputLabel htmlFor={'outlined-adorment-user'} sx={{ color: 'white' }}>Mobile phone</InputLabel>
                            <OutlinedInput
                                id={'outlined-adorment-user'}
                                label={'Mobile phone'}
                                sx={{ color: 'white' }}
                                placeholder={'Fill in your number'}
                                value={number}
                                onChange={handlePhoneChange}
                            >
                            </OutlinedInput>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '260px' }} variant="outlined">
                            <InputLabel htmlFor={'outlined-adorment-user'} sx={{ color: 'white' }}>Address</InputLabel>
                            <OutlinedInput
                                id={'outlined-adorment-user'}
                                label={'Address'}
                                sx={{ color: 'white' }}
                                placeholder={'Fill in your address'}
                                value={address}
                                onChange={handleAddressChange}
                            >
                            </OutlinedInput>
                        </FormControl>
                        <div style={{ width: '260px', display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ width: '100px', marginRight: '20px' }}>Cancel</Button>
                            <Button variant="outlined" sx={{ width: '100px' }}>Save</Button>
                        </div>
                    </div>

                    {/* Patient dashboard */}
                    <div className="patientDashboard">
                        <h1>
                            Health <img src={logoTrans} style={{ width: '25px' }} /> Dashboard
                        </h1>
                        <div id="displayDIV">
                            <div id="innerDIV">
                                <div>
                                    <h2>Overview</h2>
                                </div>
                                <div id='warning'>
                                    <h2>Heart Rate</h2>
                                    <p>120 bpm</p>
                                </div>
                            </div>

                            <div id="innerDIV">
                                <div>
                                    <h2>Breathing Pattern</h2>
                                    <p>Normal</p>
                                </div>
                                <div>
                                    <h2>Balance</h2>
                                    <p>Stable</p>
                                </div>
                            </div>

                            <div id="innerDIV">
                                <div>
                                    <h2>Glucose Levels</h2>
                                    <p>110 mg/dL</p>
                                </div>
                                <div>
                                    <h2>Blood Pressure</h2>
                                    <p>120/80 mmHG</p>
                                </div>
                            </div>
                            <div id="button">
                                <Button variant="contained" sx={{ background: 'red' }} onClick={onSubmitEmergency} type="submit">Send Emergency Alert</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}