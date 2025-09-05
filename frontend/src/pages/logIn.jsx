import '../styles.css'
import {  useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useAuth } from '../contexts/tokenContext';



export default function LogIn(){
    const navigate = useNavigate() ;
    const location = useLocation() ;
    const stateFrom = location.state?.from || null ; 
    const from = location.state?.from?.pathname || '/' ; 

    let [email , setEmail] = useState('' );
    let [pass , setPass] = useState('' );

    let [token , setToken] = useState('')
    useEffect(()=>{
        localStorage.setItem('token' , token)
    }, [token])

    const {auth , setAuth} = useAuth() ; 
    const submit = async(e)=>{
        e.preventDefault() ; 
        try { 
            let res = await axios.post('http://127.0.0.1:8000/api/login', {     
                email , password: pass 
            }) ;    
            setError({
                flag: false , 
                message: ''
            })
            if(res.status == 200){
                res = res.data.data ;
                setAuth(prev=>{ return {token: res.token, userDetails: res.user}}); 
                Cookies.set('Bearer' ,res.token)
                navigate(from  , {replace : true})
            }
        } catch (err) {
            console.log(err)
            if(err.response?.status === 401){
                setError(
                    {
                        flag: true , 
                        message: 'Wrong email or password!'
                    }
                )
                return ;
            }
            setError({
                flag: true , 
                message: 'unchecked error'
            })
        }
    }

    let [error , setError] = useState({
        flag : false , 
        message : ''
    })


    return(
          <div className='FormHolder'>
            <form action="" className='Form' onSubmit={submit}>
                <header>
                    <h2>Log In</h2>
                </header>
                <div className="input-container">
                    <input type="email" value={email} name="email"  onChange={(e)=>{setEmail(e.target.value)}} required/>
                    <label htmlFor="email">Email:</label>
                </div>
                
                <div className="input-container">
                    <input type="password" value={pass} name="password"  onChange={(e)=>{setPass(e.target.value)}} required/>
                    <label htmlFor="password ">Password: </label>
                </div>
                {error.flag && <p className='warningP'>{error.message}</p>}

                <button type='submit'>login</button>

                <div>
                    <Link to={'/signup'} state={{from : stateFrom?stateFrom:location}}>
                        <p>you dont have an account? </p>
                    </Link>
                </div>
            </form>
        </div>
    )
}