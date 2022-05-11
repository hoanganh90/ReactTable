import React, { Component } from "react";
import { Form, FormikProps } from "formik";
import { WithTranslation, withTranslation } from "react-i18next";
import { Cell, GridContainer } from "react-foundation";
import ReactTable, { Column } from "react-table";
import "react-table/react-table.css";
interface IEmail {
    "title": number;
    "checkList": ICheckList[];
    "bcc": string;
}

interface ICheckList {
    "isEnable": boolean;
    "email": string
}
interface IState {
    data: IEmail[],
    parentCallback(index: any, event: string): any,
    updateVaultList(data: IEmail[]): any

}
class EmailForm extends Component<IEmail & IState & WithTranslation> {
    state = {
        allTrustPersonSelected: true,
        allSecurityContactsSelected: false,
    };
    renderCheckbox = (title: string) => {
        return (
            <div>{title}</div>
        );
    }
    overrideValue = (index: number, override: any) => {
        console.log('index: ' + index + ' override: ' + override)
        const { data } = this.props;
        this.onTrigger(index, override)
        console.log('overrideValue data: ' + JSON.stringify(data))
    }

    onTrigger = (index: number, event: any) => {
        this.props.parentCallback(index, event);
        // event.preventDefault();
    }

    onCheckBoxItemSelected = (emailIndex: number, addressIndex: number) => {
        var data = this.props.data
        console.log(' onCheckBoxItemSelected data: ' + JSON.stringify(data))
        data[emailIndex].checkList[addressIndex].isEnable = !data[emailIndex].checkList[addressIndex].isEnable

        var isAllSecurityContactsSelected = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i].checkList.every(it => it.isEnable === true)) {
                isAllSecurityContactsSelected = true
            } else {
                isAllSecurityContactsSelected = false;
                break
            }
        }
        return
        this.setState({
            allSecurityContactsSelected: isAllSecurityContactsSelected
        })

        this.props.updateVaultList(data)

    }
    renderHeader = (title: string) => {
        return (
            <div
                style={{
                    textAlign: "center",
                }}
            >{title}</div>
        );
    }

    tableHeader = (): Array<Column<IEmail>> => {
        // Extract transalation variable from props
        return [
            {
                Header: this.renderHeader('Title'),
                id: "title",
                accessor: "title",
                width: 200,
                Cell: props => {
                    //console.log('cellValues: ' + props.value)
                    return (
                        <input value={props.value} ></input>
                    )

                },
            },
            {
                Header: this.renderHeader("Check List"),
                id: "checkList",
                accessor: "checkList",
                sortable: false,
                width: 200,
                resizable: true,
                Cell: props => {
                    const cellValues = props.value
                    console.log('cell.value : ' + JSON.stringify(cellValues))
                    return cellValues.map((item: ICheckList, index: number) => {
                        return (
                            <div>
                                <input type="checkbox" checked={item.isEnable} onChange={() => this.onCheckBoxItemSelected(props.index, index)} />
                                <a>{item.email}</a>
                            </div>
                        )
                    })

                }
            },
            {
                Header: this.renderHeader("BCC"),
                id: "bcc",
                accessor: "bcc",
                Cell: props => {
                    return (
                        <input value={props.value} onChange={e => { this.overrideValue(0, e.target.value) }} type="email" multiple ></input>
                    )

                },
                width: 200,
            }

        ];
    }
    /*
    Component render function
    */
    render() {
        const {
            t,
            data,
        } = this.props
        const emptyElement = () => null;
        const tableHeader = this.tableHeader();
        return (
            <Form className="email-container-form">
                <ReactTable 
                    columns={tableHeader}
                    resizable={false}
                    data={data}
                    loading={false}
                    showPagination={false}
                    NoDataComponent={emptyElement}
                    defaultPageSize={Number.MAX_SAFE_INTEGER}
                    minRows={1}
                />
            </Form>


        )

    }

}
export default withTranslation()(EmailForm);