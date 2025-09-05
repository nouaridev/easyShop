import {useContext, useState, createContext} from 'react'; 

    export const tokenContext = createContext(null) ; 

    export const useAuth = ()=>{
        return useContext(tokenContext) ; 
    }
 

    export default function AuthProvider({children}){
        const [auth ,setAuth] = useState(null)
    
        return <tokenContext.Provider value={{auth ,setAuth}}>
            {children}
        </tokenContext.Provider>
    }