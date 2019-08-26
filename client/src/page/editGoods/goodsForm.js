import React from 'react';
import {
	Form,
	Input,
	Select,
	message,
	Button,
} from 'antd';
import api from '../../api'
import Avatar from './imgUpload'
const { Option } = Select;
class goodsForm extends React.Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
		optionArr: [],
		imgUrl: '',
		type_id:'2'
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			values.good_img = this.state.imgUrl;
			
			values.id = this.props.location.state.id;
			if (!err) {
				api.updateGoods(values)
					.then(res => {
						if (res.data.code == 200) {
							message.success('修改商品成功');
						}else{
							message.error(res.data.msg[0]);
						}
					})
			}
		});

	};
	getImgUrl = (imgUrl) => {
		this.setState({ imgUrl })

	};

	componentDidMount() {
		api.getGoodsType({})
			.then(res => {
				if (res.data.code == 200) {
					let arr = [];
					res.data.data.forEach(item => {
						arr.push(<Option value={item.id} key={item.id}>{item.type_name}</Option>)
					})
					this.setState({
						optionArr: arr
					})
				}
			})
		api.queryGoodsDetail({
			id: this.props.location.state.id
		})
			.then(res => {
				if (res.data.code == 200) {
					this.props.form.setFieldsValue({
						'good_name': res.data.data[0].good_name,
						'type_id': res.data.data[0].type_id,
						'goods_price': res.data.data[0].goods_price,
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
							return event.target.value.replace(/\D/g, '')
						},
						initialValue: ''
					})(<Input />)}
				</Form.Item>
				<Form.Item label="商品图片">
					<Avatar getImgUrl={this.getImgUrl} />
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						修改
		</Button>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedAddGoodsrationForm = Form.create({ name: 'goodsForm' })(goodsForm);
export default WrappedAddGoodsrationForm