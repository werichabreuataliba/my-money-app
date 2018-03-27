//requisitando modulos das dependencias do mongoose
const mongoose = require('mongoose')

//Pegar API de Promisses do Node e atrbuindo ao objeto do mongoose
//Obs o mongoose esta deprecated e será descontinuado
mongoose.Promise = global.Promise 

//exportar a conexão do mongoDB
module.exports = mongoose.connect('mongodb://localhost/mymoney')

//Tratando erro do banco para camopos (required)
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."



