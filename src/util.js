/**
 * @author Sotirios Karageorgopoulos
 */
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import React from 'react';

export const NavigationBtn = ({page,text}) => {
    const navigate = useNavigate()

    return (
        <div className="text-center mt-5 mb-3">
            <Button onClick={() => navigate(page)} size="small" variant="contained">{text}</Button>
        </div>
    )
}

export const toBase64String = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            let imgStr = reader.result.split(",")
            resolve(imgStr[1]) 
        }
        reader.onerror = (err) => reject(err)
    })
}