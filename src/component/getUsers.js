import axios from 'axios';
import React, {useEffect, useState} from 'react';

import { NavLink,useNavigate } from "react-router-dom";


export const GetUsers = () => {

    const token = sessionStorage.getItem('Token');

    const headers = {headers: 
        {'Authorization': `Bearer  ${token}`}
    }

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [buscador, setBuscador] = useState('');

    async function getUserApi(){
        const response = await axios.get(`https://examen.avirato.com/client/get`,headers);
        setUsers(response.data);
    }

    useEffect(() =>{
        getUserApi();
    },[])

    const hancleCreate = () => {
        NavLink('/client/post');
    }

    const handleEditUser = (id) => {
        //NavLink(`/client/get/one/${id}`)
        navigate(`/client/get/one/${id}`)
    }

    async function handleDelete(date) {
        try {
            const response = await axios.delete(`https://examen.avirato.com/client/delete/${date}`,headers);
            alert('Usuario eliminado');
            getUserApi();
        
        } catch (error) {
            console.error(error)
        }

    }

    const handlebuscar = async () => {

        try {
            const response = await axios.get(`https://examen.avirato.com/client/get/search?search=${buscador}`,headers);
            //trabaja ahi
            if(!response.data.length){
               alert('No hay concidencias encontradas')
               return;
            }
            setUsers(response.data)
        
        } catch (error) {
            console.error(error)
        }

    }

    return(
        
        <div className='gestion-container'>
            <h1>Gestor de Usuarios</h1>

            <NavLink className='createUser' to={`/client/post`}>Crear Usuario</NavLink>

            <label className='buscador'>
                <p>Flitrar:</p>
                <input type='text' value={buscador} onChange={(e) => setBuscador(e.target.value)} required></input>
                <button className='btn' onClick={() => handlebuscar(buscador)}> Buscar</button>
                <button className='btn' onClick={() => {getUserApi(); setBuscador('')}}> Limpiar</button>
            </label>
            
               
            {users.map((user,i) =>
                <div className='contain-user' key={i} >
                    <div onClick={() => handleEditUser(user.id)}>
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