//Definir serviços Restful
const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')



//Provido pelo framework nodeexpress
BillingCycle.methods(['get','post','put','delete'])

//Necessario aplicar o metodo abaixo pois as validações sóa saõ aplicadas
//para o metodo post. Neste caso quando fro feito uma atualização do registro
//ele devolvera um response com o obejto em seu estado novo/alterado e tambem validara os campos
//comodeclarados em seu Schema
BillingCycle.updateOptions({ new: true, runValidators: true })

//Aplicando middleware(errorHandler) para interceptar as reuisições antes e depois
BillingCycle.after('post', errorHandler).after('put', errorHandler)

//registrando count (método passado por agumento) método que é provido pelo mongo
BillingCycle.route('count', (req, res, next) => {
    //Método count() é disponibilizado pelo mongo
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({errors:[error]})
        } else {
            res.json({value})
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
        $project: { credit: { $sum: "$credits.value" }, debit: { $sum: "$debits.value" } }
    },{
        //o comando group o mongo exije que o atributo _id seja setado
        $group: {_id: null, credit: {$sum: "$credit"}, debit:{ $sum:"$debit" }}
    },{
        $project: { _id: 0, credit: 1, debit: 1 }        
    },
    (error, result)=> {
        if(error){
            res.status(500).json({errors: [error]})
        }
        else{
            res.json(result[0] || { credit: 0, debit: 0 })
        }
    })
})

module.exports = BillingCycle

