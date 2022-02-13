/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useEffect, useState} from 'react';
import {endpoints} from '../../APIEndpoints';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {resByDateCol, resByMonthCol, incomeByDateCol, cusByNationCol, mostDemandRoomsCol} from './tableColumns';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './statistics.css';

const Statistics = () => {
    let login = JSON.parse(localStorage.getItem('login'))

    if (login?.isAuth === true) {
        return <StatisticsAuth/>
    } else {
        return <UnAuthAccess/>
    }
}

const StatisticsAuth = () => {
    const [roomWithMaxRes,
        setRoomWithMaxRes] = useState({
        type: "",
        services: [],
        description: "",
        price: "",
        size: "",
        roomId: "",
        availability: false,
        image: "",
        capacity: ""
    })
    const [resByDate,
        setResByDate] = useState([
        {
            date: "",
            reservations: 0
        }
    ])
    const [resByMonth,
        setResByMonth] = useState([
        {
            month: "",
            reservations: 0
        }
    ])
    const [incomeByDate,
        setIncomeByDate] = useState([
        {
            date: "",
            totalIncome: 0
        }
    ])
    const [mostDemandRooms,
        setMostDemandRooms] = useState([
          {
            roomId: "",
            description: "",
          }
        ])
    const [cusByNation,
        setCusByNation] = useState([
        {
            people: 0,
            nationality: ""
        }
    ])
    const [rooms,
        setRooms] = useState(0)
    useEffect(() => {
        const getResByDate = () => {
            let endpoint = endpoints.filter(e => e.name === 'getReservationsByDate')[0]
            return axios.get(endpoint.path)
        }

        const getIncomeByDate = () => {
            let endpoint = endpoints.filter(e => e.name === 'getIncomeByDate')[0]
            return axios.get(endpoint.path)
        }

        const getReservationsByMonth = () => {
            let endpoint = endpoints.filter(e => e.name === 'getReservationsByMonth')[0]
            return axios.get(endpoint.path)
        }

        const getRoomWithMaxReservations = () => {
            let endpoint = endpoints.filter(e => e.name === 'getRoomWithMaxReservations')[0]
            return axios.get(endpoint.path)
        }

        const getNumberOfCustomersByNationality = () => {
            let endpoint = endpoints.filter(e => e.name === 'getNumberOfCustomersByNationality')[0]
            return axios.get(endpoint.path)
        }

        axios.all([getResByDate(), getIncomeByDate(), getReservationsByMonth(), getRoomWithMaxReservations(), getNumberOfCustomersByNationality()]).then(res => {
            setResByDate(res[0].data) //ok
            setIncomeByDate(res[1].data) //ok
            setResByMonth(res[2].data) //ok
            setRoomWithMaxRes(res[3].data)
            setCusByNation(res[4].data) //ok
        })
    }, [])

    const getMostDemandRooms = () => {
        let endpoint = endpoints.filter(e => e.name === 'getMostDemandRooms')[0]
        return axios
            .get(endpoint.path+rooms)
            .then(res => setMostDemandRooms(res.data))
    }

    const handleRooms = (event) => {
        let value = event.target.value
        setRooms(Number(value))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    <form className="form">
                        <h2 className="most-demand-rooms">Most Demand Rooms</h2>
                        <TextField
                            required
                            type="number"
                            name="rooms"
                            id="rooms"
                            label="rooms"
                            className="form-input"
                            onBlur={handleRooms}
                            onChange={handleRooms}
                            onClick={handleRooms}/>
                        <div className="text-center">
                            <Button
                                variant="contained"
                                className="mt-5 login-btn"
                                onClick={getMostDemandRooms}>Submit</Button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-6">
                    {mostDemandRooms[0].roomId !== ''
                        ?<><h1 className="statistics-table-header">Most Demand Rooms</h1> <StatisticsTable rows={mostDemandRooms} columns={mostDemandRoomsCol}/></>
                        : ""}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <h1 className="statistics-table-header">Income By Date</h1>
                    <StatisticsTable rows={incomeByDate} columns={incomeByDateCol}/>
                </div>
                <div className="col-sm-4">
                    <h1 className="statistics-table-header">Reservations By Date</h1>
                    <StatisticsTable rows={resByDate} columns={resByDateCol}/>
                </div>
                <div className="col-sm-4">
                    <h1 className="statistics-table-header">Reservations By Month</h1>
                    <StatisticsTable rows={resByMonth} columns={resByMonthCol}/>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-sm-4">
                    <h1 className="statistics-table-header">Customers By Nationality</h1>
                    <StatisticsTable rows={cusByNation} columns={cusByNationCol}/>
                </div>
                <div className="col-sm-4">
                    <h1 className="statistics-table-header">Room with Max Reservations</h1>
                    <div className="room-max-res-box">
                        <Card>
                            <CardMedia
                                component="img"
                                image={roomWithMaxRes.image}
                                alt={roomWithMaxRes.roomId}
                                height="300"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {roomWithMaxRes.roomId}
                                    {roomWithMaxRes.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <p
                                        className={Boolean(roomWithMaxRes.availability) === true
                                        ? "available-room"
                                        : "unavailable-room"}>{Boolean(roomWithMaxRes.availability) === true
                                            ? "Available"
                                            : "Unavailable"}</p>
                                    {roomWithMaxRes.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )
}

const StatisticsTable = ({rows, columns}) => {
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
                                                    {column.format && (typeof value === 'number' || typeof value === 'boolean')
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

export default Statistics