/**
 * @author Sotirios Karageorgopoulos
 */
import React,{useEffect} from 'react'
import Reservations from '../reservations/reservations'
import UnAuthAccess from '../unauthorized_access/unauthorized_access'
import axios from 'axios'
import {endpoints} from '../../APIEndpoints'

const ReceptionistMain = () => {
    useEffect(() => {
        const checkAvailabilityOfRooms = () => {
            let endpoint = endpoints.filter(e => e.name === 'checkAvailabilityOfRooms')[0]
            axios.put(endpoint.path)
        }

        checkAvailabilityOfRooms()
    },[])
    
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <Reservations />
    }else {
        return <UnAuthAccess />
    }
    
}

export default ReceptionistMain