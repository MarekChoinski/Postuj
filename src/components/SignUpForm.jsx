import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Formik, Form as FormikForm, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <Form.Group>
            <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
            <Form.Control className="text-input" {...field} {...props} />

            {meta.touched ? (
                meta.error ?
                    <Form.Control.Feedback type="invalid">
                        {meta.error}
                    </Form.Control.Feedback>
                    :
                    <Form.Control.Feedback type="valid">
                        Looks good!
                </Form.Control.Feedback>
            ) : null}
        </Form.Group >
    );
};

const MyCheckbox = ({ children, ...props }) => {
    // We need to tell useField what type of input this is
    // since React treats radios and checkboxes differently
    // than inputs/select/textarea.
    const [field, meta] = useField({ ...props, type: 'checkbox' });


    return (
        //     <Form.Check type="checkbox" {...field} {...props} />
        //     <Form.Check.Label>{children}</Form.Check.Label>


        <Form.Group>
            <Form.Check type="checkbox" {...field} {...props}>
                <Form.Check.Input type="checkbox" />
                <Form.Check.Label>{children}</Form.Check.Label>
                {meta.touched ? (
                    meta.error ?
                        <Form.Control.Feedback type="invalid">
                            {meta.error}
                        </Form.Control.Feedback>
                        :
                        <Form.Control.Feedback type="valid">
                            Looks good!
                </Form.Control.Feedback>
                ) : null}
            </Form.Check>
        </Form.Group >
    );
};

// And now we can use these
const SignUpForm = () => {
    return (
        <Card
            style={{
                margin: "50px auto",
                padding: "30px",
                width: "600px",
            }}
        >
            < h1 >Sign up!</h1 >
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    acceptedTerms: false, // added for our checkbox
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email addresss`')
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
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <FormikForm>
                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <MyTextInput
                        label="Password"
                        name="password"
                        type="Password"
                        placeholder="Type password"
                    />
                    <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                    />
                    <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />
                    <MyCheckbox
                        name="acceptedTerms"
                        id="acceptedTerms"
                    >
                        I accept the terms and conditions
                    </MyCheckbox>

                    <Button type="submit">Submit form</Button>
                </FormikForm>
            </Formik>
        </Card>
    );
};

export default SignUpForm;