/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState,useEffect} from 'react';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import TextField from '@material-ui/core/TextField';
import {useSelector} from 'react-redux';
import uuid from 'react-uuid';
import Button from '@mui/material/Button';
import axios from 'axios';
import {endpoints} from '../../APIEndpoints';
import './customer_reservation.css';

const CustomerReservation = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <CustomerReservationAuth />
    }else {
        return <UnAuthAccess />
    }
}

export const CustomerReservationAuth = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    let rooms = useSelector(state => state.customerRes.value)
    const [totalPrice, setTotalPrice] = useState(0)
    const [customerBonus, setCustomerBonus] = useState(0)
    const [nowCusBonus, setNowCusBonus] = useState(0)

    const [reservation, setReservation] = useState({
        customerNotes: "",
        decision: "pending",
        duration: 1,
        resDate: "",
        roomsIds: rooms.map(r => r.roomId),
        totalPrice: 0,
        userId: login?.userId,
        reservationId: uuid()
    })

    useEffect(() => {
        const getCustomerBonus = () => {
            let endpoint = endpoints.filter(e => e.name === 'getCustomerBonus')[0]
            axios.get(endpoint.path+login?.userId)
                .then(res => setCustomerBonus(res.data.bonusPoints))
        }

        getCustomerBonus()
    },[])

    const handleResValue = (event) => {
        let name = event.target.name
        let value = event.target.value
        if(name === "duration") {
            let totalPrice = 0
            let duration = value
            rooms.map(r => totalPrice += Number(duration) * Number(r.price))
            setNowCusBonus(customerBonus+totalPrice)
            if(customerBonus+totalPrice > 1000) {
                let newPrice = totalPrice-(totalPrice*0.1)
                setTotalPrice(newPrice)
                setReservation({...reservation,[name]: value,totalPrice: newPrice})
            }else {
                setTotalPrice(totalPrice)
                setReservation({...reservation,[name]: value, totalPrice})
            }
        }else {
            setReservation({...reservation, [name]: value})
        }
    }

    const makeReservation = () => {
        let endpoint = endpoints.filter(e => e.name === 'doReservation')[0]
        axios.post(endpoint.path,reservation)
            .then(res => {
                let endpoint = endpoints.filter(e => e.name === 'updateCustomerBonus')[0]
                if(nowCusBonus < 1000){
                    axios.put(endpoint.path+login.userId,{bonusPoints: nowCusBonus})
                    .then(res => window.location.reload(false))
                }else {
                    axios.put(endpoint.path+login.userId,{bonusPoints: nowCusBonus - 1000})
                    .then(res => window.location.reload(false))
                }
            })
    }

    return (<div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <form className="form">
                            <h2 className="cus-res-header">Make Reservation</h2>
                            <TextField 
                                disabled
                                required
                                type="text"
                                name="reservationId"
                                id="id"
                                label="id"
                                defaultValue={reservation.reservationId}
                            />
                            <TextField 
                                required
                                type="datetime-local"
                                name="resDate"
                                id="date"
                                label="date"
                                className="form-input"
                                onClick={handleResValue}
                                onBlur={handleResValue}
                                onChange={handleResValue}
                            />
                            <TextField 
                                required
                                type="number"
                                name="duration"
                                id="days"
                                label="days"
                                className="form-input"
                                onClick={handleResValue}
                                onBlur={handleResValue}
                                onChange={handleResValue}
                            />
                            <TextField 
                                required
                                multiline
                                name="customerNotes"
                                id="notes"
                                label="notes"
                                className="form-input"
                                onClick={handleResValue}
                                onBlur={handleResValue}
                                onChange={handleResValue}
                            />
                            {rooms.length > 0 ?
                            <ul>
                                <h2 className="rooms-cus-res-header">Rooms</h2>
                                {rooms.map((r,i) => (
                                    <li className="cus-res-room-ids" key={i}>Room {r.roomId}</li>
                                ))}
                            </ul>: ""}
                            <p className="cus-res-bonus-points">Bonus Points: {nowCusBonus.toLocaleString("de-DE")}</p>
                            {nowCusBonus > 1000? <p className="cus-res-discount">Discount: 10%</p>: ""}
                            {totalPrice !== 0 ?<p className="cus-res-total-price">Total Price: &#36;{totalPrice.toLocaleString("de-DE")}</p>: ""}
                            <div className="text-center">
                                <Button size="small" variant="contained" className="mt-5" onClick={makeReservation}>Submit</Button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>)
}

export default CustomerReservation