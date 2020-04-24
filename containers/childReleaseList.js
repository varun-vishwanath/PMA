import React, { Component } from "react";
import {
    Table, Popconfirm, Popover, Row, Col, Button, Tag,
    Input, Select, Slider, DatePicker, Form, Progress
} from "antd";
import moment from 'moment';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { statusDisplay, progressDisplay, dateFormat } from "../commons/helpers";


// Items for child release listing
// Expects - props from parent - callback method to call on save
export default class ChildReleaseList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            editStatus: "IN PROGRESS",
            editingKey: '',
            editProgress: "",
            editstartDate: "",
            editEndDate: "",
            editDescription: "",
            childColumns: [

                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    editable: true,
                    render: (rec) => statusDisplay(rec)
                },
                {
                    title: 'Progess',
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
                    title: 'End Date',
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
                                <Popconfirm title="Sure to cancel?" onConfirm={this.cancel} >
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                                <EditOutlined disabled={this.state.editingKey !== ''} onClick={() => this.edit(record)} />
                            );
                    }
                }
            ],
        }
    }



    isEditing = record => record.key === this.state.editingKey;

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
                inputNode = <Input defaultValue={record.version} name="version" onChange={this.handleVersion} />
                break;
            case "startDate":
                inputNode = <DatePicker name="startDate" defaultValue={moment(record.startDate, dateFormat)} onChange={this.handleStartDate} />
                break;
            case "endDate":
                inputNode = <DatePicker name="endDate" defaultValue={moment(record.endDate, dateFormat)} onChange={this.handleEndDate} />
                break;
            case "description":
                inputNode = <Input defaultValue={record.description} onChange={this.handleDescription} />
                break;
            case "status":
                inputNode = statusDisplay(this.state.editStatus)
                // inputNode = this.fetchStatusDisp(record.status);

                break;
            case "progress":
                inputNode = <Slider defaultValue={record.progress ? record.progress : 0} tooltipVisible name="progress" onChange={this.handleSlider} />
                break;
        }


        return (
            <td {...restProps}>
                {editing ?

                    (
                        <Form.Item
                            name={record.key + "__" + dataIndex}
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
        // }
    };


    handleChange = (value) => {
        console.log("Vlaue", value)
        this.setState({
            editStatus: value
        })
    }

    handleSlider = (value) => {
        let releaseType = "IN PROGRESS"
        if (value == 0) {
            releaseType = "IN PROGRESS"
        } else if (value == 100) {
            releaseType = "RELEASED"
        } else {
            releaseType = "UNRELEASED"
        }
        this.setState({
            editProgress: value,
            editStatus: releaseType
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
    handleDescription = (e) => {
        this.setState({
            editDescription: e.target.value
        })
    }

    save(record) {
        let { editstartDate, editEndDate, editDescription, editStatus, editProgress } = this.state;
        let temp = this.props.thisData;

        temp.childRelease.map(item => {
            if (item.key == record.key) {
                item.key = record.key;
                item.status = editStatus;
                item.progress = editProgress;
                item.startDate = editstartDate;
                item.endDate = editEndDate;
                item.description = editDescription;
            }
        })

        let arr = JSON.parse(localStorage.getItem("parentReleaseData"));

        let index = arr.map(x => {
            return x.key;
        }).indexOf(temp.key);
        arr.splice(index, 1);
        let addData = temp;
        arr.unshift(addData);

        // debugger;
        localStorage.setItem('parentReleaseData', JSON.stringify(arr));
        this.setState({
            editingKey: "",
            editStatus: "",
            editProgress: "",
            editstartDate: "",
            editEndDate: "",
            editDescription: "",
        })
        this.props.refreshCallBack();
    }




    componentWillReceiveProps(nextProps) {
        let { dataFromLS } = nextProps;

        if (dataFromLS) {
            this.setState({
                listDataSrc: dataFromLS,
                editingKey: ""
            })
        }
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    edit(record) {
        this.setState({
            editingKey: record.key,
            editStatus: record.status,
            editProgress: record.progress,
            editstartDate: record.startDate,
            editEndDate: record.endDate,
            editDescription: record.description
        });
    }

    render() {

        const components = {
            body: {
                cell: this.EditableCell,
            },
        };

        const columns = this.state.childColumns.map(col => {
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

            <Table
                columns={columns}
                dataSource={this.props.thisData.childRelease}
                pagination={false}
                components={components}
            />
        )
    }

}


