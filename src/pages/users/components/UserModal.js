import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

/*定义一个组件类 用户编辑的模态框*/
class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  /*定义一个时间处理方法*/
  showModalHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  /*定义一个时间处理方法*/
  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  /*定义一个时间处理方法  当提交OK之后，隐藏模态框*/
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };


  /*定义需要渲染的内容*/
  render() {
    const { children } = this.props; //定义属性
    const { getFieldDecorator } = this.props.form;        //定义一个单据form
    const { name, email, website1 } = this.props.record;  //定义单据上的属性值

    const formItemLayout = { //表单布局
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    /*返回需要渲染的东西  一个模态框*/
    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>


        <Modal
          /*新增一个模态框弹框：弹出框的名称、状态可见性、OK按钮、取消按钮*/
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >

          /*定义一个 表单*/
          <Form horizontal onSubmit={this.okHandler}>

            /*定义表单input类型的item   并给字段名称赋值*/
            <FormItem {...formItemLayout}  label="Name" >
              { getFieldDecorator('name', {initialValue: name,})(<Input />) }
            </FormItem>

            /*定义表单input类型的item   并给字段名称赋值*/
            <FormItem {...formItemLayout} label="Email">
              {getFieldDecorator('email', {initialValue: email,})(<Input />)}
            </FormItem>

            /*定义表单input类型的item   并给字段名称赋值*/
            <FormItem {...formItemLayout} label="Website">
              {getFieldDecorator('website', {initialValue: website1,})(<Input />)}
            </FormItem>

          </Form>


        </Modal>
      </span>


    );
  }
}

export default Form.create()(UserEditModal);
