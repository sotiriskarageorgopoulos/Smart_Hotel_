/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {ExclamationCircle} from 'react-bootstrap-icons'
import './error404.css'

const Error404 = () => {
    return (<div className="container-fluid error-404-container">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <div className="error-box">
                            <p className="text-center">Error 404</p>
                            <p className="text-center"><ExclamationCircle/>  Page Not Found</p>
                            <Link to="/" className="error-link">Go to home page</Link>
                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>)
}

export default Error404