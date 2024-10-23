import React from 'react';
import './login.sass';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Form from 'react-bootstrap/Form';

export default function Login() {
    const formQuery = [
        {
            controlID: 'formuUserEmail',
            labelName: 'E-mail address or mobile-phone number',
            placeHolder: 'Enter your email or mobile number',
            type: 'email',
            status: 'login',
        },
        {
            controlID: 'formPassword',
            labelName: 'Password',
            placeHolder: 'Enter your password',
            type: 'password',
            status: 'login',
        },
        {

        }
    ];

    const formFunction = () => {
        return (
            <>
                {
                    formQuery.map((form) =>
                        <Form.Group controlId={form.controlID}>
                            <Form.Label>{form.labelName}</Form.Label><br></br>
                            <Form.Control placeholder={form.placeHolder} type={form.type} />
                        </Form.Group>
                    )
                }
            </>
        );
    }

    return (
        <div className='login'>
            <ToggleButtonGroup
                color='primary'
            >
                <ToggleButton>Log in</ToggleButton>
            </ToggleButtonGroup>
            <div className='login-page'>
                <Form>
                    {formFunction()}
                </Form>
            </div>
        </div>
    )
}