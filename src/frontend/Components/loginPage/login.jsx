import { React, useContext, useState } from 'react';
import './login.sass';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContent';

/**
 * 
 * @param {*} requestInformation: Information from the formQuery
 * @param {*} placeholder: Placeholder from the formQuery
 * style of input file: outlined - mandatory
 */
const FormUserInformation = ({ requestInformation, placeholder, value, onChange, name }) => {
    return (
        <>
            <FormControl sx={{ m: 1, width: '350px' }} variant={'outlined'}>
                <InputLabel htmlFor={'outlined-adorment-user'} sx={{ color: 'white' }} required>{requestInformation}</InputLabel>
                <OutlinedInput
                    id={'outlined-adorment-user'}
                    label={requestInformation}
                    sx={{ color: 'white' }}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    required
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
const FormPassword = ({ requestInformation, placeholder, value, onChange, name }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => { event.preventDefault(); };
    const handleMouseUpPassword = (event) => { event.preventDefault(); };

    return (
        <>
            <FormControl sx={{ m: 1, width: '350px' }} variant={'outlined'}>
                <InputLabel htmlFor={'outlined-adorment-password'} sx={{ color: 'white' }} required>{requestInformation}</InputLabel>
                <OutlinedInput
                    id={'outlined-adorment-password'}
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
                    value={value}
                    onChange={onChange}
                    name={name}
                    required
                >
                </OutlinedInput>
            </FormControl>
        </>
    )
}

export default function Login() {
    const { setFirstName, setIsLoggedIn } = useContext(UserContext);
    const [alignment, setAlignment] = useState('login');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        'First name': '',
        'Family name': '',
        'Email': '',
        'Email address or mobile-phone number': '',
        'Phone number': '',
        'Password': '',
        'Confirm password': ''
    })

    const handleChangeButton = (event, newAllignment) => {
        if (newAllignment !== 'cancel') {
            setAlignment(newAllignment);
            setFormData({
                'First name': '',
                'Family name': '',
                'Email': '',
                'Email address or mobile-phone number': '',
                'Phone number': '',
                'Password': '',
                'Confirm password': ''
            });
        }
        else {
            navigate('/');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    /**
     * 
     * @param {*} e
     * async: promise-based code
     * await: pause its execution and wait for a promise to resolve before move on
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (alignment === 'signin' && formData['Password'] !== formData['Confirm password']) {
            alert('Password does not match');
            return;
        }

        const payload = { ...formData, status: alignment };

        try {
            const response = await fetch('http://localhost:8010/data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            if (result.status === 'success') {
                if (alignment === 'login') {
                    setFirstName(result.firstName);
                    setIsLoggedIn(true);
                }
                alert(result.message);
                navigate('/');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert(`An error occurred: ${error.message}`);
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
                    value={formData[field.label]}
                    onChange={handleInputChange}
                    name={field.label}
                />
            ) : (
                <FormPassword
                    key={index}
                    requestInformation={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.label]}
                    onChange={handleInputChange}
                    name={field.label}
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
                    <form onSubmit={handleSubmit}>{renderOptions(alignment)}</form>
                    <div className='button'>
                        <Button variant="outlined" size='large' onClick={handleSubmit}>{alignment === 'login' ? 'Login' : 'Sign up'}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}