/**
 * @author Sotirios Karageorgopoulos
 */
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import {Carousel} from 'react-responsive-carousel';
import images from './images';
import axios from 'axios';
import {endpoints} from '../../APIEndpoints';
import {useNavigate} from 'react-router-dom';
import './login.css';

const Login = () => {
    return (
        <div>
            <FirstPart />
            <SecondPart />
        </div>
    )
}

const FirstPart = () => {
    const [loginValue,setLoginValue] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const doLogin = () => {
        let endpoint = endpoints.filter(e => e.name === "login")[0]

        axios.post(endpoint.path, loginValue)
             .then((res) => {
                let loginObj = {
                    isAuth: true,
                    ...res.data
                }
                let category = res.data.category
                localStorage.setItem('login',JSON.stringify(loginObj))
                return category
            })
            .then((category) => {
                if(category === 'receptionist') {
                    navigate('/receptionist_main')
                }else if(category === 'administrator') {
                    navigate('/admin_main')
                }else if(category === 'customer') {
                    navigate('/customer_main')
                }
            })
    }
    
    const handleLoginValues = (event) => { 
        let name = event.target.name
        let value = event.target.value
        setLoginValue({...loginValue,[name]:value})
    }

    return (
        <div className="container-fluid login-container">
            <div className="row">
                <h1 className="smart-hotel-title">Smart Hotel</h1>
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <form className="form">
                        <h2 className="login-title">Login</h2>
                        <TextField 
                            required
                            name="email"
                            id="email"
                            label="Email"
                            className="form-input"
                            onBlur={handleLoginValues}
                            onChange={handleLoginValues}
                            onClick={handleLoginValues}
                        />
                        <TextField 
                            required
                            name="password"
                            id="password"
                            type="password"
                            label="Password"
                            className="form-input"
                            onBlur={handleLoginValues}
                            onChange={handleLoginValues}
                            onClick={handleLoginValues}
                        />
                        <div className="text-center">
                            <Button variant="contained" className="mt-5 login-btn" onClick={doLogin}>Login</Button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    )
}

const SecondPart = () => {
    return (
        <div className="container-fluid second-part-style">
            <div className="row">
                <div className="col-sm-6">
                    <h2 className="hotel-img-title">Hotel Images</h2>
                    <Carousel>
                        {images.map((i,index) => {
                            return (
                                <img key={index} src={i.image} alt={i.desc}/>
                            )
                        })}
                    </Carousel>
                </div>
                <div className="col-sm-6">
                    <iframe 
                    title="hotel-map"
                    className="map-style"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29721.61036700729!2d-157.76165362130013!3d21.381977263324114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0014f892682f7f%3A0xec50e2c96a16e2b1!2sLanikai%20Beach!5e0!3m2!1sen!2sgr!4v1641383876210!5m2!1sen!2sgr" 
                    allowFullScreen=""
                    loading="lazy"></iframe>
                </div>
            </div>
        </div>
    )
}

export default Login