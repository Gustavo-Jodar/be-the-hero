const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
app.use(cors()) //se fosse em produção-> app.use(cors({origin:'https://meu_app.com'}))
app.use(express.json())//fala que o body que vai chegar será interpretado como json

app.use(routes)

app.listen(3333)