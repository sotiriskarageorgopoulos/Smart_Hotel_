/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState,useEffect} from 'react';
import UnAuthAccess from '../unauthorized_access/unauthorized_access';
import {endpoints} from '../../APIEndpoints';
import {PencilSquare} from 'react-bootstrap-icons';
import {toBase64String} from '../../util';
import Button from '@mui/material/Button';
import {countries} from '../../countries';
import {profileDetailsForm} from './profileDetailsForm';
import TextField from '@material-ui/core/TextField';
import {XCircleFill} from 'react-bootstrap-icons';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {setProfileDetails} from './profileDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './profile.css';

const Profile = () => {
   const login = JSON.parse(localStorage.getItem('login'))
   
   if(login?.isAuth === true) {
      return <ProfileAuth login={login}/>
   }else {
      return <UnAuthAccess />
   }
}

const ProfileAuth = ({login}) => {
    const [open, setOpen] = useState(false);
    const [choice, setChoice] = useState("");
    const [newValue, setNewValue] = useState({})
    const dispatch = useDispatch();
    let profileDetails = useSelector(state => state.profileDetails.value)

    const handleOpen = (choice) => {
        setOpen(true); 
        setChoice(choice)
    }
    const handleClose = () => setOpen(false);

    const updateProfileDetails = () => {
        let endpoint = endpoints.filter(e => e.name === 'updateProfileDetails')[0]
        
        axios.put(endpoint.path+login.userId,newValue)
            .then(res =>{
                window.location.reload(false)
            })
    }

    useEffect(() => {
        const getUserDetails = () => {
            let endpoint = endpoints.filter(e => e.name === 'getUser')[0]
            axios.get(endpoint.path+login.userId)
                    .then(res => {
                        console.log(res.data)
                        dispatch(setProfileDetails(res.data))
                    })
        }

        getUserDetails()
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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="profile-details-box">
                            <h2 className="profile-details-title">Profile Details</h2>
                            <Avatar
                                alt={profileDetails?.name+" "+profileDetails?.surname}
                                src={profileDetails?.image}
                                className="profile-image"
                                sx={{ width: 220, height: 200 }}
                            />
                            <div className="text-center">
                                <Button size="small" variant="contained" className="mb-3"  onClick={() => handleOpen('image')}>Update Image</Button>
                            </div>
                            <p className="profile-info-p"><span className="profile-info-span">Name:</span> {profileDetails?.name} <PencilSquare size={16} className="upd-pencil" onClick={() => handleOpen("name")}/></p>
                            <p className="profile-info-p"><span className="profile-info-span">Surname:</span> {profileDetails?.surname} <PencilSquare size={16} className="upd-pencil" onClick={() => handleOpen("surname")} /></p>
                            <p className="profile-info-p"><span className="profile-info-span">Email:</span> {profileDetails?.email} <PencilSquare size={16} className="upd-pencil" onClick={() => handleOpen("email")} /></p>
                            <p className="profile-info-p"><span className="profile-info-span">Tel:</span> {profileDetails?.tel} <PencilSquare size={16} className="upd-pencil" onClick={() => handleOpen("tel")} /></p>
                            <p className="profile-info-p"><span className="profile-info-span">Password:</span> {profileDetails?.password} <PencilSquare size={16} className="upd-pencil" onClick={() => handleOpen("password")} /></p>
                            <p className="profile-info-p"><span className="profile-info-span">Birth Date:</span> {profileDetails?.birthDate.slice(0,10)} <PencilSquare size={16} className="upd-pencil" onClick={() => handleOpen("birthDate")} /></p>
                            {profileDetails?.category === 'customer'? <p className="profile-info-p"><span className="profile-info-span">Nationality:</span> {profileDetails?.nationality} <PencilSquare size={16} className="upd-pencil" onClick={() => handleOpen("nationality")} /></p>: ""}
                            {profileDetails?.category === 'customer'? <p className="profile-info-p"><span className="profile-info-span">Blacklisted:</span> {Boolean(profileDetails?.blacklisted) === true? "Blacklisted" : "Not Blacklisted"}</p>: ""}
                            {profileDetails?.category === 'customer'? <p className="profile-info-p"><span className="profile-info-span">Bonus Points:</span> {profileDetails?.bonusPoints}</p> :""}
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
                                            {profileDetailsForm
                                            .filter(p => p.choice === choice)
                                            .map((p,i) => {
                                                if(p.choice === 'image') {
                                                    return (
                                                        <div key={i}>
                                                        <h2 className="modal-form-heading">{p.header}</h2>
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
                                                            <Button onClick={updateProfileDetails} size="small" variant="contained" className="mb-3 upd-profile-modal-btn ">Update</Button>
                                                        </div>  
                                                    </div>
                                                    )
                                                }else if(p.choice === 'nationality') {
                                                    return (
                                                        <div key={i}>
                                                            <h2 className="modal-form-heading">{p.header}</h2>
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
                                                                    {p.labelName}
                                                                </InputLabel>
                                                                <NativeSelect
                                                                    inputProps={{
                                                                    name: 'nationality',
                                                                    id: 'uncontrolled-native'
                                                                }}>
                                                                        <option>Select...</option>
                                                                        {countries.map((c,i) => {
                                                                            return <option key={i} value={c}>{c}</option>
                                                                        })}
                                                                </NativeSelect>
                                                            </FormControl>
                                                            <div className="text-center">
                                                                <Button onClick={updateProfileDetails} size="small" variant="contained" className="mb-3 upd-profile-modal-btn">Update</Button>
                                                            </div>
                                                        </div>)
                                                }else if(p.choice === 'birthDate') {
                                                    return (
                                                        <div key={i}>
                                                            <h2 className="modal-form-heading">{p.header}</h2>
                                                            <TextField 
                                                                required
                                                                type="datetime-local"
                                                                name={p.choice}
                                                                id={p.choice}
                                                                onClick={handleNewValue}
                                                                onChange={handleNewValue}
                                                                onBlur={handleNewValue}
                                                                className="form-input mb-4"
                                                                label={p.labelName}
                                                            />
                                                            <div className="text-center">
                                                                <Button onClick={updateProfileDetails} size="small" variant="contained" className="mb-3 upd-profile-modal-btn">Update</Button>
                                                            </div>
                                                        </div>
                                                    ) 
                                                }else {
                                                    return (
                                                        <div key={i}>
                                                            <h2 className="modal-form-heading">{p.header}</h2>
                                                            <TextField 
                                                                required
                                                                type="text"
                                                                name={p.choice}
                                                                id={p.choice}
                                                                onClick={handleNewValue}
                                                                onChange={handleNewValue}
                                                                onBlur={handleNewValue}
                                                                className="form-input mb-4"
                                                                label={p.labelName}
                                                            />
                                                            <div className="text-center">
                                                                <Button onClick={updateProfileDetails} size="small" variant="contained" className="mb-3 upd-profile-modal-btn ">Update</Button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                            }
                                            </form>
                                        </div>
                                        <div className="col-sm-4"></div>
                                    </div>
                                </div>
                            </Modal>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>)
}

export default Profile