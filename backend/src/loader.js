const server = require('./config/server')
require('./config/database')

//confome mencionado no arquivo routes.js o server acima é passado ao parametro da funçao retornada de routes
require('./config/routes')(server)