/**
 * @author Sotirios Karageorgopoulos
 */
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {endpoints} from '../../APIEndpoints'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import './customers.css'

const Customers = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <CustomerAuth />
    } else {
        return <UnAuthAccess />
    }
}

export const CustomerAuth = () => {
    const [customers, setCustomers] = useState([{
        name: "",
        surname: "",
        email: "",
        tel: "",
        blackListed: "",
        image: "",
        userId: ""
    }])

    useEffect(() => {
        const getAllCustomers = () => {
            let endpoint = endpoints.filter(e => e.name === 'getAllCustomers')[0]
            axios.get(endpoint.path) 
                 .then(res => {
                    setCustomers(res.data)
                 }) 
        }
        
        getAllCustomers()
    },[])

    const addBlackList = (userId) => {
        let endpoint = endpoints.filter(e => e.name === 'postBlacklistedCustomer')[0]
        axios.put(endpoint.path+userId)
        .then(res => window.location.reload(false))
    }

    const removeBlackList = (userId) => {
        let endpoint = endpoints.filter(e => e.name === 'removeBlacklistedCustomer')[0]
        axios.put(endpoint.path+userId)
        .then(res => window.location.reload(false))
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                <List sx={{ bgcolor: 'background.paper' }}>
                    <h2 className="customers-heading">Customers</h2>
                    {customers.map((c,i) => (
                        <div key={i}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={c.name+" "+c.surname} src={c.image} />
                                </ListItemAvatar>
                                <ListItemText
                                className="customer-list-item"
                                primary={c.name+" "+c.surname}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    <span className="customer-details mt-3">
                                        <span className="customer-list-item">email: {c.email}</span>
                                        <span className="customer-list-item">tel: {c.tel}</span>
                                        <span className="customer-list-item">{Boolean(c.blackListed) === true? "Blacklisted Customer": ""}</span>
                                        <span className="customer-btns">
                                            <Button onClick={() => addBlackList(c.userId)} size="small" variant="contained" color="error" className="mb-3">Add Black List</Button>
                                            {Boolean(c.blackListed) === true? <Button onClick={() => removeBlackList(c.userId)} size="small" variant="contained" color="warning">Remove Black List</Button>: ""}
                                        </span>
                                    </span>
                                    </Typography>
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    ))}
                </List>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )
}

export default Customers