/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState, useEffect} from 'react';
import {endpoints} from '../../APIEndpoints';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {setSenders} from './messagesSlice';
import {useNavigate} from 'react-router-dom';
import UnAuthAccess from '../unauthorized_access/unauthorized_access'
import './messages.css';

const Messages = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <MessagesAuth login={login}/>
    }else {
        return <UnAuthAccess />
    }
}


const MessagesAuth = ({login}) => {
    const senders = useSelector(state => state.senders.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const getSenders = () => {
            let endpoint = endpoints.filter(e => e.name === 'getSenders')[0]
            axios.get(endpoint.path+login.userId)
                 .then(res => {
                    dispatch(setSenders(res.data))
                 })
        }

        getSenders()
    })

    const goToChatPage = (userId) => {
        navigate("/chat/"+userId)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    {login.category !== 'administrator'? <AdminSender />:
                    <List sx={{ bgcolor: 'background.paper' }}>
                        <h2 className="messages-heading">Messages</h2>
                        {senders.map((s,i) => (
                            <div key={i} className="message-list" onClick={() => goToChatPage(s.userId)}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={s.name+" "+s.surname} src={s.image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                    className="message-list-item"
                                    primary={s.name+" "+s.surname}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            <div className="mt-3">
                                            <p>{s.text.slice(0,100).trim().concat("...")}</p>
                                            <p>{s.date.slice(0,10)} {s.date.slice(11,16)}</p>
                                            </div>
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        ))}
                    </List>}
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )
}

const AdminSender = () => {
    const [admin, setAdmin] = useState({
        tel: "",
        surname: "",
        userId: "",
        password: "",
        image: "",
        name: "",
        email: "",
        birthDate: ""
    })
    useEffect(() => {
        const getAdminSender = () => {
            let endpoint = endpoints.filter(e => e.name === 'getUser')[0]
            axios.get(endpoint.path+"rBOy7dZzKDJV2xJqujms")
                .then(res => setAdmin(res.data))
        }

        getAdminSender()
    },[])
    const navigate = useNavigate()
    const goToChatPage = (userId) => {
        navigate("/chat/"+userId)
    }
    return (
                <List sx={{ bgcolor: 'background.paper', marginTop: "15%", marginBottom: "35%"}}>
                    <h2 className="messages-heading">Messages</h2>
                        <div className="message-list" onClick={() => goToChatPage(admin.userId)}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={admin.name+" "+admin.surname} src={admin.image} />
                                </ListItemAvatar>
                            <ListItemText
                                    className="message-list-item"
                                    primary={admin.name+" "+admin.surname}
                                    secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                        </div>
                </List>
    )
}

export default Messages;