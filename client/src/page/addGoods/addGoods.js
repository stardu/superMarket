import React from 'react';
import {  Icon, } from 'antd';
import GoodsForm from './goodsForm'

import './addGoods.scss'


export default class OrderList extends React.Component{
      state = {
          newOrder: 10000,
          newUser: 0,
          newAdmin: 0,
      }
      render(){
        return(
          <div className='addGoods'>
              <div className='addGoods-title'>
                <Icon type="shopping" style={{fontSize:18,paddingLeft:16}}/>
                <span>添加商品</span>
              </div>
              <div style={{
                  width:'50%',
                  marginLeft:'10%',
                  marginTop:'5%'
              }}>
                  <GoodsForm></GoodsForm>
              </div>
          </div>
        )
      }
}