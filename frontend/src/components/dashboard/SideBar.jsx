import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function SideBar(){
    return <div className="side-bar"> 
        <Link to="/dashboard/users" className="item-link"><FontAwesomeIcon className='edt' icon={faUsers} />users</Link>
    </div>
}