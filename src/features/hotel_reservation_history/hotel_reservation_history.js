/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useEffect,useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import axios from 'axios';
import { endpoints } from '../../APIEndpoints';
import { hotelResHistoryCol } from './hotelResHistoryTableColumns';
import './hotel_reservation_history.css';

const HotelReservationHistory = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    
    if(login?.isAuth === true) {
        return <HotelReservationHistoryAuth />
    }else {
        return <UnAuthAccess />
    }
}

const HotelReservationHistoryAuth = () => {
    const [hotelResHistory, setHotelResHistory] = useState([{
        customerNotes: "",
        duration: 0,
        resDate: "",
        roomsIds: [],
        totalPrice: 0,
        name: "",
        surname:"",
    }])
    useEffect(() => {
        const getResHistoryOfHotel = () => {
            let endpoint = endpoints.filter(e => e.name === "getReservationHistoryOfHotel")[0]
            axios.get(endpoint.path)
                .then(res => {
                    let endpoint = endpoints.filter(e => e.name === "getCustomer")[0]
                    let resHistory = []
                    let reservations = res.data
                    reservations.map(r => {
                        axios.get(endpoint.path+r.userId)
                             .then(res => {
                                let customer = res.data
                                let {name,surname} = customer
                                let endpoint = endpoints.filter(e => e.name === 'getNotesAboutReservation')[0]
                                axios.get(endpoint.path+r.reservationId)
                                         .then(res => {
                                            let receptionistNotes = res.data
                                            let {receptionistId,text} = receptionistNotes
                                            resHistory.push({...r,name,surname,receptionistId,text})
                                            setHotelResHistory(resHistory)
                                         })
                                         .catch(err => {
                                            resHistory.push({...r,name,surname}) 
                                            setHotelResHistory(resHistory)
                                         })
                             })
                    })
                })
        }

        getResHistoryOfHotel()
    },[])
    return (
    <div className="container-fluid mt-3 mb-5">
        <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
                <h1 className="hotel-res-history-header">Hotel Reservation History</h1>
                <ResTable rows={hotelResHistory} columns={hotelResHistoryCol} />
            </div>
            <div className="col-sm-2"></div>
        </div>
    </div>)
}

const ResTable = ({rows,columns}) => {
    const [page,
        setPage] = React.useState(0);
    const [rowsPerPage,
        setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+ event.target.value);
        setPage(0);
    };

    return (
        <Paper
            sx={{
            width: '100%',
            overflow: 'hidden'
        }}>
            <TableContainer sx={{
                maxHeight: 440
            }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell
                                    key={i}
                                    align={column.align}
                                    style={{
                                    minWidth: column.minWidth
                                }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={Math.ceil(Math.random() * 100000)}>
                                        {columns.map((column, i) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={i} align={column.align}>
                                                    {column.format && (typeof value === 'number' || typeof value === 'boolean' || column.id === 'resDate')
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Paper>
    );
}

export default HotelReservationHistory