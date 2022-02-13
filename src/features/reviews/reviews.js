/**
 * @author Sotirios Karageorgopoulos
 */
import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {endpoints} from '../../APIEndpoints';
import {StarFill,Plus,XCircleFill} from 'react-bootstrap-icons';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {setReviews} from './reviewsSlice';
import Button from '@mui/material/Button';
import UnAuthAccess from '../unauthorized_access/unauthorized_access'
import Modal from '@mui/material/Modal';
import TextField from '@material-ui/core/TextField';
import uuid from 'react-uuid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import './reviews.css';

const Reviews = () => {
   let login = JSON.parse(localStorage.getItem('login'))
   if(login?.isAuth === true) {
       return <ReviewsAuth />
   }else {
       return <UnAuthAccess />
   }
}

const ReviewsAuth = () => {
    const reviews = useSelector(state => state.reviews.value)
    const dispatch = useDispatch()
    let login = JSON.parse(localStorage.getItem('login'))
    const [reviewId, setReviewId] = useState("")
    const [hasReview, setHasReview] = useState(false)

    useEffect(() => {
     const getReviews = () => {
         let endpoint = endpoints.filter(e => e.name === 'getReviews')[0]
         axios.get(endpoint.path)
              .then(res => {
                 return res.data
              })
              .then(data => {
                 let endpoint = endpoints.filter(e => e.name === 'getAllCustomers')[0]
                 axios.get(endpoint.path)
                      .then(res => {
                         let customers = res.data 
                         let rvs = []
                         data.map(r => {
                           let c = customers.filter(c => c.userId === r.userId)[0]
                           let name = c.name
                           let surname = c.surname
                           let image = c.image
                           let rv = {...r,name,surname,image}
                           rvs.push(rv)
                         })
                         dispatch(setReviews(rvs))
                         let r = rvs.filter(r => r.userId === login.userId)
                         console.log(r)
                         r.length === 1 ? setHasReview(true): setHasReview(false)
                     })
                })
     }
      
     getReviews()
    },[])
 
    const deleteReview = (reviewId) => {
         let endpoint = endpoints.filter(e => e.name === 'deleteReview')[0]
         axios.delete(endpoint.path+reviewId) 
         .then(res => window.location.reload(false))
    }
    const [open, setOpen] = useState(false);

    const handleOpenForUpd = (reviewId) => {
        setReviewId(reviewId)
        setOpen(true);
    }

    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);

    const [review, setReview] = useState({
        userId: login.userId,
        reviewId: uuid(),
        comment: "",
        rating: "",
        date: new Date().toISOString()
    });

    const addReview = () => {
        let endpoint = endpoints.filter(e => e.name === 'postReview')[0]
        axios.post(endpoint.path,review)
            .then(res => window.location.reload(false))
    }

    const handleReviewValues = (event) => {
        let name = event.target.name
        let value = event.target.value
        setReview({...review,[name]:value})
    }

    const updateReview = () => {
        let endpoint = endpoints.filter(e => e.name === 'updateReview')[0]
        console.log(endpoint.path+reviewId)
        axios.put(endpoint.path+reviewId,review)
        .then(res => window.location.reload(false))
    }
     
    return (
     <div className="container-fluid">
         <div className="row">
             <div className="col-sm-4"></div>
             <div className="col-sm-4">
                 <List sx={{ bgcolor: 'background.paper',padding: "2%" }}>
                     <h2 className="reviews-heading">Reviews</h2>
                     {login.category === 'customer' && hasReview !== true?<Button onClick={handleOpen} className="m-3" variant="contained" size="small"><Plus size={16}/>Add Review</Button>:""}
                     {reviews.map((r,i) => (
                         <div key={i}>
                             {r.userId === login.userId ? 
                             <div className="review-del-icon">
                                <DeleteIcon onClick={() => deleteReview(r.reviewId)}/>
                             </div>: "" }
                             <ListItem alignItems="flex-start">
                                 <ListItemAvatar>
                                     <Avatar alt={r.name+" "+r.surname} src={r.image} />
                                 </ListItemAvatar>
                                 <ListItemText
                                 className="reviews-list-item"
                                 primary={r.name+" "+r.surname}
                                 secondary={
                                     <React.Fragment>
                                     <Typography
                                         sx={{ display: 'inline' }}
                                         component="span"
                                         variant="body2"
                                         color="text.primary"
                                     >
                                         <div className="container-fluid mt-3">
                                             <p className="reviews-list-item">{[...Array(Number(r.rating))].map((r,i) => <StarFill className="rating-star" size={20} key={i}/>)}</p>
                                             <p className="reviews-list-item">{r.comment}</p>
                                             <p className="reviews-list-item">{r.date.slice(0,10)} {r.date.slice(11,16)}</p>
                                            {login.category === 'administrator'?<Button onClick={() => deleteReview(r.reviewId)} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                                 Delete
                                             </Button>:""}
                                            {login.userId === r.userId?<Button variant="contained" color="warning" onClick={() => handleOpenForUpd(r.reviewId)}>Update</Button>:""}
                                         </div>
                                     </Typography>
                                     </React.Fragment>
                                 }
                                 />
                             </ListItem>
                             <Divider variant="inset" component="li" />
                         </div>
                     ))}
                 </List>
                 <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">
                            <form className="form modal-form">
                                <div className="x-circle-box">
                                    <XCircleFill size={20} className="x-circle d-flex" onClick={handleClose}/>
                                </div>
                                <h2 className="modal-form-heading">Add Review</h2>
                                <FormControl
                                    fullWidth
                                    style={{
                                        margin: "5% auto 5% auto"
                                    }}
                                    onBlur={handleReviewValues}
                                    onChange={handleReviewValues}
                                    onClick={handleReviewValues} 
                                >
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    rating
                                </InputLabel>
                                <NativeSelect
                                    inputProps={{
                                        name: 'rating',
                                        id: 'uncontrolled-native'
                                    }}>
                                    <option>Select...</option>
                                    {[...Array(5)].map((r,i) => {
                                        return <option key={i} value={Number(i)+1}>{Number(i)+1}</option>
                                    })}
                                </NativeSelect>
                                </FormControl>
                                <TextField 
                                    multiline
                                    required
                                    name="comment"
                                    id="comment"
                                    label="comment"
                                    className="form-input"
                                    onBlur={handleReviewValues}
                                    onChange={handleReviewValues}
                                    onClick={handleReviewValues}
                                />
                                {reviewId === ""?
                                <div className="text-center mt-3">
                                    <Button onClick={addReview} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Submit</Button>
                                </div>:
                                <div className="text-center mt-3">
                                    <Button onClick={updateReview} size="small" variant="contained" className="mb-3 upd-room-details-modal-btn">Submit</Button>
                                </div>    
                                }            
                            </form>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
                 </Modal>
             </div>
             <div className="col-sm-4"></div>
         </div>
     </div>)
}


export default Reviews