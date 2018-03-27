import React, { Component } from 'react'

import axios from 'axios'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

const BASE_URL = 'http://localhost:3003/api'

export default class Dashboard2 extends Component {
    
    constructor(props){
        super(props)
        this.state = { credit: 0, debit:0 }
    }
    
    //Methodo que controla o ciclo de vida do redux(dipara logo na exibição da tela)
    componentWillMount(){
        axios.get(`${BASE_URL}/billingCycles/summary`)
        .then(resp => this.setState( resp.data))
    }
    
    render(){
        const {credit, debit} = this.state
        return (
            <div>
                
                <ContentHeader title='Dashboard' small='Versão 2.0'></ContentHeader>
                <Content>
                    <Row>
                    <ValueBox cols='12 4' color='green' icon='bank' 
                        value={`R$ ${credit}`} text='Total de Créditos'></ValueBox>
                    <ValueBox cols='12 4' color='red' icon='credit-card' 
                        value={`R$ ${debit}`} text='Total de Débitos'></ValueBox>
                    <ValueBox cols='12 4' color='blue' icon='money' 
                        value={`R$ ${credit-debit}`} text='Valor Consolidado'></ValueBox>
                    </Row>
                </Content>
            </div>
        )
    }
}