import axios from 'axios';
import React, {useEffect, useState} from 'react';

import { NavLink } from "react-router-dom";

export const GetUsers = () => {

    const token = sessionStorage.getItem('Token');

    const headers = {headers: 
        {'Authorization': `Bearer  ${token}`}
    }

    const [users, setUsers] = useState([]);

    async function getUserApi(){
        const response = await axios.get(`https://examen.avirato.com/client/get`,headers);
        console.log(response.data);
        setUsers(response.data);
    }

    useEffect(() =>{
        getUserApi();
    },[])

    const hancleCreate = () => {
        NavLink('/client/post');
    }

    const handleUser = (date) => {
        NavLink(`/client/get/one/${date}`)
    }

    async function handleDelete(date) {
        console.log(`${date}`)
        try {
            const response = await axios.delete(`https://examen.avirato.com/client/delete/${date}`,headers);
        
        } catch (error) {
            console.error(error)
        }

    }

    return(
        
        <div className='gestion-container'>
            <h1>Gesto de Usuarios</h1>

            <NavLink className='createUser' to={`/client/post`}>Crear User</NavLink>
               
            {users.map((user,i) =>
                <div className='contain-user' key={i} >
                    <div onClick={() => handleUser(user.id)}>
                        <p>{user.id}  </p>
                        <p>{user.nombre}</p>
                        <p>{user.correo}</p>
                        <p>{user.telefono}</p>
                        <p>{user.fechaNacimiento}</p>
                    </div>                    
                    <button className='btn-delete' onClick={() => handleDelete(user.id)}>Eliminar</button>
                    
                </div> 

            )}
        </div>
    )
}