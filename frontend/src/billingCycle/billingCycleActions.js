import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

//inicilizando o estado do formulario com um array para garantir que o formulario vai exibir
//lista de creditos mesmo quano for incluir uma nova ação
//pois quando inicia o formulario de creidto e debito é um array regatado da base e, quando não tem
//ele força o usuario a informar um, apresentando um formulario abaixo!
const INITIAL_VALUES = { credits: [{}], debits: [{}]}

export function getList(){
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

//(values)valores capturado do form
export function create(values){
    return submit(values,'post')   
}

export function update(values){
    return submit(values,'put')   
}

export function remove(values){
    return submit(values,'delete')   
}

function submit(values, method){
     return dispatch => {    
         const id = values._id ? values._id : ''         
         axios[method](`${BASE_URL}/billingCycles/${id}`, values)
             .then(resp =>{
             toastr.success('Sucesso', 'Operação realizada com sucesso.')
             dispatch(init())
         })
             .catch(e=>{
             e.response.data.errors.forEach(error => toastr.error('Erro', error))
         })        
     }
}

export function showDelete(billingCycle){    
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]    
}
    
export function showUpdate(billingCycle){    
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        
        //inicializa o formulario (id, estado)
        initialize('billingCycleForm', billingCycle)
    ]    
}

export function init(){
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}