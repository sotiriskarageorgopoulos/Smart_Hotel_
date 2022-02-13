/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState,useEffect} from 'react';
import {roomTypes} from '../admin_main/roomTypes';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {endpoints} from '../../APIEndpoints';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import {useDispatch, useSelector} from 'react-redux';
import {setRooms} from '../rooms/roomsSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import {Check,X} from 'react-bootstrap-icons';
import {setCustomerRes} from './customerSlice';
import { NavigationBtn } from '../../util';
import './customer_main.css';

const CustomerMain = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <CustomerMainAuth />
    } else {
        return <UnAuthAccess />
    }
}

export const CustomerMainAuth = () => {
    let rooms = useSelector(state => state.rooms.value)
    let customerRes = useSelector(state => state.customerRes.value)
    const dispatch = useDispatch()
    
    const [searchValue, setSearchValue] = useState([])
    
    useEffect(() => {
        const getAvailableRooms = () => {
            let endpoint = endpoints.filter(e => e.name === 'getAvailableRooms')[0]
            axios.get(endpoint.path)
            .then(res => dispatch(setRooms(res.data)))
        }

        const checkAvailabilityOfRooms = () => {
            let endpoint = endpoints.filter(e => e.name === 'checkAvailabilityOfRooms')[0]
            axios.put(endpoint.path)
        }

        checkAvailabilityOfRooms()
        getAvailableRooms()
    },[])

    const handleSearchValue = (event) => {
        let name = event.target.name
        let value = event.target.value
        setSearchValue({[name]:value})
    }

    const search = () => {
        if(searchValue.hasOwnProperty("price")) {
            let endpoint = endpoints.filter(e => e.name === 'getRoomsUntilPrice')[0]
            axios.get(endpoint.path+Number(searchValue.price))
                .then(res => {
                    dispatch(setRooms(res.data))
                })
        } else if(searchValue.hasOwnProperty("date")) {
            let endpoint = endpoints.filter(e => e.name === 'getAvailableRoomsByDate')[0]
            axios.get(endpoint.path+searchValue.date)
                .then(res => {
                    dispatch(setRooms(res.data))
                })
        } else if(searchValue.hasOwnProperty("type")) {
            let endpoint = endpoints.filter(e => e.name === 'getRoomsByType')[0]
            axios.get(endpoint.path+searchValue.type)
                .then(res => {
                    dispatch(setRooms(res.data))
                })
        }
    }

    const addRoom = (room) => {
        dispatch(setCustomerRes([...customerRes, room]))
    }

    const removeRoom = (roomId) => {
        let newCusRes = customerRes
                        .filter(r => r.roomId !== roomId)
        console.log(newCusRes)
        dispatch(setCustomerRes(newCusRes))
    }

    return (<div className="container-fluid">
                <div className="row mb-5">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <form className="form form-customer">
                            <div className="container-fluid">
                                <div className="row d-flex justify-content-center">
                                    <h2 className="search-title">Search</h2>
                                    <TextField 
                                        required
                                        name="price" 
                                        id="price"
                                        label="price"
                                        style={{
                                            margin: "0% 0% 0% 3%", 
                                            width: "20%" 
                                        }}
                                        onBlur={handleSearchValue}
                                        onClick={handleSearchValue}
                                        onChange={handleSearchValue}
                                    />
                                    <TextField 
                                        required
                                        type="datetime-local"
                                        name="date"
                                        id="date"
                                        label="date" 
                                        style={{
                                            margin: "0% 0% 0% 3%", 
                                            width: "30%" 
                                        }}
                                        placeholder="date"
                                        onBlur={handleSearchValue}
                                        onClick={handleSearchValue}
                                        onChange={handleSearchValue}
                                    />
                                    <FormControl
                                        fullWidth
                                        style={{
                                            margin: "0% 0% 0% 3%", 
                                            width: "20%"
                                        }}
                                        onBlur={handleSearchValue}
                                        onClick={handleSearchValue}
                                        onChange={handleSearchValue}
                                        >
                                        <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                                            room type
                                        </InputLabel>
                                        <NativeSelect
                                            inputProps={{
                                            name: 'type',
                                            id: 'uncontrolled-native'
                                        }}>
                                                <option>Select...</option>
                                                {roomTypes.map((r,i) => {
                                                    return <option key={i} value={r}>{r}</option>
                                                })}
                                        </NativeSelect>
                                    </FormControl> 
                                    <div className="text-center mt-5">
                                        <Button onClick={search} size="small" variant="contained">Search</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
                <div className="text-center">
                    {customerRes.length > 0 ? <NavigationBtn page="/customer_reservation" text="Next Step"/> :""}
                </div>
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
                                <Typography className="room-desc" variant="body2" color="text.secondary">
                                    <span className="available-room">Available</span>
                                    <span className="room-span">Price: &#36;{r.price}</span>
                                    <span className="room-span">Capacity: {r.capacity} people</span>
                                    <span className="room-span">Size: {r.size} m&sup2;</span>
                                    {r.services !== undefined? <span className="room-span">Services: {r.services.join()}</span>: ""}
                                    {r.description}
                                </Typography>
                                </CardContent>
                                <CardActions>
                                    {customerRes.filter(room => room.roomId === r.roomId).length === 1? 
                                    <div className="reserved-btns">
                                        <Button size="small" variant="contained" color="success"><Check size={20}/> reserved</Button> 
                                        <Button size="small" variant="contained" color="error" onClick={() => removeRoom(r.roomId)}><X size={20}/> remove</Button> 
                                    </div>
                                    :<Button size="small" variant="contained" color="success" onClick={() => addRoom(r)}>Make Reservation</Button>}
                                </CardActions>
                        </Card>
                    </div>
                ))}
                </div>
            </div>)
}

export default CustomerMain