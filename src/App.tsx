import React, { Component } from "react";
import { Formik } from "formik";
import './App.css';
import EmailForm from "./EmailForm";
interface IEmail {
  "title": number;
  "checkList": ICheckList[];
  "bcc": IBcc;
}
interface ICheckList {
  "isEnable": boolean;
  "email": string
}

interface IBcc {
  "isEnable": boolean;
  "email": string
}
const defaults = [
  {
    title: "title-1",
    checkList: [{
      isEnable: true,
      email: "title-1.1@mail.com"
    },
    {
      isEnable: true,
      email: "title-1.2@mail.com"
    }],
    bcc: {
      isEnable: true,
      email: ""
    }
  },
  {
    title: "title-2",
    checkList: [{
      isEnable: true,
      email: "title-2@mail.com"
    }],
    bcc: {
      isEnable: true,
      email: ""
    }
  },
  {
    title: "title-3",
    checkList: [{
      isEnable: true,
      email: "title-3@mail.com"
    }],
    bcc: {
      isEnable: true,
      email: ""
    }
  }
];

class App extends Component {
  state = {
    data: defaults,
  }

  getInitialValues = () => {
    const initialValues = {
      ...defaults
    };
    return initialValues;
  }

  handleBccInput = (index: number, event: string) => {
    console.log('handleBccInput index: ' + index + ' bccInput : ' + event)
    var items = this.state.data;
    items[index].bcc.email = event
  }
  onSubmit = () => {
    console.log('onSubmit clicked')
  }
  updateEmailList = (selectedEmails: IEmail[]) => {
    console.log('updateEmailList: ' + JSON.stringify(selectedEmails))
    this.setState({
      data: selectedEmails
    })
  }

  render() {
    const initialValues = this.getInitialValues();

    const renderForm = (props: any) => (
      <EmailForm
        {...props}
        data={this.state.data}
        handleBccInput={this.handleBccInput}
        updateEmailList={this.updateEmailList}
      />
    );
    return (
      <React.Fragment >
        <Formik
          // tslint:disable-next-line jsx-no-lambda
          render={props => renderForm(props)}
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          validateOnBlur={true}
          validateOnChange={true} />
      </React.Fragment>
    );
  }
}

export default App;
