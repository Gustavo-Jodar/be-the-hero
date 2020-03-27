import React, {useState} from 'react'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

export default function NewIncident(){
    const history = useHistory()
    const [titulo, setTitulo] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState()
    const ong_id = localStorage.getItem('ong_id')

    async function handleCreateIncident(e){
        e.preventDefault()
        const data = {
            titulo,
            description,
            value,
        }

        try{
            await api.post('incidents', data, {
                headers:{
                    authorization : ong_id
            }
            })
            history.push('/profile')

        }catch(err){
            alert(`Não foi possível criar o incidente, tente novamente!`)
        }


    }


    return(
        <div className="new-incident">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the hero"/>
            <h1>Cadastrar novo caso</h1>
            <p>Descreve o caso detalhadamente para encontrar um herói para resolver isso.</p>
            
            <Link className="back-link" to="/profile">
                👉 Voltar para home
                </Link>

            </section>
        <form onSubmit={handleCreateIncident}>
            <input 
            placeholder="Título do caso"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            ></input>
            <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
            <input 
            placeholder="Valor em reais"
            value = {value}
            onChange = {e=>setValue(e.target.value)}
            ></input>

            <div className="input-group">
                <input placeholder="Cidade"></input>
                <input placeholder="UF" style={{width:80}}></input>
            </div>
            <button className="button" type="submit">Cadastrar</button>

            </form>
        </div>

    </div>
    )
}