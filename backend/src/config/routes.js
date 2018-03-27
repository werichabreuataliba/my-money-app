const express = require('express')
const auth = require('./auth')

//O server deste parametro é o server declarao em server.js
module.exports = function(server)
{    
    /*
    *Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    
    protectedApi.use(auth)
    
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')
    
    /*
    *Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    
    const AuthService = require('../api/user/AuthService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
    
  /*  //Definir URL base para todas as rotas
    const router = express.Router()    
    server.use('/api', router)    
    //Rgistrando as rotas relacionadas ao Ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles') */ 
}