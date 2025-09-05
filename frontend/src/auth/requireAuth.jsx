import { Navigate, Outlet, redirect, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/tokenContext";
import { useEffect ,useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import Loader from "../components/loader/loader";

export default function RequireAuth(){
    const {auth , setAuth} = useAuth(); 
    let location = useLocation() ; 

    return auth?.token ?  <Outlet></Outlet>:<Navigate state={{from: location}} to='/login'></Navigate> ;  
}