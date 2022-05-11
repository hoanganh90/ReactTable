import React, { Component } from "react";
import { Formik } from "formik";
import './App.css';
import EmailForm  from "./EmailForm";
const defaults =[
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
    bcc: ""
  },
  {
    title: "title-2",
    checkList: [{
      isEnable: true,
      email: "title-2@mail.com"
    }],
    bcc: ""
  },
  {
    title: "title-3",
    checkList: [{
      isEnable: true,
      email: "title-3@mail.com"
    }],
    bcc: ""
  }
] ;

class App extends Component{
  state = {
    data: defaults,
  }

  getInitialValues = () => {
    const initialValues = {
      ...defaults
    };
    return initialValues;
  }

  handleCallback = ( index: number, event: string ) => {
		console.log( 'handleCallback index: ' + index + ' childData : ' + event )
		var items = this.state.data;
		items[index].bcc = event
	}
  onSubmit = () => {
    console.log('onSubmit clicked')
  }

  render() {
    const initialValues = this.getInitialValues();

    const renderForm = (props: any) => (
      <EmailForm
        {...props}
        data={this.state.data}
        parentCallback={this.handleCallback}
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
