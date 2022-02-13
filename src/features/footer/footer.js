/**
 * @author Sotirios Karageorgopoulos
 */
import './footer.css';
import React from 'react'
import { TelephoneFill, EnvelopeFill, Facebook, Twitter, Instagram} from 'react-bootstrap-icons'

const Footer = () => {
    const goToPage = (url) => {
        window.open(url,'_blank')
    }

    return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4">
                <div className="hotel-address">
                    <h3>Address</h3>
                    <address>
                        Lanikai Beach
                        Kailua, HI 96734, United States
                    </address>
                    <a href="tel:361637167136713">
                        <div className="d-flex">
                            <TelephoneFill size={20} />&nbsp;&nbsp;361637167136713
                        </div>
                    </a>
                    <a href="mailto:smarthotel@domain.com">
                        <div className="d-flex">
                            <EnvelopeFill size={20} />&nbsp;&nbsp;smarthotel@domain.com
                        </div>    
                    </a>
                </div>
            </div>
            <div className="col-sm-4">
                <p className="text-center text-light">&copy; Copyright {new Date().getFullYear()}</p>
            </div>
            <div className="col-sm-4">
                <div className="social-media-style">
                    <div className="d-flex justify-content-between">
                        <Facebook size={30} className="social-media-icon" onClick={() => goToPage('https://www.facebook.com/')}/>
                        <Twitter size={30} className="social-media-icon" onClick={() => goToPage('https://twitter.com/')}/>
                        <Instagram size={30} className="social-media-icon" onClick={() => goToPage('https://www.instagram.com/')}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer