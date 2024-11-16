import { React, useState } from 'react';
import './login.sass';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Component for handling text input fields
const FormUserInformation = ({ requestInformation, placeholder, value, onChange, name }) => {
    return (
        <FormControl sx={{ m: 1, width: '350px' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-user' sx={{ color: 'white' }} required>
                {requestInformation}
            </InputLabel>
            <OutlinedInput
                id='outlined-adornment-user'
                label={requestInformation}
                sx={{ color: 'white' }}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required
            />
        </FormControl>
    );
};

// Component for handling password fields
const FormPassword = ({ requestInformation, placeholder, value, onChange, name }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(prev => !prev);

    return (
        <FormControl sx={{ m: 1, width: '350px' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password' sx={{ color: 'white' }} required>
                {requestInformation}
            </InputLabel>
            <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            onClick={handleShowPassword}
                            edge='end'
                            sx={{ color: 'white' }}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
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
            />
        </FormControl>
    );
};

export default function Login() {
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
    });

    const handleChangeButton = (event, newAlignment) => {
        if (newAlignment !== 'cancel') {
            setAlignment(newAlignment);
            setFormData({
                'First name': '',
                'Family name': '',
                'Email': '',
                'Email address or mobile-phone number': '',
                'Phone number': '',
                'Password': '',
                'Confirm password': ''
            });
        } else {
            navigate('/');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password confirmation check for signup
        if (alignment === 'signup' && formData['Password'] !== formData['Confirm password']) {
            alert('Passwords do not match');
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
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            if (result.status === 'success') {
                alert(result.message);

                if (alignment === 'login') {
                    // Redirect to Caregiver Dashboard upon successful login
                    navigate('/caregiver-dashboard');
                } else {
                    // Redirect to home after successful signup
                    navigate('/');
                }
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    // Define form fields based on login or signup
    const formQuery = [
        {
            status: 'login',
            submenus: [
                { type: 'information', label: 'Email address or mobile-phone number', placeholder: 'example@gmail.com' },
                { type: 'password', label: 'Password', placeholder: 'Enter your password' }
            ]
        },
        {
            status: 'signup',
            submenus: [
                { type: 'information', label: 'First name', placeholder: 'Enter your first name' },
                { type: 'information', label: 'Family name', placeholder: 'Enter your family name' },
                { type: 'information', label: 'Email', placeholder: 'example@gmail.com' },
                { type: 'information', label: 'Phone number', placeholder: 'Enter mobile phone number' },
                { type: 'password', label: 'Password', placeholder: 'Enter your password' },
                { type: 'password', label: 'Confirm password', placeholder: 'Enter your password again' }
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
        );
    };

    return (
        <div className='login'>
            <ToggleButtonGroup
                color='primary'
                value={alignment}
                onChange={handleChangeButton}
                exclusive
                sx={{ border: '1px solid #2D2A84', marginBottom: '20px', borderRadius: '10px' }}
            >
                <ToggleButton value='login' sx={{ color: 'white' }}>Log in</ToggleButton>
                <ToggleButton value='signup' sx={{ color: 'white' }}>Sign up</ToggleButton>
                <ToggleButton value='cancel' sx={{ color: 'white' }}>Cancel</ToggleButton>
            </ToggleButtonGroup>

            <div className='login-page'>
                <div className='content'>
                    <h2>{alignment === 'login' ? 'Login' : 'Sign up'}</h2>
                    <form onSubmit={handleSubmit}>
                        {renderOptions(alignment)}
                        <div className='button'>
                            <Button type='submit' variant="outlined" size='large'>
                                {alignment === 'login' ? 'Login' : 'Sign up'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
