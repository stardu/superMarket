import React from 'react';
import './orderList.scss'

import './orderList.scss'

import { Icon, Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default class OrderList extends React.Component{
      state = {
          newOrder: 10000,
          newUser: 0,
          newAdmin: 0,
      }
      render(){
        return(
          <div className='orderList'>
              <div className='orderList-title'>
                <Icon type="shopping" style={{fontSize:18,paddingLeft:16}}/>
                <span>订单列表</span>
              </div>
              <div style={{
                width:'90%',
                marginLeft:'5%',
                marginTop:'3%'
              }}>
                <Table dataSource={data}>
                  <ColumnGroup title="Name">
                    <Column title="First Name" dataIndex="firstName" key="firstName" />
                    <Column title="Last Name" dataIndex="lastName" key="lastName" />
                  </ColumnGroup>
                  <Column title="Age" dataIndex="age" key="age" />
                  <Column title="Address" dataIndex="address" key="address" />
                  <Column
                    title="Tags"
                    dataIndex="tags"
                    key="tags"
                    render={tags => (
                      <span>
                        {tags.map(tag => (
                          <Tag color="blue" key={tag}>
                            {tag}
                          </Tag>
                        ))}
                      </span>
                    )}
                  />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <a href="javascript:;">Invite {record.lastName}</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">Delete</a>
                      </span>
                    )}
                  />
                </Table>
              </div>
          </div>
        )
      }
}