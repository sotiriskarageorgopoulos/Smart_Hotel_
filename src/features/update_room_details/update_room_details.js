/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {endpoints} from '../../APIEndpoints';
import {PencilSquare} from 'react-bootstrap-icons';
import Modal from '@mui/material/Modal';
import TextField from '@material-ui/core/TextField';
import {updateDetails} from './updateDetails';
import {XCircleFill,XSquareFill} from 'react-bootstrap-icons';
import {toBase64String} from '../../util';
import {roomTypes} from '../admin_main/roomTypes';
import {roomServices} from '../admin_main/roomServices';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import './update_room_details.css';

const UpdateRoomDetails = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <UpdateRoomDetailsAuth />
    }else {
        return <UnAuthAccess />
    }
}

const UpdateRoomDetailsAuth = () => {
    const [room,setRoom] = useState({
        availability: "",
        capacity: 0,
        description: "",
        image:"",
        price: 0,
        roomId: "",
        services:[],
        size: 0,
        type: ""
    })
    const [choice, setChoice] = useState("");
    const [open, setOpen] = useState(false);
    const [newValue, setNewValue] = useState({});

    const handleOpen = (choice) => {
        setChoice(choice)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    let path = window.location.pathname
    let roomId = path.split("/")[2]
    
    useEffect(() =>{
        const getRoomDetails = () => {
            let endpoint = endpoints.filter(e => e.name === "getRoom")[0]
            axios.get(endpoint.path+roomId)
                .then((res) => setRoom(res.data))
        }

        getRoomDetails()
    },[])

    const handleNewValue = (event) => {
        let name = event.target.name
        if(name === 'image') {
            let file = event.target.files[0]
            toBase64String(file)
            .then(image => {
                setNewValue({image})
            })
        }else {
            let value = event.target.value
            setNewValue({[name]:value})
        }
    }

    const updateRoomDetails = () => {
        let endpoint = endpoints.filter(e => e.name === 'updateRoomDetails')[0]
        setTimeout(() => setOpen(false),1000)
        axios.put(endpoint.path+roomId, newValue)
        .then(res => window.location.reload(false))
    }

    const deleteService = (service) => {
        let endpoint = endpoints.filter(e => e.name === 'deleteService')[0]
        axios.delete(endpoint.path+roomId+"/"+service)
        .then(res => window.location.reload(false))
    }

    const addService = () => {
        let endpoint = endpoints.filter(e => e.name === 'addService')[0]
        axios.post(endpoint.path+roomId,newValue)
        .then(res => window.location.reload(false))
    }

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
                <div className="upd-room-details-box">
                    <h2>Update Room Details</h2>
                    <img src={room.image} alt={room.roomId} className="upd-room-details-img"/>
                    <div class="text-center">
                        <Button size="small" variant="contained" className="mb-3" onClick={() => handleOpen("image")}>Update Image</Button>
                    </div>
                    <p><span className="upd-room-details-span">Room:</span> {room.roomId}</p>
                    <p><span className="upd-room-details-span">Price:</span> &#36;{room.price} <PencilSquare size={16} className="upd-pencil" onClick={()=> {handleOpen("price")}} /></p>
                    <p><span className="upd-room-details-span">Description: </span> {room.description} <PencilSquare size={16} className="upd-pencil" onClick={()=> {handleOpen("description")}} /></p>
                    <p><span className="upd-room-details-span">Capacity: </span> {room.capacity} <PencilSquare size={16} className="upd-pencil" onClick={()=> {handleOpen("capacity")}}/></p>
                    <p><span className="upd-room-details-span">Size:</span> {room.size} <PencilSquare size={16} className="upd-pencil" onClick={()=> {handleOpen("size")}}/></p>
                    <p><span className="upd-room-details-span">Type:</span> {room.type} <PencilSquare size={16} className="upd-pencil" onClick={()=> {handleOpen("type")}} /></p>
                    <ul>
                        <p><span className="upd-room-details-span">Services</span> <PencilSquare size={16} className="upd-pencil" onClick={()=> {handleOpen("service")}} /></p>
                        {room?.services?.map((s,i) => (
                            <li key={i}>{s} <XSquareFill className="x-square" onClick={() => deleteService(s)}/></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-sm-3"></div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="container-fluid">
               <div className="row">
                   <div className="col-sm-4"></div>
                   <div className="col-sm-4">
                       <form className="form modal-form">
                           <div className="x-circle-box">
                                <XCircleFill size={20} className="x-circle d-flex" onClick={handleClose}/>
                           </div>
                           {updateDetails.filter(d => d.choice === choice)
                                         .map((d,i) => {
                                          if(d.choice === 'image') {
                                            return (<div>
                                                        <h2 className="modal-form-heading">{d.header}</h2>
                                                        <input
                                                            accept="image/*"
                                                            style={{
                                                                display: 'none'
                                                            }}
                                                            id="raised-button-file"
                                                            name="image"
                                                            onClick={handleNewValue}
                                                            onChange={handleNewValue}
                                                            multiple
                                                            type="file"/>
                                                        <div className="text-center mt-3">
                                                            <label htmlFor="raised-button-file">
                                                                <Button size="small" variant="contained" component="span">
                                                                    Upload Image
                                                                </Button>
                                                            </label>  
                                                        </div>
                                                        <div className="text-center mt-3">
                                                            <Button onClick={updateRoomDetails} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Update</Button>
                                                        </div>  
                                                    </div>)
                                          }else if(d.choice === 'description') {
                                            return (<div>
                                                <h2 className="modal-form-heading">{d.header}</h2>
                                                <TextField 
                                                    multiline
                                                    required
                                                    name="description"
                                                    id="description"
                                                    onClick={handleNewValue}
                                                    onChange={handleNewValue}
                                                    onBlur={handleNewValue}
                                                    className="form-input mb-4"
                                                    label={d.labelName}
                                                />
                                                <div className="text-center">
                                                    <Button onClick={updateRoomDetails} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Update</Button>
                                                </div>
                                            </div>)
                                          } 
                                          else if (d.choice === 'type') {
                                            return  (<div>
                                                <FormControl
                                                    fullWidth
                                                    style={{
                                                        margin: "5% auto 5% auto"
                                                    }}
                                                    onBlur={handleNewValue}
                                                    onChange={handleNewValue}
                                                    onClick={handleNewValue} 
                                                    >
                                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                        type
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
                                                <div className="text-center">
                                                    <Button onClick={updateRoomDetails} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Update</Button>
                                                </div>
                                            </div>)
                                          }
                                          else if(d.choice === 'service') {
                                            return (
                                            <div>
                                                <FormControl
                                                    fullWidth
                                                    style={{
                                                        margin: "5% auto 5% auto"
                                                    }}
                                                    onBlur={handleNewValue}
                                                    onChange={handleNewValue}
                                                    onClick={handleNewValue} 
                                                    >
                                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                        {d.choice}
                                                    </InputLabel>
                                                    <NativeSelect
                                                        inputProps={{
                                                        name: 'service',
                                                        id: 'uncontrolled-native'
                                                    }}>
                                                            <option>Select...</option>
                                                            {roomServices.map((s,i) => {
                                                                return <option key={i} value={s}>{s}</option>
                                                            })}
                                                    </NativeSelect>
                                                </FormControl>
                                                <div className="text-center">
                                                    <Button onClick={addService} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Update</Button>
                                                </div>
                                            </div>)
                                          }
                                          else {
                                            return (<div>
                                                        <h2 className="modal-form-heading">{d.header}</h2>
                                                        <TextField 
                                                            required
                                                            name={d.choice}
                                                            id={d.choice}
                                                            onClick={handleNewValue}
                                                            onChange={handleNewValue}
                                                            onBlur={handleNewValue}
                                                            className="form-input mb-4"
                                                            label={d.labelName}
                                                        />
                                                        <div className="text-center">
                                                            <Button onClick={updateRoomDetails} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Update</Button>
                                                        </div>
                                                    </div>)
                                          }
                                         
                                         })
                            }
                       </form>
                   </div>
                   <div className="col-sm-4">
                   </div>
               </div>
            </div>
        </Modal>
    </div>)
}

export default UpdateRoomDetails