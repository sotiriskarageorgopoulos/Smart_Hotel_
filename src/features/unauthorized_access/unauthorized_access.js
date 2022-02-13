/**
 * @author Sotirios Karageorgopoulos
 */
import {React} from 'react';
import {ExclamationCircle} from 'react-bootstrap-icons';

const UnAuthAccess = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <p className="access-denied"><ExclamationCircle size={50}/> Access Denied!!!</p>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )
}

export default UnAuthAccess