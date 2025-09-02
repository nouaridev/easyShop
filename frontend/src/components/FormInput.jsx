import { useEffect } from "react";

export default function FormInput(prop){
    const {name ,type ,label ,placeholder , value , onChangee}= prop; 
    return <div className="input-group">
               <input type={type} name={name}  value={value} placeholder={placeholder} onChange={(e)=>{
                    onChangee(e) ; 
                }}/>
                <label htmlFor={name}>{label}</label>
          </div>
}