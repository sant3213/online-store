import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignUp() {
    
    const handleSubmit = (values, { setSubmitting }) =>
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      console.log(setSubmitting)
      setSubmitting(false);
    }, 400);

    const handleErrors = (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    }

    return (
        <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={handleErrors}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-form" />
              <Field type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-form"
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
}