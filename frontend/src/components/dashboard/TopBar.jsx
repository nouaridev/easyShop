import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";

export default function TopBar(){
    return(
        <div className="top-bar">
            <div className="d-flex container  p20 ">
                <h1>Easy Shop</h1>
                <Link to={'/'} className="register-nav blueBtn"><FontAwesomeIcon icon={faEarthAmericas} /> Go To Web Site</Link>
            </div>
        </div>
    )   
}