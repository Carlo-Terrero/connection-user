import React,{useState, useEffect} from 'react';

import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";

export const GetOneUser = () => {
    const token = sessionStorage.getItem('Token');

    const headers = {headers: 
        {'Authorization': `Bearer  ${token}`}
    }

    const navigate = useNavigate();
    const {id} = useParams();

    const [user, setUser] = useState('');
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[telefono,setTelefono] = useState('');
    const[fechaNacimiento,setFechaNacimiento] = useState('');
    const [ idUser, setIdeUser] = useState('')

    async function handleSubmit(e) {

        e.preventDefault();

        const cliente = {
            nombre: name,
            telefono: telefono,
            correo: email,
            fechaNacimiento: fechaNacimiento,
            id: idUser
        }

        try{
            const response = await axios.put(`https://examen.avirato.com/client/put`, cliente,headers );
            alert(`Usuario Editado`);
            navigate('/client/getUsers');
        }catch(error){
            console.log(error);
        }
    }

    async function getOneUserApi(){
        const response = await axios.get(`https://examen.avirato.com/client/get/one/${id}`,headers);
        setFechaNacimiento(response.data.fechaNacimiento)
        setTelefono(response.data.telefono);
        setEmail(response.data.correo);
        setName(response.data.nombre);
        setIdeUser(response.data.id);
    }

    useEffect(() =>{
        getOneUserApi();
    },[])

    
    return(
        <div>
            <h1>Editar Usuario</h1>

            <form onSubmit={handleSubmit}>

                <label>
                    <p>Id</p>
                    <input  type='tex' value={idUser} onChange={(e) => setIdeUser(e.target.value)} required/>
                </label>

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
                
                <button className='btn' type="submit">Editar</button>
            </form>
        </div>
    )
    
}