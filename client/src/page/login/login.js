import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './login.css'
import logo from '../../assets/bg.jpeg'

import api from '../../api'

let loginType = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity:'0.8',
    background: `url(${logo}) no-repeat`
} 

class Login extends React.Component {
    
    state = {
        name:'张三',
        nameArr:["张三","李四","王五"],
        arr:[1,2,3,4]
    }
    /* static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }; */

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              
              let obj = this.props.form.getFieldsValue();
              api.login({
                  user_name: obj.user_name,
                  pass_word:obj.pass_word
              }).then(res=>{
                  if(res.data.code == 200){
                      message.success('登录成功！');
                      sessionStorage.setItem('token',res.data.data[0].token)
                      setTimeout(()=>{
                        this.props.history.push('/home');
                      },1000)         
                  }else{
                      message.error(res.data.err_msg);
                  }
              }) 
          }
        });
    };

    
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={loginType}>
                <div className="login-box">
                    <Row>
                        <Col span={24} className='login-box-title'>登录</Col>
                    </Row> 
                    <Row type="flex" justify="center">
                        <Col span={12}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                {getFieldDecorator('user_name', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    />,
                                )}
                                </Form.Item>
                                <Form.Item>
                                {getFieldDecorator('pass_word', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    />,
                                )}
                                </Form.Item>
                                <Form.Item>
                                
                                {/* <a className="login-form-forgot" href="">
                                    Forgot password
                                </a> */}
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                               {/*  Or <a href="">register now!</a> */}
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row> 
                    
                </div>
            </div>
            
        )
    }
}

/* const Tlogin = withRouter(Form.create({})(Login)) */

export default Form.create({})(Login)
