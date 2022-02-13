/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import {endpoints} from '../../APIEndpoints';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {useNavigate} from 'react-router-dom';
import {countries} from '../../countries';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [registerValue, setRegisterValue] = useState({})

    const navigate = useNavigate()

    const handleRegisterValues = (event) => {
        let name = event.target.name
        let value = event.target.value
        if(name !== undefined && value !== undefined) {
            setRegisterValue({...registerValue,[name]:value})
        }
    }

    const doRegister = () => {
        let endpoint = endpoints.filter(e => e.name === 'register')[0]
        console.log(registerValue)
        console.log(endpoint)
        axios.post(endpoint.path,registerValue)
              .then(res => {
                    let registerObj = {
                        ...res.data,
                        isAuth: true,
                        category: "customer"
                    }
                    localStorage.setItem('login',JSON.stringify(registerObj))
                    navigate('/customer_main')
               })
    }

    return (
        <div className="container-fluid register-container">
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <form className="form"> 
                        <h2 className="register-title">Register</h2>
                        <TextField 
                            required
                            name="name"
                            id="name"
                            label="name"
                            className="form-input"
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues}
                        />
                        <TextField 
                            required
                            name="surname"
                            id="surname"
                            label="surname"
                            className="form-input"
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues}
                        />
                        <TextField 
                            required
                            type="email"
                            name="email"
                            id="email"
                            label="email"
                            className="form-input"
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues}
                        />
                        <TextField 
                            required
                            type="password"
                            name="password"
                            id="password"
                            label="password"
                            className="form-input"
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues}
                        />
                         <TextField 
                            required
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            label="confirm password"
                            className="form-input"
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues}
                        />
                        <TextField 
                            required
                            type="tel"
                            name="tel"
                            id="tel"
                            label="tel"
                            className="form-input"
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues}
                        />
                        <FormControl
                            fullWidth
                            style={{
                                margin: "5% auto 5% auto"
                            }}
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues} 
                            >
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                nationality
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                name: 'nationality',
                                id: 'uncontrolled-native'
                            }}>
                                    <option>Select...</option>
                                    {countries.map((c,i) => {
                                        return <option key={i} value={c}>{c}</option>
                                    })}
                            </NativeSelect>
                        </FormControl>
                        <TextField 
                            required
                            type="datetime-local"
                            name="birthDate"
                            id="birthDate"
                            label="birth date"
                            className="form-input"
                            placeholder="birth date"
                            onBlur={handleRegisterValues}
                            onChange={handleRegisterValues}
                            onClick={handleRegisterValues}
                        />
                        <div className="text-center">
                            <Button variant="contained" className="mt-5 register-btn" onClick={doRegister}>Register</Button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    )
}

export default Register