import React, {useState} from 'react'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'

export default function Register(){
    const [name, setName] = useState('') //vai guardar strings por isso o ('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e){
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        console.log(data)

        
        try{
            const response = await api.post('ongs', data)
            
            alert(`Sua ID é: ${response.data.id}`)
            
            history.push('/')

        }catch(err){
            alert(`Erro no cadatro, tente novamente!`)
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                <Link className="back-link" to="/register">
                    👉 Não tenho cadastro
                    </Link>

                </section>
            <form onSubmit={handleRegister}>
                <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}//escuta as mudanças aí pega o evento de mudança e seta o name com o valor do input (nome) 
                ></input>
                
                <input 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                ></input>
                
                <input 
                placeholder="Whatsapp"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                ></input>
                
                <div className="input-group">
                    <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        ></input>
                    <input 
                        placeholder="UF"
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        style={{width:80}}></input>
                </div>
                <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>

        </div>
        
        
    )
}