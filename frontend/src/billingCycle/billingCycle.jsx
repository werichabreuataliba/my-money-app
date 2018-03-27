import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsContent from '../common/tab/tabsContent'
import TabsHeader from '../common/tab/tabsHeader'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
//import { selectTab, showTabs } from '../common/tab/tabActions'
import { init, create, update, remove } from './billingCycleActions'

import List from './billingCycleList'
import Form from './billingCycleForm'

class BillingCycle extends Component {
    
    componentWillMount()
    {
        this.props.init()
        //this.props.selectTab('tabList')
        //this.props.showTabs('tabList','tabCreate')
    }
    
    render(){
        return (
            <div>
                <ContentHeader title='Ciclos de Pagamentos' small='Cadastro'></ContentHeader>
                <Content>
                    
                    <Tabs>                    
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList'></TabHeader>
                            <TabHeader label='Incluir' icon='plus' target='tabCreate'></TabHeader>
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate'></TabHeader>
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete'></TabHeader>
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <List></List>
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create}
                                    submitLabel='Incluir' submitClass='primary'></Form>
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.update}
                                    submitLabel='Alterar' submitClass='info'></Form>
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form onSubmit={this.props.remove} readOnly={true}
                                    submitLabel='Excluir' submitClass='danger'></Form>
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                    
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
      create, update, remove, init}, dispatch)
//    selectTab, showTabs, create, update, remove, init}, dispatch)
export default connect(null,mapDispatchToProps)(BillingCycle)
