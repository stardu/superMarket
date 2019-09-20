import React from "react";
import "./goodsList.scss";

import { Icon, Table, Divider, Button, Modal, message } from "antd";
import api from "../../api";
const { Column } = Table;

const { confirm } = Modal;

import { withRouter } from "react-router-dom";

// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from "react-redux";
import { setPageTitle_c } from "../../store/actions.js";

class GoodsList extends React.Component {
  state = {
    newOrder: 10000,
    newUser: 0,
    newAdmin: 0,
    page: 1, //当前页数
    counts: 10, //每页显示条数
    type_id: 0, //商品分类id
    whereLink: "", //关键字
    tableData: [],
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ["10", "20", "50", "100"],
      showSizeChanger: true,
      total: 0,
      onChange: this.handleCurrent,
      onShowSizeChange: this.handlePages
    },
    visible: false //模态框
  };
  componentDidMount() {
    this.queryGoods();

    let { setPageTitle } = this.props;
    // 触发setPageTitle action
    setPageTitle("新的标题");
  }
  handleCurrent = page => {
    let obj = this.state.pagination;
    obj.current = page;
    this.setState({
      pagination: obj
    });
    this.queryGoods();
  };
  handlePages = (current, size) => {
    let obj = this.state.pagination;
    obj.pageSize = size;
    this.setState({
      pagination: obj
    });
    this.queryGoods();
  };
  queryGoods = () => {
    api
      .queryGoods({
        page: this.state.pagination.current,
        counts: this.state.pagination.pageSize,
        type_id: this.state.type_id,
        whereLink: this.state.whereLink
      })
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            tableData: res.data.data.data,
            pagination: {
              current: res.data.data.page,
              pageSize: res.data.data.count,
              pageSizeOptions: ["10", "20", "50", "100"],
              showSizeChanger: true,
              total: res.data.data.total,
              onChange: this.handleCurrent,
              onShowSizeChange: this.handlePages
            }
          });
        }
      });
  };
  //修改商品
  toEditGoods = (text, e) => {
    this.props.history.push({
      pathname: "/home/editGoods",
      state: {
        id: text.id
      },
      query: {
        id: text.id
      }
    });
  };
  //删除商品
  deleteGood = (text, e) => {
    let that = this;
    confirm({
      title: "是否确认删除商品？",
      content: "点击确认将删除该商品",
      onOk() {
        return new Promise((resolve, reject) => {
          api
            .deleteGoods({
              goods_id: text.id
            })
            .then(res => {
              resolve();
              if (res.data.code == 200) {
                message.success("删除成功！");
                that.queryGoods();
              } else {
                message.error(res.data.msg[0]);
              }
            });
        });
      },
      onCancel() {},
      cancelText: "取消",
      okText: "确认"
    });
  };

  render() {
    return (
      <div className="goodsList">
        <div className="goodsList-title">
          <Icon type="shopping" style={{ fontSize: 18, paddingLeft: 16 }} />
          <span> 商品列表 </span>
        </div>
        <div
          style={{
            width: "90%",
            marginLeft: "5%",
            marginTop: "3%"
          }}
        >
          <Table
            dataSource={this.state.tableData}
            pagination={this.state.pagination}
          >
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="商品名称" dataIndex="good_name" key="good_name" />
            <Column title="商品价格" dataIndex="goods_price" key="good_price" />
            <Column
              title="商品图片"
              dataIndex="good_img"
              key="good_img"
              render={(text, record) => (
                <img src={record.good_img} alt="图片显示失败"></img>
              )}
            />
            <Column
              title="操作"
              key="action"
              render={(text, record) => (
                <div>
                  <Button type="link" onClick={this.check}>
                    查看
                  </Button>
                  <Button type="link" onClick={e => this.toEditGoods(text, e)}>
                    修改
                  </Button>
                  <Button type="link" onClick={e => this.deleteGood(text, e)}>
                    删除
                  </Button>
                </div>
              )}
            />
          </Table>
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p> Some contents... </p> <p> Some contents... </p>
          <p> Some contents... </p>
        </Modal>
      </div>
    );
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = state => {
  return {
    pageTitle: state.pageTitle
  };
};

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPageTitle(data) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(setPageTitle_c(data));
      // 执行setPageTitle会返回一个函数
      // 这正是redux-thunk的所用之处:异步action
      // 上行代码相当于
      /*dispatch((dispatch, getState) => {
            dispatch({ type: 'SET_PAGE_TITLE', data: data })
        )*/
    }
    /* setInfoList (data) {
        dispatch(setInfoList(data))
    } */
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GoodsList));
