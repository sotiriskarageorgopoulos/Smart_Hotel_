/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useEffect, useState} from 'react';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import {endpoints} from '../../APIEndpoints';
import Button from '@mui/material/Button';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';
import './reservation_history.css';

const ReservationHistory = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <ReservationHistoryAuth />
    } else {
        return <UnAuthAccess />
    }
}

const ReservationPDF = ({reservation}) => {
    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexFlow: 'column nowrap',
            backgroundColor: '#dae2ec',
            padding: '2%'
        },
        smartHotelHeader: {
            textAlign: 'center',
            color: '#497eab',
            fontSize: '30px',
            marginBottom: '5%'
        },
        detailsHeader: {
            fontSize: '25px',
            marginBottom: '3%'
        },
        infoBox: {
            backgroundColor: '#59abf3',
            padding: '2%',
            borderRadius: '10%',
            color: '#fff',
            fontSize: '15px',
            marginBottom: '5%'
        },
        infoLabel: {
            textDecoration: 'underline'
        },
        info: {
            padding: '2%',
        }
    })

    let login = JSON.parse(localStorage.getItem('login'))

    return (<Document title="Reservation">
                <Page size="A4" style={styles.page}>
                    <View>
                        <Text style={styles.smartHotelHeader}>Smart Hotel</Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.detailsHeader}>Personal Details</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Name:</Text> {login.name}</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Surname:</Text> {login.surname}</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Email:</Text> {login.email}</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Tel:</Text> {login.tel}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.detailsHeader}>Reservation Details</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Reservation Id:</Text> {reservation.reservationId}</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Days:</Text> {reservation.duration}</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Rooms:</Text> {reservation.roomsIds.join()}</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Reservation Date:</Text> {reservation.resDate.slice(0,10)} {reservation.resDate.slice(11,16)}</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Total Price:</Text> &#36;{reservation.totalPrice.toLocaleString("de-DE")}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.detailsHeader}>Contact Us</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Address:</Text> Lanikai Beach Kailua, HI 96734, United States</Text>
                            <Text style={styles.info}><Text style={styles.infoLabel}>Tel:</Text> 361637167136713</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        )
}

const ReservationHistoryAuth = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    const [reservations, setReservations] = useState([
        {
            customerNotes: "",
            decision: "pending",
            duration: 1,
            resDate: "",
            roomsIds: [],
            totalPrice: 0,
            userId: login.userId,
            reservationId: ""
        }
    ])
    useEffect(() => {
        const getReservationsOfCustomer = () => {
            let endpoint = endpoints.filter(e => e.name === 'getReservationsOfCustomer')[0]
            axios.get(endpoint.path+login.userId)
                .then(res => setReservations(res.data))
        }

        getReservationsOfCustomer()
    },[])

    const cancelRes = (resId) => {
        let endpoint = endpoints.filter(e => e.name === 'cancelReservation')[0]
        axios.delete(endpoint.path+resId)
            .then(res => window.location.reload(false))
    }

    return (<div className="container-fluid res-history-container">
        <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
                <ul className="list-group list-group-flush">
                    {reservations.map((r,i) =>(
                        <li className="list-group-item" key={i}>
                            <p className="res-history-p">Reservation Id: {r.reservationId}</p>
                            <p className="res-history-p">Reservation Date: {r.resDate.slice(0,10)} {r.resDate.slice(11,16)}</p>
                            <p className="res-history-p">Days: {r.duration}</p>
                            <h2 className="res-history-rooms-header">Rooms</h2>
                            <ul>
                            {r.roomsIds.map(rid=> (
                                <li className="res-history-p" key={rid}>{rid}</li>
                            ))}
                            </ul>
                            <p className="res-history-p">Total Price: &#36;{r.totalPrice.toLocaleString("de-DE")}</p>
                            <div className="res-history-btns">
                                <PDFDownloadLink className="pdf-link" document={<ReservationPDF reservation={r} />} fileName={"res"+r.reservationId+".pdf"}>
                                    <Button size="small" variant="contained" className="mt-3">
                                        download pdf
                                    </Button>
                                </PDFDownloadLink>
                                {r.resDate.slice(0,10) >= new Date().toISOString().slice(0,10)?
                                <Button size="small" variant="contained" className="mt-3" color="error" onClick={() => cancelRes(r.reservationId)}>cancel</Button>
                                :""}
                            </div>
                            
                        </li>
                    ))}
                     
                </ul>
            </div>
            <div className="col-sm-2"></div>
        </div>
    </div>)
}

export default ReservationHistory