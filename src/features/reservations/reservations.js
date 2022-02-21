/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {endpoints} from '../../APIEndpoints';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {setReservations} from './reservationsSlice';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {setRooms} from '../rooms/roomsSlice';
import {XCircleFill} from 'react-bootstrap-icons';
import TextField from '@material-ui/core/TextField';
import './reservations.css'

const Reservations = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <ReservationsAuth />
    } else {
        return <UnAuthAccess />
    }
}

const ReservationsAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const reservations = useSelector(state => state.reservations.value)

    useEffect(() => {
        const getAllReservationsOfHotel = () => {
            let endpoint = endpoints.filter(e => e.name === "getAllReservationsOfHotel")[0]
            axios.get(endpoint.path)
                .then(res => {
                    dispatch(setReservations(res.data))
                })
        }

        getAllReservationsOfHotel()
    },[])

    const goToCustomerDetails = (userId) => {
        navigate(`/customer/${userId}`)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <ul className="list-group list-group-flush">
                        {reservations.map((r,i) => (
                            <li className="list-group-item" key={i}>
                                <h2 className="res-header">Reservation for rooms:</h2>
                                <ul>
                                    {r.roomsIds.map((id,i) => (
                                        <li className="res-info" key={i}>{id}</li>
                                    ))}
                                </ul>
                                <p className="res-info"><span className="res-info-heading">Status:</span> {r.decision}</p>
                                <p className="res-info"><span className="res-info-heading">Reservation Date:</span> {r.resDate.slice(0,10)}</p>
                                <p className="res-info"><span className="res-info-heading">Reservation Days:</span> {r.duration} days</p>
                                <p className="res-info"><span className="res-info-heading">Total Price:</span> &#36;{r.totalPrice}</p>
                                <p className="res-info"><span className="res-info-heading">Customer Notes:</span> {r.customerNotes}</p>
                                <p onClick={() => goToCustomerDetails(r.userId)} className="customer-details-link">Customer details...</p>
                                {r.decision === 'pending' ? <ResButtons {...r} /> : ""}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    )
}

const ResButtons = ({reservationId,roomsIds}) => {

    const accept = (resId) => {
        let endpoint = endpoints.filter(e => e.name === 'updateReservationDecision')[0]
        axios.put(endpoint.path+resId,{decision: "accepted"})
        .then(res => window.location.reload(false))
    }

    const decline = (resId) => {
        let endpoint = endpoints.filter(e => e.name === 'updateReservationDecision')[0]
        axios.put(endpoint.path+resId,{decision: "declined"})
        .then(res => window.location.reload(false))
    }

    let login = JSON.parse(localStorage.getItem('login'))
    const [open, setOpen] = useState(false);
    const [roomValue, setRoomValue] = useState({})
    const [choice, setChoice] = useState("")
    const [notes, setNotes] = useState({
        reservationId: "",
        receptionistId: login.userId,
        text: "",
        date: new Date().toISOString()
    })
    const [fetchedNotes,setFetchedNotes] = useState({
        text: "",
        date: ""
    })
    const dispatch = useDispatch()

    const getReceptionistNotes = () => {
        let endpoint = endpoints.filter(e => e.name === 'getNotesAboutReservation')[0]
        axios.get(endpoint.path+reservationId)
            .then(res => setFetchedNotes(res.data))
    }
    
    const handleOpenNotes = (resId) => {
        getReceptionistNotes()
        setChoice("notes")
        setNotes({...notes, reservationId: resId})
        setOpen(true)
    }

    const handleOpen = () => {
        setChoice("")
        setOpen(true);
    }
    
    const handleClose = () => setOpen(false);

    let rooms = useSelector(state => state.rooms.value)

    const getRooms = () => {
        let endpoint = endpoints.filter(e => e.name === 'getRooms')[0]
        axios.get(endpoint.path)
            .then(res => dispatch(setRooms(res.data)))
    }

    useEffect(() => { 
        getRooms()
    },[])

    const handleRoomValue = (event) => {
        let name = event.target.name
        let value = event.target.value
        setRoomValue({...roomValue,[name]:value})
    }

    const upgradeRoom = () => {
        let endpoint = endpoints.filter(e => e.name === 'upgradeRoomReservation')[0]
        axios.put(endpoint.path+reservationId+"/"+roomValue.resRoomId,{roomId: roomValue.roomId})
            .then(res => window.location.reload(true))
    }

    const addNotes = () => {
        let endpoint = endpoints.filter(e => e.name === 'delNotesAboutReservation')[0]
        axios.delete(endpoint.path+reservationId)
            .finally(() => {
                let endpoint = endpoints.filter(e => e.name === 'postNotesAboutReservation')[0]
                axios.post(endpoint.path,notes)
                    .then(res => window.location.reload(false))
            })
        
    }

    const handleNotesValue = (event) => {
        let value = event.target.value
        setNotes({...notes,text: value})
    }

    return (
        <div className={login.category === 'administrator'? "res-buttons-admin mt-3" : "res-buttons-rec mt-3"}>
            <Button variant="contained" onClick={() => {accept(reservationId)}}>Accept</Button>
            <Button variant="contained" onClick={() => {decline(reservationId)}} color="error">Decline</Button>
            <Button variant="contained" onClick={() => handleOpenNotes(reservationId)} color="warning" color="secondary">Notes</Button>
            {login.category === 'administrator'?<Button variant="contained" color="warning" onClick={handleOpen}>Upgrade</Button>: ""}
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
                            {login.category === 'administrator' && choice !== "notes"?
                            <form className="form modal-form" method="post">
                                <div className="x-circle-box">
                                    <XCircleFill size={20} className="x-circle d-flex" onClick={handleClose}/>
                                </div>
                                <h2 className="modal-form-heading">Upgrade Room</h2>
                                <FormControl
                                    fullWidth
                                    style={{
                                        margin: "5% auto 5% auto"
                                    }}
                                    onBlur={handleRoomValue}
                                    onChange={handleRoomValue}
                                    onClick={handleRoomValue} 
                                >
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    reserved room
                                </InputLabel>
                                <NativeSelect
                                    inputProps={{
                                        name: 'resRoomId',
                                        id: 'uncontrolled-native'
                                    }}>
                                    <option>Select...</option>
                                    {roomsIds?.map((r,i) => {
                                        return <option key={i} value={r}>{r}</option>
                                    })}
                                </NativeSelect>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    style={{
                                        margin: "5% auto 5% auto"
                                    }}
                                    onBlur={handleRoomValue}
                                    onChange={handleRoomValue}
                                    onClick={handleRoomValue} 
                                >
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    room
                                </InputLabel>
                                <NativeSelect
                                    inputProps={{
                                        name: 'roomId',
                                        id: 'uncontrolled-native'
                                    }}>
                                    <option>Select...</option>
                                    {rooms.map((r,i) => {
                                        return <option key={i} value={r.roomId}>{r.roomId}</option>
                                    })}
                                </NativeSelect>
                                </FormControl>
                            <div className="text-center">
                                <Button onClick={upgradeRoom} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Update</Button>
                            </div>   
                            </form>
                            : <form className="form">
                                <div className="x-circle-box">
                                    <XCircleFill size={20} className="x-circle d-flex" onClick={handleClose}/>
                                </div>
                                {fetchedNotes?.text !== "" ? 
                                <div>
                                    <h2 className="modal-form-heading">Receptionist Notes</h2>
                                    <p>{fetchedNotes.text}</p>
                                    <p>{fetchedNotes.date.slice(0,10)} {fetchedNotes.date.slice(11,16)}</p>
                                </div>: ""}
                                {login.category === 'receptionist'?
                                <div>
                                    <h2 className="modal-form-heading">Add New Notes</h2>
                                    <TextField 
                                        required
                                        name="text"
                                        id="text"
                                        label="Notes"
                                        className="form-input"
                                        onBlur={handleNotesValue}
                                        onChange={handleNotesValue}
                                        onClick={handleNotesValue}
                                    />
                                    <div className="text-center mt-3">
                                        <Button onClick={addNotes} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Submit</Button>
                                    </div>  
                                </div>:""} 
                              </form>
                              }
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Reservations