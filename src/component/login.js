import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {

    const [email, setEmail] = useState('carlosjose2111@gmail.com');
    const [pass, setPass] = useState('629228654');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(`https://examen.avirato.com/auth/login`,{email: email, password: pass});
            const token =  response.data.access_token
            sessionStorage.setItem('Token', token)            
            navigate('/client/getUsers')
        
        }catch(error){
            alert(error)
        }            
    }


    return( 
        
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <label>
                    <p>Email</p>
                    <input className='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>

                <label>
                    <p>PassWord</p>
                    <input className='pass' type='password' value={pass} onChange={(e) => setPass(e.target.value)} required/>
                </label>
                
                <button className='btn' type="submit">Submit</button>
            </form>
        </div>
        
    );
};
