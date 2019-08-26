import React from 'react'
import {  Breadcrumb } from 'antd';
import {  Link, withRouter } from 'react-router-dom'

import './nagation.scss'

class Navigation extends React.Component{
    render(){
        return(
            <div className='navigation'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.props.name_a}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.props.name_b}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            
        )
    }
}

export default withRouter(Navigation)