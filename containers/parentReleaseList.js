import React, { Component, useState, version } from "react";
import {
    Table, Tag, Form, Input, InputNumber, Popconfirm, Row, Col, Dropdown,
    Progress, DatePicker, Select, Slider, Popover, Button, Modal, Badge
} from 'antd';
import AddParentRelease from './addParentRelease';
import moment from 'moment';
import AddChildRelease from "./addChildRelease";
import ChildReleaseList from "./ChildReleaseList";
import actions from "../redux/action";
import { connect } from "react-redux";
import { MenuOutlined } from '@ant-design/icons';
import { statusDisplay, progressDisplay, dateFormat } from "../commons/helpers";


const { onFetchItem } = actions;

// Main release listing page
// Expects - redux for listing object
// Caters other components and passes props such as data and redux methods
class ReleaseList extends Component {

    constructor(props) {
        super(props);
        let _this = this;
        this.state = {
            editingKey: '',
            editVersion: "",
            editStatus: "",
            editProgress: 0,
            editstartDate: "",
            editEndDate: "",
            editDescription: "",
            modalVisible: false,
            currentRecord: {},
            columns: [
                {
                    title: 'Version No',
                    dataIndex: 'version',
                    key: 'version',
                    render: text => <a>{text}</a>,
                    editable: true,
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    editable: true,
                    render: (rec) => statusDisplay(rec)
                },
                {
                    title: 'Progress',
                    dataIndex: 'progress',
                    key: 'progress',
                    editable: true,
                    render: (rec) => progressDisplay(rec)
                },
                {
                    title: 'Start Date',
                    dataIndex: 'startDate',
                    key: 'startDate',
                    editable: true,
                },
                {
                    title: 'Release Date',
                    dataIndex: 'endDate',
                    key: 'endDate',
                    editable: true,
                },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                    editable: true,
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => {
                        const editable = this.isEditing(record);
                        const Content = (
                            <div>
                                <Row>
                                    <Col span={8}><a disabled={this.state.editingKey !== ''} onClick={() => this.edit(record)}>Edit</a></Col>
                                    <Col span={8}><a disabled={this.state.editingKey !== ''} onClick={() => this.addChildItem(record)}>Add</a></Col>
                                    <Col span={8}><a disabled={this.state.editingKey !== ''} onClick={() => this.deleteItem(record)}>Delete</a></Col>
                                </Row>
                            </div>
                        );
                        return editable ? (
                            <span>
                                <a
                                    href="javascript:;"
                                    onClick={() => this.save(record)}
                                    style={{
                                        marginRight: 8,
                                    }}
                                >
                                    Save
                            </a>
                                <Popconfirm title="Sure to cancel?" onConfirm={this.cancel}>
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                                <Popover content={Content} title="Actions" trigger="hover">
                                    <MenuOutlined />
                                </Popover>
                            );
                    }
                }
            ],

            listDataSrc: [],
            isEdit: false
        }
    }


    addChildItem = (rec) => {
        this.setState({
            modalVisible: true,
            currentRecord: rec
        })
    }

    deleteItem = (rec) => {

        let arr = JSON.parse(localStorage.getItem("parentReleaseData"));

        let index = arr.map(x => {
            return x.key;
        }).indexOf(rec.key);
        arr.splice(index, 1);

        localStorage.setItem('parentReleaseData', JSON.stringify(arr));
        this.fetchItem();

    }

    componentDidMount() {
        // let chkItem = JSON.parse(localStorage.getItem("parentReleaseData"));
        // let getItems = chkItem == null ? [] : chkItem;
        // this.setState({
        //     listDataSrc: getItems
        // })
        this.fetchItem();
    }

    componentWillReceiveProps(nextProps) {
        let { dataFromLS } = nextProps

        if (dataFromLS) {
            this.setState({
                listDataSrc: dataFromLS,
                editingKey: ""
            })
        }
    }


    EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        let inputNode;

        switch (dataIndex) {
            case "version":
                inputNode = <Input defaultValue={record.version} name="version" onChange={(e) => this.handleVersionDesc(e, "editVersion")} />
                break;
            case "startDate":
                inputNode = <DatePicker name="startDate" defaultValue={moment(record.startDate, dateFormat)} onChange={this.handleStartDate} />
                break;
            case "endDate":
                inputNode = <DatePicker name="endDate" defaultValue={moment(record.endDate, dateFormat)} onChange={this.handleEndDate} />
                break;
            case "description":

                inputNode = <Input defaultValue={record.description} onChange={(e) => this.handleVersionDesc(e, "editDescription")} />
                break;
            case "status":
                inputNode =
                    <Select style={{ width: 120 }} name="status" defaultValue={this.state.editStatus} onChange={(e) => this.handleSelectSlider(e, "editStatus")}>
                        <Option value="IN PROGRESS">In Progress</Option>
                        <Option value="UNRELEASED">Unreleased</Option>
                        <Option value="RELEASED">Released</Option>
                    </Select>
                break;
            case "progress":
                inputNode = <Slider defaultValue={this.state.editProgress == "" ? 0 : this.state.editProgress} tooltipVisible name="progress"
                    onChange={(e) => this.handleSelectSlider(e, "editProgress")} />
                break;

        }


        return (
            <td {...restProps}>
                {editing ?
                    (
                        <Form.Item
                            name={record.key + "_" + dataIndex}
                            style={{ margin: 0 }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ]}
                        >
                            {inputNode}
                        </Form.Item>

                    )

                    : (
                        children
                    )}
            </td>
        );

    };




    handleSelectSlider = (value, type) => {
        this.setState({
            [type]: value
        })
    }

    handleVersionDesc = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    handleStartDate = (date, str) => {
        this.setState({
            editstartDate: str
        })
    }
    handleEndDate = (date, str) => {
        this.setState({
            editEndDate: str
        })
    }


    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(record) {
        let { editVersion, editstartDate, editEndDate, editDescription, editStatus, editProgress, listDataSrc } = this.state;

        listDataSrc.map(item => {
            if (item.key == record.key) {
                item.key = record.key;
                item.childRelease = item.childRelease;
                item.version = editVersion;
                item.status = editStatus;
                item.progress = editProgress;
                item.startDate = editstartDate;
                item.endDate = editEndDate;
                item.description = editDescription;
            }
        })

        localStorage.setItem('parentReleaseData', JSON.stringify(listDataSrc));
        this.setState({
            editStatus: "",
            editProgress: "",
            editstartDate: "",
            editVersion: "",
            editEndDate: "",
            editDescription: "",
        })
        this.fetchItem();

    }

    edit(record) {

        this.setState({
            editingKey: record.key,
            editStatus: record.status,
            editProgress: record.progress,
            editstartDate: record.startDate,
            editVersion: record.version,
            editEndDate: record.endDate,
            editDescription: record.description,
        });
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    handleOk = () => {
        this.setState({
            modalVisible: false
        })
    }

    fetchItem = () => {

        console.log("on fetch item call back")
        this.props.onFetchItem();
    }


    render() {


        let { listDataSrc } = this.state;

        const components = {
            body: {
                cell: this.EditableCell,
            },
        };

        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });



        return (
            <>
                <Form>
                    <Table
                        columns={columns}
                        dataSource={this.props.dataFromLS}
                        components={components}
                        expandable={{
                            expandedRowRender: record => <ChildReleaseList thisData={record} refreshCallBack={this.fetchItem} />,
                        }}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                        }}
                    />
                </Form>
                <AddParentRelease {...this.props} refreshCallBack={this.fetchItem} />
                <Modal
                    title="Add Batch Release"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    footer={null}
                    closable
                    className="modal-Layout"
                    onCancel={this.handleCancel}
                >
                    <AddChildRelease thisData={this.state.currentRecord} closeModal={this.handleOk} dbData={listDataSrc} refreshCallBack={this.fetchItem} />
                </Modal>

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        dataFromLS: state.dataFromLS
    };
};


export default connect(
    mapStateToProps, { onFetchItem }
)(ReleaseList);
