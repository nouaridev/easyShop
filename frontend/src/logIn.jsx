import './styles.css'
import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LogIn(){
    let [email , setEmail] = useState('' );
    let [pass , setPass] = useState('' );

    let [token , setToken] = useState('')
    useEffect(()=>{
        localStorage.setItem('token' , token)
    }, [token])

    const submit = async(e)=>{
        e.preventDefault() ; 
        console.log('ssssssss')
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/login', {     
                email , password: pass 
            }) ;    
            res = res.data.data ;
            setError({
                flag: false , 
                message: ''
            })
            if(res.status = 200){
                localStorage.setItem('token' , res.token)
                window.location.pathname='/'
            }
        } catch (err) {
            if(err.response.data.message){
                setError({
                    flag: true , 
                    message: err.response.data.message  
                })
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
                {error.flag && <p className='warningP'>{error.message}</p>}
                
                <div className="input-container">
                    <input type="password" value={pass} name="password"  onChange={(e)=>{setPass(e.target.value)}} required/>
                    <label htmlFor="password ">Password: </label>
                </div>

                <button type='submit'>login</button>

                <div>
                    <Link to={'/signup'}>
                        <p>you dont have an account? </p>
                    </Link>
                </div>
            </form>
        </div>
    )
}