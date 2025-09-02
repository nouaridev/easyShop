import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import FormInput from "./FormInput";

export default function EditUser(){
    let navigate = useNavigate() ;
    
    let {id} = useParams() ; 
    let {users , setUsers} = useOutletContext() ; 
    const [name , setName] = useState('');
    const [email , setEmail] = useState(''); 
    let [pass , setPass] = useState('' );
    let [rPass , setRPass] = useState('' );

    let [error , setError] = useState({
        flag : false , 
        message : ''
    })

    let [firstSubmit , setfirstSubmit] = useState(false)
    

    const [user ,setUser] = useState(null)


    useEffect(() => {
        // fetch user from API
        axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
        .then(res => {
            setUser(res.data[0])
        })

        .catch(err => console.error(err));
    }, [id]);

    useEffect(()=>{
        if(user){
            setEmail(user.email); 
            setName(user.name) ;
        }
    },[user])


    const updateUser = async(id , name , email ,pass , rpass)=>{
        setfirstSubmit(true) ; 
        if(pass.length < 8 || pass !== rPass){
            return 
        }
        try {
            let data = {name ,email ,password: pass , password_confirmation: rPass };
            let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}` , data)
            if(res.status == 200){
                let newUser = {...user , email , name }
                setUsers(users.map(e=>{return e.id==id?newUser:e})) ; 
                navigate(-1)
            }
        } catch (error) {
            console.log(error);
            if(error.response.data.message){
                setError({
                    flag: true , 
                    message: error.response.data.message 
                }) 
                return
            }
            setError({
                flag: true , 
                message: 'network err' 
            })
        }
    }
    let changeName = (e)=>{
         setName(e.target.value)
    }
    let changeEmail = (e)=>{
         setEmail(e.target.value)
    }
    let changePass = (e)=>{
         setPass(e.target.value)
    }
    let changeRpass = (e)=>{
         setRPass(e.target.value)
    }
    
    return<div className="edit-user">
                <div className="form-holder">
                    <form action="">
                        <h1>Edit User</h1>
                        <FormInput name={'name'} type={'text'} label={'user name' } placeholder={''} value={name} onChangee={(d)=>{changeName(d)}}></FormInput>
                        <FormInput name={'email'} type={'text'} label={'email' } placeholder={''} value={email} onChangee={(d)=>{changeEmail(d)}}></FormInput>
                            {error.flag && <p className='warningP'>{error.message}</p>}
                        <FormInput name={'pass'} type={'password'} label={'password' } placeholder={''} value={pass} onChangee={(d)=>{changePass(d)}}></FormInput>
                           {firstSubmit && pass.length<8 && <p className='warningP'>password must be more than 8 chars</p>}
                        <FormInput name={'rpass'} type={'password'} label={'repeat password' } placeholder={''} value={rPass} onChangee={(d)=>{changeRpass(d)}}></FormInput>
                            {firstSubmit && pass !== rPass && <p className='warningP'>passwords doesn't match</p>}
                        <div className="actions">
                            <div className="blueBtn" onClick={()=>{updateUser(id , name , email, pass, rPass)}}>Save</div>
                            <div className="blueBtn cancel" onClick={()=>{navigate(-1)}}>cancel</div>
                        </div>
                    </form>
                </div>
            </div>
}