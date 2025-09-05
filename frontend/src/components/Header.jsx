import { Link } from "react-router-dom";
import { useAuth } from "../contexts/tokenContext";
import Cookies from 'js-cookie'
import axios from "axios";
export default function Header(){
    const {auth ,setAuth} = useAuth();
    const HandleLogOut = (e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/logout' , {},{
            headers:{
                Authorization: 'Bearer '+auth.token 
            }
        }).then(res=>{
            if(res.status == 200){
                setAuth(null);
                Cookies.remove('Bearer') 
            }
        }).catch(err=>{
            
        })
    
    }
    return (
        <div className="header">
            <div className="links">
                <Link className="link">Home</Link>
                <Link className="link">about</Link>
                <Link className="link">cart</Link>
            </div>
            <div className="right">
                {(!auth || !auth.token) ? <><Link to={'/login'}>Login</Link>  <Link to={'/signup'}>SignUp</Link><Link to={'/dashboard'}>Dashboard</Link></> : <><Link to={'/login'} className="logout" onClick={(e)=>{HandleLogOut(e)}}>logOut</Link><Link to={'/dashboard'}>Dashboard</Link></>}
            </div>
        </div>
    );
}