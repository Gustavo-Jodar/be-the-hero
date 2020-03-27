import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'


export default function Logon(){
    const history = useHistory()
    const [id, setId] = useState('') 

    async function handleLogon(e){
        e.preventDefault()
        console.log(id)

        try{
            const response = await api.post('/session', { id })
            localStorage.setItem('ong_id', id)
            localStorage.setItem('ong_name', response.data.ong.name)

            console.log(response.data.ong.name)
            history.push('/profile')
        }catch(err){
            alert(`ID inválido!`)
        }

    }  


    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" />

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon:</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit" >Entrar</button>

                    <Link className="back-link" to="/register">
                    👉 Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}