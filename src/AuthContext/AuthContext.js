import React, { createContext, useReducer, useState } from 'react';
export const AuthContext=createContext();
// Define the initial state for the reducer
const instialstate={
    isAuthenticated:false,
    user:{}
}
const reducer=(state,action)=>{
switch(action.type){
    case "LOGIN" :
    
        return{
            ...state,
            isAuthenticated:true,
        
        }
    
     case "LOGOUT":
        return{
            ...state,
            isAuthenticated:false,
            
            
        }
        default :return state
}}
export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, instialstate);
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [subject, setSubject] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [profilePic,setProfilepic]=useState(null)
    const [note,setNote]=useState([])

    
const id= Math.random().toString(36).slice(2)
    return (
        <AuthContext.Provider value={{id, note,setNote, user, setUser, email, setEmail, name, setName, password, setPassword, state, dispatch ,setProfilepic,profilePic,subject,setSubject,title,setTitle,description,setDescription}}>
            {children}
        </AuthContext.Provider>
    );
}

// Export the context and a hook for easy access
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};
