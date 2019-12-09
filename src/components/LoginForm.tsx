import React from 'react';
import * as Yup from 'yup';
import {
    withFormik,
    FormikProps, /*FormikErrors,*/
    Form as FormikForm,
    Field
} from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useDispatch, connect } from 'react-redux';
import { signIn } from '../state/ducks/auth/operations';


const schema = Yup.object({
    email: Yup.string()
        .email('Invalid email ')
        .required('No email provided.'),
    password: Yup.string()
        .required('No password provided.'),
});

interface FormProps {
    touched: boolean | undefined,
    errors: string | undefined,
    label: string,
    name: string,
    validLabel?: string,
    type?: string,
    placeholder?: string,
};

const TextField: React.FC<FormProps> = (props) => {
    const { touched, errors, label, validLabel = "Seems good", placeholder = "", ...field } = props;
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Field
                as={Form.Control}
                placeholder={placeholder}
                {...field}
            />
            {touched && errors ?
                <Form.Control.Feedback type="invalid">
                    {errors}
                </Form.Control.Feedback>
                : null}
        </Form.Group>
    )
};



// Shape of form values
interface FormValues {
    email: string,
    password: string,
}

interface OtherProps {
    title: string;
    authError: string | undefined;
}



const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {

    const { touched, errors, isSubmitting, title, authError } = props;

    return (
        <Card
            style={{
                margin: "50px auto",
                padding: "30px",
                width: "600px",
            }}
        >
            <FormikForm>

                <h1>{title}</h1>

                <TextField
                    touched={touched.email}
                    errors={errors.email}
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="some@email.com"
                />
                <TextField
                    touched={touched.password}
                    errors={errors.password}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Type your password"
                />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                >
                    Login
                </Button>

                {authError ?
                    <Form.Control.Feedback type="invalid">
                        {authError}
                    </Form.Control.Feedback>
                    : null}

            </FormikForm>
        </Card>
    );
};


interface LoginFormProps {
    email?: string,
    password?: string,

    signInOnSubmit?: any,
    authError: string | undefined,

    title: string;
}

const LoginFormFormik = withFormik<LoginFormProps, FormValues>({

    mapPropsToValues: props => {
        return {
            email: "test2@test.com",
            password: "saddas111",
            authError: "",
        };
    },

    // TODO async validation with firebase https://jaredpalmer.com/formik/docs/api/withFormik
    validationSchema: schema,

    handleSubmit: (values, { props, setSubmitting }) => {
        props.signInOnSubmit(
            values.email,
            values.password);
        setSubmitting(false);
    },

})(InnerForm);

const mapStateToProps = (state: any) => ({
    authError: state.auth.authError,
})

const mapDispatchToProps = (dispatch: any) => ({
    signInOnSubmit: (email: string, password: string) => dispatch(signIn(email, password)),
});




const LoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormFormik);

export default LoginForm;