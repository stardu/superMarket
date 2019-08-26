import React from 'react';
import {
    Form,
    Input,
    Select,
    Button,
  } from 'antd';
import api from '../../api'
import Avatar from './imgUpload'
const { Option } = Select;
class AddGoods extends React.Component {
state = {
	confirmDirty: false,
	autoCompleteResult: [],
	optionArr: [],
	imgUrl:''
};

handleSubmit = e => {
	e.preventDefault();
	this.props.form.validateFieldsAndScroll((err, values) => {
		values.good_img = this.state.imgUrl
		if (!err) {
			api.addGoods(values)
			.then(res=>{
			if(res.data.code == 200){
				console.log('添加成功')
			}
			})
		}
	});
	
};
getImgUrl=(imgUrl)=>{
	this.setState({imgUrl})
	
};

componentDidMount(){
	api.getGoodsType({})
	.then(res=>{
	if(res.data.code == 200){
		let arr = [];
		res.data.data.forEach(item=>{
		arr.push(<Option key={item.id}>{item.type_name}</Option>)
		})
		this.setState({
		optionArr: arr
		})
	}
	})
}
render() {
	const { getFieldDecorator } = this.props.form;

	const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
	};
	const tailFormItemLayout = {
	wrapperCol: {
		xs: {
		span: 24,
		offset: 0,
		},
		sm: {
		span: 16,
		offset: 8,
		},
	},
	};


	return (
	<Form {...formItemLayout} onSubmit={this.handleSubmit}>
		<Form.Item label="商品名称">
		{getFieldDecorator('good_name', {
			rules: [
			{
				required: true,
				message: '请输入商品名称',
			},
			],
		})(<Input />)}
		</Form.Item>
		<Form.Item label="商品分类">
		{getFieldDecorator('type_id', {
			rules: [
			{
				required: true,
				message: '请输入商品名称',
			},
			],
		})
		(<Select
			style={{ width: 200 }}
			placeholder="请选择商品分类"
		>
			{this.state.optionArr}
		</Select>)}
		</Form.Item>
		<Form.Item label="商品价格">
		{getFieldDecorator('goods_price', {
			rules: [
			{
				required: true,
				pattern: new RegExp(/^[1-9]\d*$/, "g"),
				message: '请输入正确的商品价格',
			},
			],
			getValueFromEvent: (event) => {
				return event.target.value.replace(/\D/g,'')
			},
			initialValue:''
		})(<Input />)}
		</Form.Item>
		<Form.Item label="商品图片">
			<Avatar getImgUrl={this.getImgUrl} />
		</Form.Item>
		<Form.Item {...tailFormItemLayout}>
		<Button type="primary" htmlType="submit">
			添加
		</Button>
		</Form.Item>
	</Form>
	);
}
}

const WrappedAddGoodsrationForm = Form.create({ name: 'AddGoods' })(AddGoods);
export default WrappedAddGoodsrationForm