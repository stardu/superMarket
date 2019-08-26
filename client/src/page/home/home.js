import { Layout, Menu, Icon, } from 'antd';
import {  Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import { withRouter } from "react-router-dom";
import './home.scss'

import Board from '../board/board'
import asyncComponent from '../../asyncComponent'
import Navigation from './nagation/nagation'
import AddOrder from '../addOrder/addOrder'
import GoodsList from '../goodsList/goodsList'
import AddGoods from '../addGoods/addGoods'
import EditGoods from '../editGoods/editGoods'

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

class Home extends React.Component {
  state = {
    collapsed: false,
    routerArr:['/home/board','/home/orderList','/home/addOrder','/home/goodsList','/home/addGoods'],
    showName_a:'图表',
    showName_b:'看板',
    nameArr:['看板','订单列表','新增订单','商品列表','添加商品'],
    openKeys:['图表']
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  toRouter = (obj) => {
    console.log(obj)
    this.setState({
      showName_a: obj.keyPath[1],
      showName_b: this.state.nameArr[obj.key]
    })
    this.props.history.push(this.state.routerArr[obj.key]);
  }
  onOpenChange = (openKeys) => {
    let str = openKeys[openKeys.length-1];
    this.setState({
      openKeys:[str]
    })
  }
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">云生活超市</div>
          <Menu 
          theme="dark" 
          mode="inline" 
          onOpenChange={this.onOpenChange}
          openKeys={this.state.openKeys}
          defaultSelectedKeys={['0']}
          defaultOpenKeys={['图表']}
          onClick={this.toRouter}
          >
            <SubMenu
            key="图表"
            title={
              <span>
                <Icon type="area-chart" />
                <span>图表</span>
              </span>
            }
            >
              <Menu.Item key="0">
                <Icon type="video-camera" />
                <span>看板</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
            key="订单"
            title={
              <span>
                <Icon type="appstore" />
                <span>订单</span>
              </span>
            }
            >
              <Menu.Item key="1">
                <Icon type="video-camera" />
                <span>订单列表</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>新增订单</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
            key="商品"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
              </span>
            }
            >
              <Menu.Item key="3">
                <Icon type="video-camera" />
                <span>商品列表</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="video-camera" />
                <span>添加商品</span>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            
          </Header>
          <Navigation name_a={this.state.showName_a} name_b={this.state.showName_b}/>
          <Content
            style={{
              marginLeft:16,
              marginRight:16,
              marginBottom:24,
              
              
            }}
          >
            <Switch>
                <Redirect from='/home' exact to='/home/board'></Redirect>
                <Route path='/home/board' exact render={() => <Board></Board> }></Route>

                <Route path='/home/orderList' exact component={asyncComponent(()=>import('../order/orderList'))}></Route>
                <Route path='/home/addOrder' exact render={() => <AddOrder></AddOrder> }></Route>

                <Route path='/home/goodsList' exact render={() => <GoodsList></GoodsList> }></Route>
                <Route path='/home/addGoods' exact render={() => <AddGoods></AddGoods> }></Route>
                <Route path='/home/editGoods'  exact render={() => <EditGoods {...this.props}></EditGoods> }></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Home)



