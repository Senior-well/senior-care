import { React, useState } from 'react';
import './login.sass';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @param {*} requestInformation: Information from the formQuery
 * @param {*} placeholder: Placeholder from the formQuery
 * style of input file: outlined - mandatory
 */
const FormUserInformation = ({ requestInformation, placeholder }) => {
    return (
        <>
            <FormControl sx={{ m: 1, width: '350px' }} variant={'outlined'}>
                <InputLabel htmlFor={'outlined-adorment-user'} sx={{ color: 'white' }}>{requestInformation}</InputLabel>
                <OutlinedInput
                    id={'outlined-adorment-user'}
                    label={requestInformation}
                    sx={{ color: 'white' }}
                    placeholder={placeholder}
                >
                </OutlinedInput>
            </FormControl>
        </>
    );
}

/**
 * 
 * @param {*} requestInformation 
 * @param {*} placeholder 
 * styles of input file: outlined - mandatory
 */
const FormPassword = ({ requestInformation, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => { event.preventDefault(); };
    const handleMouseUpPassword = (event) => { event.preventDefault(); };

    return (
        <>
            <FormControl sx={{ m: 1, width: '350px' }} variant={'outlined'}>
                <InputLabel htmlFor={'outlined-adornment-password'} sx={{ color: 'white' }}>{requestInformation}</InputLabel>
                <OutlinedInput
                    id={'outlined-adornment-password'}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={requestInformation}
                    sx={{ color: 'white' }}
                    placeholder={placeholder}
                >
                </OutlinedInput>
            </FormControl>
        </>
    )
}

export default function Login() {
    const [alignment, setAlignment] = useState('login');
    const navigate = useNavigate();
    const handleChangeButton = (event, newAllignment) => {
        if (newAllignment !== 'cancel') {
            setAlignment(newAllignment);
        }
        else {
            navigate('/');
        }
    }

    const formQuery = [
        {
            status: 'login',
            submenus: [
                {
                    type: 'information',
                    label: 'Email address or mobile-phone number',
                    placeholder: 'example@gmail.com'
                },
                {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter your password'
                },
            ]
        },

        {
            status: 'signup',
            submenus: [
                {
                    type: 'information',
                    label: 'First name',
                    placeholder: 'Enter your first name'
                },
                {
                    type: 'information',
                    label: 'Family name',
                    placeholder: 'Enter your family name'
                },
                {
                    type: 'information',
                    label: 'Email',
                    placeholder: 'example@gmail.com'
                },
                {
                    type: 'information',
                    label: 'Phone number',
                    placeholder: 'Enter mobile phone number'

                },
                {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter your password'
                },
                {
                    type: 'password',
                    label: 'Confirm password',
                    placeholder: 'Enter your password again'
                }
            ]
        }
    ];

    const renderOptions = (status) => {
        const selectedItems = formQuery.find(item => item.status === status);

        return selectedItems?.submenus.map((field, index) =>
            field.type === 'information' ? (
                <FormUserInformation
                    key={index}
                    requestInformation={field.label}
                    placeholder={field.placeholder}
                />
            ) : (
                <FormPassword
                    key={index}
                    requestInformation={field.label}
                    placeholder={field.placeholder}
                />
            )
        )
    }

    return (
        <div className='login'>
            <ToggleButtonGroup
                color='primary'
                value={alignment}
                onChange={handleChangeButton}
                exclusive
                sx={
                    {
                        border: '1px solid #2D2A84',
                        marginBottom: '20px',
                        borderRadius: '10px'
                    }
                }
            >
                <ToggleButton value={'login'} sx={{ color: 'white' }}>Log in</ToggleButton>
                <ToggleButton value={'signup'} sx={{ color: 'white' }}>Sign up</ToggleButton>
                <ToggleButton value={'cancel'} sx={{ color: 'white' }}>Cancel</ToggleButton>
            </ToggleButtonGroup>
            <div className='login-page'>
                <div className='content'>
                    <h2>{alignment === 'login' ? 'Login' : 'Sign up'}</h2>
                    <form>{renderOptions(alignment)}</form>
                    <div className='button'>
                        <Button variant="outlined" size='large'>{alignment === 'login' ? 'Login' : 'Sign up'}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}