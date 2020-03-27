import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'

import './styles.css'

export default function Profile(){
    const ong_name = localStorage.getItem('ong_name')
    const ong_id = localStorage.getItem('ong_id')
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('profile', {
        headers:{
            authorization:ong_id
        }
    }).then(response=>{setIncidents(response.data)})
    }, [ong_id])

    async function handleIncidentDelete(id){
    
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    authorization:ong_id
                }
            })
            alert(`Caso deletado com sucesso!`)
            
            setIncidents(incidents.filter(incident => incident.id !== id))
    
        }catch(err){
            alert(`Erro ao deletar, tente novamente`)
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }
    

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg}/>
                <span>Bem vindo, {ong_name}</span>
                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>Logout</button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident=>(
                <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.titulo}</p>
                    
                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

                <button type="button" onClick={()=>handleIncidentDelete(incident.id)} >Delete</button>
                </li>

                ))}
            </ul>

        </div>
    )
}