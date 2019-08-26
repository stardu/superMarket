import React from 'react';
import {  Icon, } from 'antd';
import OrderForm from './orderForm'

import './addOrder.scss'


export default class OrderList extends React.Component{
      state = {
          newOrder: 10000,
          newUser: 0,
          newAdmin: 0,
      }
      render(){
        return(
          <div className='addOrder'>
              <div className='addOrder-title'>
                <Icon type="shopping" style={{fontSize:18,paddingLeft:16}}/>
                <span>添加订单</span>
              </div>
              <div style={{
                  width:'50%',
                  marginLeft:'10%',
                  marginTop:'5%'
              }}>
                  <OrderForm></OrderForm>
              </div>
          </div>
        )
      }
}