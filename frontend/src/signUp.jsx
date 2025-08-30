 import {  useState } from 'react';
 import './styles.css'
import axios from 'axios';


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
            console.log(res)
        } catch (err) {
            if(err.response.data.message){
                setError({
                    flag: true , 
                    message: err.response.data.message 
                })
            }
           
        }
        
    }

    return (
        <div className='signUpFormHolder'>
            <form action="" className='signUpForm' onSubmit={submit}>

                <label htmlFor="name">Name:</label>
                <input type="text" value={name} name="name" placeholder='enter ur name' onChange={(e)=>{setName(e.target.value)}} />
                {firstSubmit && name === "" && <p className='warningP'>username is required</p>}

                <label htmlFor="email">Email:</label>
                <input type="email" value={email} name="email" placeholder='enter ur email' onChange={(e)=>{setEmail(e.target.value)}} required/>

                <label htmlFor="password ">Password: </label>
                <input type="password" value={pass} name="password" placeholder='enter ur password' onChange={(e)=>{setPass(e.target.value)}} required/>
                {firstSubmit && pass.length<8 && <p className='warningP'>password must be more than 8 chars</p>}

                <label htmlFor="password ">Repeat password: </label>
                <input type="password" value={rPass} name="password" placeholder='rewrite the password'onChange={(e)=>{setRPass(e.target.value)}} required/>
                {firstSubmit && pass !== rPass && <p className='warningP'>passwords doesn't match</p>}
                
                <button type='submit' >Register</button>
                {error.flag && <p className='warningP'>{error.message}</p>}

            </form>
        </div>
    )
 }                    