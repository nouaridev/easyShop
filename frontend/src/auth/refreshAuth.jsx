import axios from "axios";
import Cookies from 'js-cookie'
import Loader from "../components/loader/loader";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/tokenContext";
import { useEffect, useState } from "react";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
export default function RefreshAuth(){
    const {auth , setAuth} = useAuth(); 
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        let refresh = async()=>{
            const ourToken = Cookies.get('Bearer');
            try {
                let res = await axios.post('http://127.0.0.1:8000/api/refresh' ,{},{
                    headers:{
                        Accept: 'application/json' ,
                        Authorization: 'Bearer '+ ourToken
                    }
                })
                if(res.status === 200){
                    setAuth({token: res.data.token , userDetails: res.data.user});
                    Cookies.set('Bearer' , res.data.token) ;
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }
        
        !auth || !auth.token? refresh() : setLoading(false)
    },[auth])

    return loading?<Loader></Loader>:<Outlet></Outlet>;
}