import {  useState ,useEffect} from 'react';
import '../styles.css'
import axios from 'axios';
import { Link } from 'react-router-dom';




 export default function SignUp(){
    let [name , setName] = useState('' );
    let [email , setEmail] = useState('' );
    let [pass , setPass] = useState('' );
    let [rPass , setRPass] = useState('' );

    let [error , setError] = useState({
        flag : false , 
        message : ''
    })

    let [firstSubmit , setfirstSubmit] = useState(false)
    



    const submit = async(e)=>{
        setfirstSubmit(true)
        e.preventDefault() ; 
       
        if(name === '' || pass.length < 8 || rPass != pass){
            return
        }

      
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/register', {     
                name , email , password: pass , password_confirmation: rPass 
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
                return
            }
            setError({
                flag: true , 
                message: 'network err' 
            })
        }
        
    }

    return (
        <div className='FormHolder'>
            <form action="" className='Form' onSubmit={submit}>
                <header>
                    <h2>Sign UP</h2>
                </header>
                <div className="input-container">
                    <input type="text" value={name} name="name"  onChange={(e)=>{setName(e.target.value)}} />
                    <label htmlFor="name">Name:</label>
                </div>
            
                {firstSubmit && name === "" && <p className='warningP'>username is required</p>}

                <div className="input-container">
                   <input type="email" value={email} name="email"  onChange={(e)=>{setEmail(e.target.value)}} required/>
                   <label htmlFor="email">Email:</label>
                </div>
                {error.flag && <p className='warningP'>{error.message}</p>}

                <div className="input-container">
                    <input type="password" value={pass} name="password"  onChange={(e)=>{setPass(e.target.value)}} required/>
                    <label htmlFor="password ">Password: </label>
                </div>
                {firstSubmit && pass.length<8 && <p className='warningP'>password must be more than 8 chars</p>}
                
                <div className="input-container">
                    <input type="password" value={rPass} name="password" onChange={(e)=>{setRPass(e.target.value)}} required/>
                    <label htmlFor="password ">Repeat password: </label>
                </div>
                {firstSubmit && pass !== rPass && <p className='warningP'>passwords doesn't match</p>}
                
                <button type='submit' >Register</button>

                <div>
                    <Link to={'/login'}>
                        <p>do you have an account ? </p>
                    </Link>
                </div>

            </form>
        </div>
    )
 }                    