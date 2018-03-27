//Relembrando middlewares usam o conceito de chain of responsability vc precisa ficar encaixando um 
//middlewares atras do outro pra fazer parte do processo de requisição

const port = 3003     

//middleware que intercepta requisição
const bodyParser = require('body-parser')
const express = require('express')
const server = express()

//CORS sigifica cross origin resource sharing, é um middleware que previne o erro de cross-origin
const allowCors = require('./cors')
                             
const queryParser = require('express-query-int')

//como não há parametro antes da instancia do bodyparser significa que todas as requisições serão chamadas por esse midlleware
server.use(bodyParser.urlencoded({ extended: true }))

//aplicar midlleware tmabem quando a requisição for json
server.use(bodyParser.json())

//Adicionando middleware ao componente server
//server.use(allowCors)

//Adicionando middleware ao componente server
server.use(queryParser)
console.log(req.query);

//Declarar listener que indica quando startado servidor
server.listen(port, function(){
    console.log('Olá Mundo!')
    console.log('QueryParser=> '+ queryParser)
    console.log('BACKEND is running on port caralho ==> ' + port)    
})


module.exports = server



