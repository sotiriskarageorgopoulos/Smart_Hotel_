/**
 * @author Sotirios Karageorgopoulos
*/
import React, {useEffect,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@mui/icons-material/Send';
import {useDispatch,useSelector} from 'react-redux';
import {setChat} from './chatSlice';
import {CheckCircle, CheckCircleFill} from 'react-bootstrap-icons';
import axios from 'axios';
import {endpoints} from '../../APIEndpoints';
import UnAuthAccess from '../unauthorized_access/unauthorized_access'
import './chat.css';

const Chat = () => {
    let login = JSON.parse(localStorage.getItem('login'))
    if(login?.isAuth === true) {
        return <ChatAuth login={login} />
    } else {
        return <UnAuthAccess />
    }
}

export const ChatAuth = ({login}) => {
    const chat = useSelector(state => state.chat.value)
    let path = window.location.pathname
    let senderId = path.split("/")[2]

    const [sender,setSender] = useState({
        name: "",
        surname: ""
    })

    const [message,setMessage] = useState({
        senderId: login?.userId,
        receiverId: senderId,
        date: new Date().toISOString(),
        isRead: false,
        text: ""
    })

    useEffect(() => {
        const getChatDetails = () => {   
            let endpoint = endpoints.filter(e => e.name === 'updIsReadMessages')[0]
            axios.put(endpoint.path+login?.userId+"/"+senderId)
                 .then(res => {
                    let endpoint = endpoints.filter(e => e.name === 'getMessages')[0]
                    axios.get(endpoint.path+login?.userId+"/"+senderId)
                         .then(res => res.data)
                         .then((data) => {
                             axios.get(endpoint.path+senderId+"/"+login?.userId)
                                 .then((res) => {
                                    let endpoint = endpoints.filter(e => e.name === 'getCustomer')[0]
                                    axios.get(endpoint.path+senderId)
                                        .then(res => {
                                            let {name,surname} = res.data
                                            setSender({name,surname})
                                        })
                                    dispatch(setChat([...data,...res.data].sort((d1,d2) => new Date(d1.date) - new Date(d2.date))))
                                 })
                         })
                 })
        }

        getChatDetails()
    },[])

    const dispatch = useDispatch()

    const sendMessage = () => {
        let endpoint = endpoints.filter(e => e.name === 'sendMessage')[0]
        dispatch(setChat([...chat,message]))
        axios.post(endpoint.path,message)
        document.getElementsByName("message")[0].value = ""
    }

    const handleMessageValue = (event) => {
        let value = event.target.value;
        setMessage({...message,text: value})
    }

    return (
    <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 chat">
                <h2 className="chat-header">Chat</h2>
                <div className="container-fluid">
                        {
                        chat.map((c,i) => {
                           if(c.senderId === login?.userId) {
                            return (<div className="row mt-3" key={i}>
                                        <div className="col-sm-5">
                                            <div>
                                                <p className="sender">You</p>
                                                <div className="message">
                                                    <p>{c.text}</p>
                                                    <p className="message-date">{c.date.slice(0,10)} {c.date.slice(11,16)}</p>
                                                    {c.isRead === true ? <CheckCircleFill size={11} /> : <CheckCircle size={11} />} <span className="is-read-chat-style">{c.isRead === true ? "Seen": "Not Seen"}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-5"></div>
                                    </div>)
                           }else if(c.senderId === senderId) {
                            return (<div className="row mt-3" key={i}>
                                        <div className="col-sm-5"></div>
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-5">
                                            <div>
                                                <p className="sender">{sender.name+" "+sender.surname}</p>
                                                <div className="message">
                                                    <p>{c.text}</p>
                                                    <p className="message-date">{c.date.slice(0,10)} {c.date.slice(11,16)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                           }else {
                               return (<div key={i}></div>)
                           }
                        })}
                    <div className="row">
                        <div className="container-fluid">
                            <div className="row mt-5">
                                <div className="col-sm-10">
                                <TextField 
                                    required
                                    multiline
                                    type="text"
                                    name="message"
                                    id="message"
                                    className="message-input"
                                    onClick={handleMessageValue}
                                    onChange={handleMessageValue}
                                    onBlur={handleMessageValue}
                                />
                                </div>
                                <div className="col-sm-2">
                                    <SendIcon onClick={sendMessage} className="send-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="col-sm-2"></div>
        </div>
    </div>
    )
}

export default Chat