import React from 'react';
import { Row, Col } from 'antd';
import './board.scss'


import Chart from './chart/chart'

class Board extends React.Component{
      state = {
          newOrder: 10000,
          newUser: 0,
          newAdmin: 0,
      }
      render(){
        return(
          <div className='board'>
              <Row type='flex' justify='center'>
                 <Col span={8} className='title'>数据统计</Col>
              </Row>
              <div className='tag-a'>
                  <div className='tag-a-a'>当日数据：</div>
                  <div className='tag-a-b'>
                    <span>{this.state.newOrder}</span>
                    <span>新增订单</span> 
                  </div>
                  <div className='tag-a-b'>
                    <span>{this.state.newUser}</span>
                    <span>新增用户</span> 
                  </div>
                  <div className='tag-a-b'>
                    <span>{this.state.newAdmin}</span>
                    <span>新增管理员</span> 
                  </div>
              </div>
              <div className='tag-a'>
                  <div className='tag-a-a ' style={{backgroundColor:'#0C9EFF'}}>总数据：</div>
                  <div className='tag-a-b'>
                    <span>{this.state.newOrder}</span>
                    <span>订单</span> 
                  </div>
                  <div className='tag-a-b'>
                    <span>{this.state.newUser}</span>
                    <span>注册用户</span> 
                  </div>
                  <div className='tag-a-b'>
                    <span>{this.state.newAdmin}</span>
                    <span>管理员</span> 
                  </div>
              </div>
              <Chart></Chart>
          </div>
        )
      }
}

/* export default withRouter(Board) */
export default Board