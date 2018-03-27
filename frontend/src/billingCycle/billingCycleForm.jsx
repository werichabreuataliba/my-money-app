import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import  { connect } from 'react-redux'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from './billingCycleActions'

import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {
    
    calculateSummary()
    {
        const sum = (t, v) => t + v
        
        //array de objetos se transforma em um array de numeros e é reduzido a um unico numero
        //this.props.credits.map(c => +c.value || 0).reduce(sum)
        
        return{
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebits: this.props.debits.map(d => +d.value || 0).reduce(sum)
        }
    }
    
    render(){
        
        const { handleSubmit, readOnly, credits, debits } = this.props
        const { sumOfCredits, sumOfDebits } = this.calculateSummary()
        
        return(
             <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='month' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Mês' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o ano' />
                    
                    <Summary credit={sumOfCredits} debit={sumOfDebits} />
                    
                    <ItemList cols='12 6' list={credits} readOnly={readOnly}
                        field='credits' legend='Créditos' />
                    <ItemList cols='12 6' list={debits} readOnly={readOnly}
                        field='debits' legend='Débitos' showStatus={true} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
    
}

//atribui aqo redux-for o id deste formualrio que sera exportado como componente
//destroyOnUnmount define que o formulario não sera destruido a cada requisição
BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount:false})(BillingCycleForm)

//informar o id do fomrulario para o metodo, formulario que sera procurado o valor qeu deseja tratar
const selector = formValueSelector('billingCycleForm')

//o selector vai obter o estado como parametro e extrai o nome do atributo do estato
const mapStateToProps = state => ({ credits: selector(state, 'credits'), debits: selector(state,'debits')})

//o reulatdo da função acima é o array de credito que foi extraido do estado
//Em resumo isso é necessario para resgatar atributos especificos da lista que esta armazenada no estado
const mapDisptachToProps = dispatch => bindActionCreators({init}, dispatch)

export default connect(mapStateToProps, mapDisptachToProps)(BillingCycleForm)