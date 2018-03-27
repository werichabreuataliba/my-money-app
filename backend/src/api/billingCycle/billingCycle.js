//requierindo o modulo restful da dependencia
const restful = require('node-restful')

//usar o mongoose do objeto noderestful
const mongoose = restful.mongoose

//Criando schemas(tabelas Credito/debito no mongoose)
const creditSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})

const debitSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    value: { type: Number, required: [true, 'Informe o valor do débito!'] },
    status : { type: String, required: false, uppercase:true, 
             enum: ['PAGO','PENDENTE','AGENDADO'] }
})

const billingCycleSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    month: { type: Number, min:1, max:12, required: true },
    year: {type: Number, min: 1970, max:2100, required: true },
    credits: [creditSchema],
    debits: [debitSchema]
    
})

//exportando modulo schema pra ser persisitdo no mongoDB
module.exports = restful.model('BillingCycle', billingCycleSchema)