/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRooms} from './roomsSlice';
import {useNavigate} from 'react-router-dom';
import {endpoints} from '../../APIEndpoints';
import DeleteIcon from '@mui/icons-material/Delete';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import './rooms.css';

const Rooms = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <RoomsAuth login={login} />
    }else {
        return <UnAuthAccess />
    }
}

const RoomsAuth = ({login}) => {
    const dispatch = useDispatch() 
    const rooms = useSelector(state => state.rooms.value)
    const navigate = useNavigate()

    useEffect(()=>{
        const getRooms = () => {
            let endpoint = endpoints.filter(e => e.name === 'getRooms')[0]
            axios.get(endpoint.path)
                .then(res => {
                    dispatch(setRooms(res.data))
                })
        }

        getRooms()
    },[])

    const doUnavailableRoom = (roomId) => {
        let endpoint = endpoints.filter(e => e.name === 'changeRoomAvailability')[0]
        axios.put(endpoint.path+roomId,{availability: false})
        .then(res => window.location.reload(false))
    }

    const doAvailableRoom = (roomId) => {
        let endpoint = endpoints.filter(e => e.name === 'changeRoomAvailability')[0]
        axios.put(endpoint.path+roomId,{availability: true})
        .then(res => window.location.reload(false))
    }

    const deleteRoom = (roomId) => {
        let endpoint = endpoints.filter(e => e.name === 'deleteRoom')[0]
        axios.delete(endpoint.path+roomId)
        .then(res => window.location.reload(false))
    }

    const goToUpdateRoomDetails = (roomId) => {
        navigate(`/update_room_details/${roomId}`)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {rooms.map((r,i) => (
                    <div className="col-sm-4 mb-3" key={i}>
                        <Card>
                                <CardMedia
                                component="img"
                                image={r.image}
                                alt={r.roomId}
                                height="300"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {r.roomId} {r.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <p className={Boolean(r.availability) === true? "available-room": "unavailable-room"}>{Boolean(r.availability) === true? "Available": "Unavailable"}</p>
                                    {r.description}
                                </Typography>
                                </CardContent>
                                <CardActions>
                                    {login.category === "administrator"?<Button onClick={() => deleteRoom(r.roomId)} size="small" variant="contained" color="error" startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>: ""}
                                    {login.category === "administrator"?<Button onClick={() => goToUpdateRoomDetails(r.roomId)} size="small" variant="contained" color="warning">Update</Button>: ""}
                                    {login.category === "administrator"?Boolean(r.availability) === true ?<Button size="small" variant="contained" color="error" onClick={() => doUnavailableRoom(r.roomId)}>Unavailable</Button>: <Button size="small" variant="contained" color="success" onClick={() => doAvailableRoom(r.roomId)}>Available</Button>: ""}
                                </CardActions>
                        </Card>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default Rooms