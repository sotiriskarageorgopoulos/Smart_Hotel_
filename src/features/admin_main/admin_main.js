/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState,useEffect} from 'react';
import {roomTypes} from './roomTypes';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {roomServices} from './roomServices';
import axios from 'axios';
import {endpoints} from '../../APIEndpoints';
import {toBase64String} from '../../util';
import UnAuthAccess from '../unauthorized_access/unauthorized_access'
import './admin_main.css';


const AdminMain = () => {
    const login = JSON.parse(localStorage.getItem('login'))

    useEffect(() => {
        const checkAvailabilityOfRooms = () => {
            let endpoint = endpoints.filter(e => e.name === 'checkAvailabilityOfRooms')[0]
            axios.put(endpoint.path)
        }

        checkAvailabilityOfRooms()
    },[])

    if(login?.isAuth === true) {
       return <AdminMainAuth />
    }
    else {
        return <UnAuthAccess />
    }
}

export const AdminMainAuth = () => {
    const [insertRoomValue, setInsertRoomValue] = useState({
        services: []
    })

    const [discountValues, setDiscountValues] = useState({})
    const [roomIds, setRoomIds] = useState([])
    const [priceValues, setPriceValues] = useState({})

    const handleInsertRoomValues = (event) => {
        if(event.target.type === 'file') {
            if(event.target.files[0] !== undefined) {
                toBase64String(event.target.files[0])
                .then(image => {
                    setInsertRoomValue({...insertRoomValue,image})
                })
            }
        }
        else {
            let name = event.target.name 
            let value = event.target.value 
            if(name !== undefined && value !== undefined) {
                setInsertRoomValue({...insertRoomValue,[name]:value})
            }
        }
    }

    const handleServicesValues = (event) => {
        let value = event.target.value
        setInsertRoomValue({...insertRoomValue,services:[...insertRoomValue.services,value]})
    }

    const insertRoom = () => {
        let endpoint = endpoints.filter(e => e.name === 'postRoom')[0]
        axios.post(endpoint.path,insertRoomValue)
        .then(res => window.location.reload(false))
    }

    const handleDiscountValues = (event) => {
        let name = event.target.name 
        let value = event.target.value 
        if(name !== undefined && value !== undefined) {
            setDiscountValues({...discountValues, [name]:value})
        }
    }

    const doDiscount = () => {
        let endpoint = endpoints.filter(e => e.name === "updateRoomPriceWithDiscount")[0]
        axios.put(endpoint.path+discountValues.roomId, {discount: discountValues.discount})
            .then(res => window.location.reload(false))
    }

    useEffect(() => {
        const getRooms = () => {
            let endpoint = endpoints.filter(e => e.name === 'getRooms')[0]
            axios.get(endpoint.path)
                .then(res => {
                    let roomIds = res.data.map(r => r.roomId)
                    setRoomIds(roomIds)
                })
        }

        getRooms()
    },[])

    const handleRoomPrice = (event) => {
        let name = event.target.name 
        let value = event.target.value 
        if(name !== undefined && value !== undefined) {
            setPriceValues({...priceValues,[name]:value})
        }
    }

    const changePrice = () => {
        let endpoint = endpoints.filter(e => e.name === 'updateRoomPrice')[0]
        axios.put(endpoint.path+priceValues.roomId,{price: priceValues.price})
             .then(res => window.location.reload(false))
        
    }

    return (
        <div className="container-fluid" id="insert-room-form">
            <div className="row">
                <div className="col-sm-4">
                <form className="form">
                        <h4 className="add-room-title">Change Room Price</h4>
                        <FormControl
                            fullWidth
                            style={{
                                margin: "5% auto 5% auto"
                            }}
                            onBlur={handleRoomPrice}
                            onChange={handleRoomPrice}
                            onClick={handleRoomPrice} 
                            >
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                room id
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                name: 'roomId',
                                id: 'uncontrolled-native'
                            }}>
                                    <option>Select...</option>
                                    {roomIds.map((r,i) => {
                                        return <option key={i} value={r}>{r}</option>
                                    })}
                            </NativeSelect>
                        </FormControl>
                        <TextField 
                            required
                            type="number"
                            name="price"
                            id="price"
                            label="price"
                            className="form-input"
                            onBlur={handleRoomPrice}
                            onChange={handleRoomPrice}
                            onClick={handleRoomPrice}
                        />
                        <div className="text-center">
                            <Button variant="contained" className="mt-5 register-btn" onClick={changePrice}>Update</Button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-4">
                    <form className="form">
                        <h4 className="add-room-title">Add Room</h4>
                        <TextField 
                            required
                            name="roomId"
                            id="roomId"
                            label="room id"
                            className="form-input"
                            onBlur={handleInsertRoomValues}
                            onChange={handleInsertRoomValues}
                            onClick={handleInsertRoomValues}
                        />
                        <FormControl
                            fullWidth
                            style={{
                                margin: "5% auto 5% auto"
                            }}
                            onBlur={handleInsertRoomValues}
                            onChange={handleInsertRoomValues}
                            onClick={handleInsertRoomValues} 
                            >
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
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
                        <TextField 
                            multiline
                            required
                            name="description"
                            id="description"
                            label="description"
                            className="form-input"
                            onBlur={handleInsertRoomValues}
                            onChange={handleInsertRoomValues}
                            onClick={handleInsertRoomValues}
                        />
                        <TextField 
                            required
                            type="number"
                            name="capacity"
                            id="capacity"
                            label="capacity"
                            className="form-input"
                            onBlur={handleInsertRoomValues}
                            onChange={handleInsertRoomValues}
                            onClick={handleInsertRoomValues}
                        />
                        <TextField 
                            required
                            type="number"
                            name="size"
                            id="size"
                            label="size"
                            className="form-input"
                            onBlur={handleInsertRoomValues}
                            onChange={handleInsertRoomValues}
                            onClick={handleInsertRoomValues}
                        />
                        <FormControl
                            fullWidth
                            style={{
                                margin: "5% auto 5% auto"
                            }}
                            onBlur={handleInsertRoomValues}
                            onChange={handleInsertRoomValues}
                            onClick={handleInsertRoomValues} 
                            >
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                availability
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                name: 'availability',
                                id: 'uncontrolled-native'
                            }}>
                                <option>Select...</option>
                                <option value="true">Available</option>
                                <option value="false">Unavailable</option>
                            </NativeSelect>
                        </FormControl>
                        <TextField 
                            required
                            type="number"
                            name="price"
                            id="price"
                            label="price"
                            className="form-input"
                            onBlur={handleInsertRoomValues}
                            onChange={handleInsertRoomValues}
                            onClick={handleInsertRoomValues}
                        />
                        <div className="container-fluid">
                            <div className="row">
                                <h4>Services</h4>
                                {roomServices.map((s,i) => (
                                    <div className="col-sm-4" key={i}>
                                        <FormControlLabel  control={<Checkbox onChange={handleServicesValues} value={s}/>} label={s} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5">
                            <input
                                accept="image/*"
                                style={{
                                    display: 'none'
                                }}
                                id="raised-button-file"
                                name="image"
                                multiple
                                onChange={handleInsertRoomValues}
                                onClick={handleInsertRoomValues}
                                type="file"/>
                            <label htmlFor="raised-button-file">
                                <Button variant="contained" component="span">
                                    Upload Image
                                </Button>
                            </label>    
                        </div>
                        <div className="text-center">
                            <Button variant="contained" className="mt-5 register-btn" onClick={insertRoom}>Insert</Button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-4">
                    <form className="form">
                        <h4 className="add-room-title">Discount</h4>
                        <FormControl
                            fullWidth
                            style={{
                                margin: "5% auto 5% auto"
                            }}
                            onBlur={handleDiscountValues}
                            onChange={handleDiscountValues}
                            onClick={handleDiscountValues} 
                            >
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                room id
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                name: 'roomId',
                                id: 'uncontrolled-native'
                            }}>
                                    <option>Select...</option>
                                    {roomIds.map((r,i) => {
                                        return <option key={i} value={r}>{r}</option>
                                    })}
                            </NativeSelect>
                        </FormControl>
                        <TextField 
                            required
                            type="number"
                            name="discount"
                            id="discount"
                            label="discount"
                            className="form-input"
                            onBlur={handleDiscountValues}
                            onChange={handleDiscountValues}
                            onClick={handleDiscountValues}
                        />
                        <div className="text-center">
                            <Button variant="contained" className="mt-5 register-btn" onClick={doDiscount}>Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminMain