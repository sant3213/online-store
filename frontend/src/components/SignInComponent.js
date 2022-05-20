import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";

export default class SignInComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
      }
    
      handleSubmit(values, actions) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
            alert(JSON.stringify(values))
          }, 5000)
        });
      }
    
      handleValidation(values) {
        const errors = {};
    
        if(!values.email) {
          errors.email = "Email can't be empty"
        }
        return errors
      }
    
      validatePassword(value) {
        if(!value) {
          return "Password can't be empty" 
        } else if (value.length < 5) {
          return "Very weak" 
        } else if (value.length < 8) {
          return "Weak"
        }
        return undefined
      }
  render() {
    return (
      <>
        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          onSubmit={this.handleSubmit}
          validate={this.handleValidation}
        >
          {(props) => (
            <Form>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email">
                {(error) => <label>{error}</label>}
              </ErrorMessage>

              <label>Password</label>
              <Field name="password" type="password" />

              <ErrorMessage name="password">
                {(error) => <label>{error}</label>}
              </ErrorMessage>

              <label htmlFor="rememberMe" style={{ display: "block" }}>
                remember me
              </label>
              <Field type="checkbox" id="rememberMe" />
              <button type="submit" disabled={props.isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
      </>
    );
          }
}
