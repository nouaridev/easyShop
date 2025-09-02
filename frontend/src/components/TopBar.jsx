import { Link } from "react-router-dom"

export default function TopBar(){
    return(
        <div className="top-bar">
            <div className="d-flex container  p20 ">
                <h1>Easy Shop</h1>
                <Link className="register-nav blueBtn">Go To Web Site</Link>
            </div>
        </div>
    )   
}