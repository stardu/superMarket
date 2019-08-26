import React from 'react';
import { Icon, } from 'antd';
import GoodsForm from './goodsForm'

import './editGoods.scss'


export default class editGoods extends React.Component {
    state = {
        newOrder: 10000,
        newUser: 0,
        newAdmin: 0,
    }
    render() {
        return ( <
            div className = 'editGoods' >
            <
            div className = 'addGoods-title' >
            <
            Icon type = "shopping"
            style = {
                { fontSize: 18, paddingLeft: 16 }
            }
            /> <
            span > 编辑商品 < /span> < /
            div > <
            div style = {
                {
                    width: '50%',
                    marginLeft: '10%',
                    marginTop: '5%'
                }
            } >
            <
            GoodsForm {...this.props } > < /GoodsForm> < /
            div > <
            /div>
        )
    }
}