import React from 'react'

import Header from '../common/template/header' 
import SideBar from '../common/template/sidebar'
import Footer from '../common/template/footer'
import Dashboard from '../dashboard/dashboard' 
import Dashboard2 from '../dashboard2/dashboard2' 
import BillingCycle from '../billingCycle/billingCycle'
import Messages from '../common/msg/messages'

export default props => (     
    <div className='wrapper'>        
        <Header></Header>
        <SideBar></SideBar>
        <div className='content-wrapper'>
            {props.children}
        </div>
        <Footer></Footer>
        <Messages></Messages>
    </div> 
)
