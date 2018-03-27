const port = 3003

const bodyParser = require('body-parser')//middleware que intercepta requisição
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
server.use(allowCors)

//Adicionando middleware ao componente server
server.use(queryParser())

//Declarar listener que indica quando startado servidor
server.listen(port, function(){
    console.log('BACKEND is running on port ==> ' + port)
})

/*

const bodyParser = require('body-parser') 
const express = require('express') 
const server = express() 
const allowCors = require('./cors') 
const queryParser = require('express-query-int')
server.use(bodyParser.urlencoded({ extended: true })) 
server.use(bodyParser.json()) 
server.use(allowCors) 
server.use(queryParser())
server.listen(port, function() {     
    console.log(`BACKEND is running on port ${port}.`) })
module.exports = server*/

module.exports = server



