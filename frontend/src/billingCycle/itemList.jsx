import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../common/layout/grid'
import labelAndInput from '../common/form/labelAndInput'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Input from '../common/form/input'
import If from '../common/operator/if'

class ItemList extends Component {
    
    add(index, item ={}){
       if(!this.props.readOnly){
           //arrayInsert foi extraido do framework do redux-form e neste caso, estamos utlizando
           //para que seja incluido mais um item dentro do array 'CREDITS', para que seja
           //atribuida uma nova linha quando clicado no botão (+) do formulario
           //No caso do item caso seja nulo criara uma linha com campos vazio ja que esta nulo
           //se tiver algum valor a linha sera um clone da ultima
           this.props.arrayInsert('billingCycleForm', this.props.field, index, item)
       }
    }
    
    remove(index){
        if(!this.props.readOnly && this.props.list.length > 1){            
            this.props.arrayRemove('billingCycleForm', this.props.field, index, index -1)            
        }
    }
    
    renderRows(){
        
        const list = this.props.list || []
       
        
        list.map((item, index) =>(             
            console.log('item',item.name,index) 
        ))
        
        return (
            list.map((item, index) =>(                                  
                <tr key={index}>
              <td>                  
                  <Field name={`${this.props.field}[${index}].name`} component={Input} 
                      placeholder='Informe o nome'
                      readOnly={this.props.readOnly}>
                  </Field>                  
              </td>
              <td>
                  <Field name={`${this.props.field}[${index}].value`} component={Input} 
                      placeholder='Informe o valor'
                      readOnly={this.props.readOnly}>
                  </Field>
              </td>   
                    <If test={this.props.showStatus}>
                        <td>
                            <Field name={`${this.props.field}[${index}].status`} component={Input} 
                                placeholder='Informe o status' readOnly={this.props.readOnly} />                             
                        </td> 
                    </If>    
             
                    
              <td>
                  <button type='button' className='btn btn-success'
                      onClick={()=> this.add(index +1)}>
                      <i className='fa fa-plus'></i>
                  </button>
                  
                  <button type='button' className='btn btn-warning'
                      onClick={()=> this.add(index +1, item)}>
                      <i className='fa fa-clone'></i>
                  </button>
                  
                  <button type='button' className='btn btn-danger'
                      onClick={()=> this.remove(index)}>
                      <i className='fa fa-trash-o'></i>
                  </button>
              </td>
        </tr>
                
            ))
        )
    }
    
    render()
    {
        return (
            <Grid cols={this.props.cols}>
                <fieldSet>
                    <legend>{this.props.legend}</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                
                                <If test={this.props.showStatus}>
                                    <th>Status</th>
                                </If>
                                
                                <th className='table-actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldSet>
            </Grid>
        )
    }
}

//injetando os metodos extraidos dos creator para o props do componente
const mapDispatchtoProps = dispatch => bindActionCreators({arrayInsert, arrayRemove}, dispatch)
export default connect(null,mapDispatchtoProps)(ItemList)