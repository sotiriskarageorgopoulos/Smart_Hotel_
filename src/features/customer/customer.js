/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import {endpoints} from '../../APIEndpoints';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import './customer.css';

const Customer = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <CustomerAuth />
    } else {
        return <UnAuthAccess />
    }
}

export const CustomerAuth = () => {
    const [customer, setCustomer] = useState({
        tel: "",
        name: "",
        image: "",
        surname: "",
        userId: "",
        blackListed: false,
        bonusPoints: 0,
        email: ""
    })

    let path = window.location.pathname
    let customerId = path.split("/")[2]

    useEffect(() =>{
        const getCustomer = () => {
            let endpoint = endpoints.filter(e => e.name === 'getCustomer')[0]
            axios.get(endpoint.path+customerId)
                 .then(res => {
                    setCustomer(res.data)
                 })
        }
        getCustomer()
    },[])

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
                <div className="customer-details-box">
                    <h2 className="customer-details-title">Customer Details</h2>
                    <Avatar
                        alt={customer.name+" "+customer.surname}
                        src={customer.image}
                        className="customer-image"
                        sx={{ width: 220, height: 200 }}
                    />
                    <p className="customer-info-p"><span className="customer-info-span ">Name:</span> {customer.name}</p>
                    <p className="customer-info-p"><span className="customer-info-span ">Surname:</span> {customer.surname}</p>
                    <p className="customer-info-p"><span className="customer-info-span ">Email:</span> {customer.email}</p>
                    <p className="customer-info-p"><span className="customer-info-span ">Tel:</span> {customer.tel}</p>
                    <p className="customer-info-p"><span className="customer-info-span ">Blacklisted:</span> {Boolean(customer.blacklisted) === true? "Blacklisted" : "Not Blacklisted"}</p>
                    <p className="customer-info-p"><span className="customer-info-span ">Bonus Points:</span> {customer.bonusPoints}</p>

                </div>
            </div>
            <div className="col-sm-2"></div>
        </div>
    </div>)
}


export default Customer