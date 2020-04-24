import React, { Component } from "react";
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import { dateFormat } from "../commons/helpers"
import moment from 'moment';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

// To add items for main release listing
// Expects - props from parent - callback method to call on save

export default class AddParentRelease extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            localPRItems: [],

        }
    }

    componentDidMount() {
        let chkItem = JSON.parse(localStorage.getItem("parentReleaseData"));
        let getItems = chkItem == null ? [] : chkItem;
        this.setState({
            localPRItems: getItems
        })
    }

    onFinish = (values) => {


        let defDate = new Date();
        let arr = this.state.localPRItems;
        let prObj = {
            key: new Date().getTime(),
            version: values.version,
            status: "",
            progress: 0,
            startDate: values['startDate'] ? values['startDate'].format(dateFormat) : moment(defDate).format(dateFormat),
            endDate: values['endDate'] ? values['endDate'].format(dateFormat) : moment(defDate).format(dateFormat),
            description: values.description,
            childRelease: []
        }

        arr.push(prObj);
        localStorage.setItem("parentReleaseData", JSON.stringify(arr))

        this.props.refreshCallBack();
    }




    render() {
        return (
            <div>

                <Form
                    name="basic"
                    initialValues={{ remember: false }}
                    onFinish={this.onFinish}
                >
                    <div className="parent-release-sec">
                        <Row>
                            <Col span={5} className="parent-release-sec-col">
                                <Form.Item
                                    label="Version"
                                    name="version"
                                    rules={[{ required: true, message: 'Please input your version!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={4} className="parent-release-sec-col">
                                <Form.Item label="Start Date" name="startDate"  >
                                    <DatePicker defaultValue={moment(new Date, dateFormat)} />
                                </Form.Item>

                            </Col>
                            <Col span={4} className="parent-release-sec-col">
                                <Form.Item label="Release Date" name="endDate">
                                    <DatePicker defaultValue={moment(new Date, dateFormat)} />
                                </Form.Item>

                            </Col>

                            <Col span={5} className="parent-release-sec-col">
                                <Form.Item
                                    label="Description"
                                    name="description"
                                >
                                    <Input />
                                </Form.Item>

                            </Col>
                            <Col span={4} className="parent-release-sec-col">
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                            </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
}


