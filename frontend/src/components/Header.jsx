import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
export default function Header(){
    let [token , setToken] = useState(null) ;
    useEffect(()=>{
        if(window.localStorage.getItem('token')){
            setToken(window.localStorage.getItem('token'))
        }
    },[])

    const logOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem('token')
        setToken(null)
    }
    return (
        <div className="header">
            <div className="left">
                <img src="../../public/LOGO.png" alt="" />
            </div>
            <div className="links">
                <Link className="link">Home</Link>
                <Link className="link">about</Link>
                <Link className="link">cart</Link>
            </div>
            <div className="right">
                {!token && <><Link to={'/login'}>Login</Link>  <Link to={'/signup'}>SignUp</Link></>}  
                {token && <Link to={'/login'} className="logout" onClick={(e)=>{logOut(e)}}>logOut</Link>}
            </div>
        </div>
    );
}