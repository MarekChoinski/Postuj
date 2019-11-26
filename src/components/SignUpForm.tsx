import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, /*FormikErrors,*/ Form as FormikForm, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, connect } from 'react-redux';
import { signIn } from '../state/ducks/auth/operations';


const schema = Yup.object({
    email: Yup.string()
        .email('Invalid email ')
        .required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    firstName: Yup.string()
        .max(15, 'Must be less than 15 characters')
        .required('Required'),
    lastName: Yup.string()
        .max(20, 'Must be less than 20 characters')
        .required('Required'),
    acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),
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
            {touched ? (
                errors ?
                    <Form.Control.Feedback type="invalid">
                        {errors}
                    </Form.Control.Feedback>
                    :
                    <Form.Control.Feedback type="valid">
                        {validLabel}
                    </Form.Control.Feedback>
            ) : null}
        </Form.Group>
    )
};



// Shape of form values
interface FormValues {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    acceptedTerms: boolean,
}

interface OtherProps {
    title: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {

    const { touched, errors, isSubmitting, title } = props;

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
                <TextField
                    touched={touched.firstName}
                    errors={errors.firstName}
                    label="First name"
                    name="firstName"
                    type="firstName"
                    placeholder="Type your first name"
                />
                <TextField
                    touched={touched.lastName}
                    errors={errors.lastName}
                    label="Last name"
                    name="lastName"
                    type="lastName"
                    placeholder="Type your last name"
                />

                <Form.Group>
                    <Form.Check type="checkbox">
                        <Form.Check.Label>
                            <Field as={Form.Check.Input} type="checkbox" name="acceptedTerms" />
                            Accept terms etc.
                        </Form.Check.Label>
                    </Form.Check>
                    {touched.acceptedTerms && errors.acceptedTerms ?
                        <Form.Control.Feedback type="invalid">
                            {errors.acceptedTerms}
                        </Form.Control.Feedback>
                        : null}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit">Submit</Button>


            </FormikForm>
        </Card>
    );
};


interface SignUpFormProps {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    acceptedTerms?: boolean,

    signInOnSubmit?: any,

    title: string;
}


const SignUpFormFormik = withFormik<SignUpFormProps, FormValues>({

    mapPropsToValues: props => {
        return {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            acceptedTerms: false,
        };
    },

    validationSchema: schema,

    handleSubmit: (values, { props, setSubmitting }) => {
        // props.signInOnSubmit("testowy@test.pl", "test123");
        setSubmitting(false);
    },

})(InnerForm);

const mapDispatchToProps = (dispatch: any) => ({
    signInOnSubmit: (email: string, password: string) => dispatch(signIn(email, password)),
});


const SignUpForm = connect(
    null,
    mapDispatchToProps
)(SignUpFormFormik);

export default SignUpForm;