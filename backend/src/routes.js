const express = require('express')
const routes = express.Router()
const crypto = require('crypto')
const connection = require('./connections')

//rotas -----------------------------------------------------

//escreve no back-end uma nova tabela (ongs)
routes.post('/ongs', async (resquest , response)=> {

    const {name, email , whatsapp, city, uf} = resquest.body
    const id = crypto.randomBytes(4).toString('HEX')
    
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    }) 

    return response.json({id})
})

//escreve no back-end uma nova tabela (lista de incidents)
routes.post('/incidents', async (request, response)=>{
    const {titulo, description, value} = request.body

    const ong_id = request.headers.authorization //pega o id da ong logada pelo header

    const [id] = await connection('incidents').insert({
        titulo,
        description,
        value,
        ong_id,
    })

    return response.json({ id })
})

//lista as ongs criadas
routes.get('/ongs', async (resquest, response)=>{
    const ongs = await connection('ongs').select('*')

    return response.json(ongs)
})


//lista todos os incidents criados com paginação
//na url : http://localhost:3333/incidents?page=1
routes.get('/incidents', async (request, response)=>{
    const {page=1} = request.query

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //join com a tabela ongs onde ongs_id = incidents.ong_id
    .limit(5)
    .offset((page - 1)*5)
    .select(['incidents.*',
    'ongs.name',
    'ongs.email',
    'ongs.whatsapp',
    'ongs.city',
    'ongs.uf'])

    response.header('x-total-count', count['count(*)'])

    return response.json(incidents)
})

//lista os incidents criados pela ong específica
routes.get('/profile', async (request, response)=>{
    ong_id = request.headers.authorization
    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*')

    return response.json(incidents)
})

//deleta um incident
routes.delete('/incidents/:id', async (request, response)=>{
    const { id } = request.params //pega o id do incident na url
    const ong_id = request.headers.authorization //pega o id da ong logada pelo header

    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first()

    if(incident.ong_id != ong_id){
        return response.status(401).json({error: 'Sem altorizacao!'})
    }

    await connection('incidents').where('id', id).delete()
    return response.status(204).send()

})

//cria uma session para a ong
routes.post('/session', async (request, response)=>{
    const {id} = request.body
    const ong = await connection('ongs')
    .where('id',id)
    .select('name')
    .first()
    if(!ong){
        return response.json({error:'No ong found whith this id'})
    }
    return response.json({ong})
     
})




module.exports = routes