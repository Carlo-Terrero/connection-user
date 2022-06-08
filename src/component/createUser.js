import React, {useState} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export const CreateUser = () => {

    const token = sessionStorage.getItem('Token');

    const headers = {headers: 
        {'Authorization': `Bearer  ${token}`}
    }

    const navigate = useNavigate();

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[telefono,setTelefono] = useState('');
    const[fechaNacimiento,setFechaNacimiento] = useState('');

    async function handleSubmit(e) {

        e.preventDefault();

        const cliente = {
            nombre: name,
            telefono: telefono,
            correo: email,
            fechaNacimiento: fechaNacimiento,
        }

        try{
            const response = await axios.post(`https://examen.avirato.com/client/post`, cliente, headers);
            alert(`usuario creado`);
            navigate('/client/getUsers');
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Crear Usuario</h1>

            <form onSubmit={handleSubmit}>

                <label>
                    <p>Nombre</p>
                    <input  type='tex' value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>

                <label>
                    <p>Email</p>
                    <input  type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>

                <label>
                    <p>telefono</p>
                    <input type='number' value={telefono} onChange={(e) => setTelefono(e.target.value)} required/>
                </label>

                <label>
                    <p>fechaNacimiento</p>
                    <input  type='text' value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required/>
                </label>
                
                <button className='btn' type="submit">Crear</button>
            </form>
        </div>
    )
}