import { Formik, Form, Field, ErrorMessage } from "formik";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import * as Yup from "yup";
import "../App.css";
import { CREDENTIALS } from "../onlineStoreCredentials";
import { useEffect } from "react";

export default function SignUp() {
  const handleGoogleResponde = (rsp) => {
    console.log(rsp);
  };
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: CREDENTIALS.ClientId,
      callback: handleGoogleResponde,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  });

  const handleSubmit = (values, { setSubmitting }) =>
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      console.log(setSubmitting);
      setSubmitting(false);
    }, 400);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email can´t be empty"),
  });

  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password can´t be empty")
      .test("len", "Very weak", (val) => val.length > 5)
      .test("len", "Weak", (val) => val.length > 8),
  });

  const validatePassword = (value) => {
    var error = undefined;
    try {
      PasswordSchema.validateSync({ password: value });
    } catch (validationError) {
      error = validationError.errors[0];
    }
    return error;
  };

  return (
    <div className="signUp-login">
      <Card style={{ width: "36rem", height: "30rem" }}>
        <Card.Body>
          <Card.Title>Sign up Form</Card.Title>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack gap={8}>
                  <div>
                    <Field type="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-form"
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-form"
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="confirmPassword"
                      validate={validatePassword}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-form"
                    />
                  </div>
                  <div>
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                  <div style={{display: 'flex', justifyContent:'center'}}>
                    <div id="signInDiv"></div>
                    </div>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
      
    </div>
  );
}
