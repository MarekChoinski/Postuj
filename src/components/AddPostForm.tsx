import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, /*FormikErrors,*/ Form as FormikForm, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

import { ReactComponent as IconCamera } from '../assets/add_post_form_camera.svg';
import { ReactComponent as IconBold } from '../assets/add_post_form_bold.svg';
import { ReactComponent as IconItalic } from '../assets/add_post_form_italic.svg';



const schema = Yup.object({
    text: Yup.string()
        // .email('Invalid email ')
        .required('Required')
        .max(30, 'Must be less than 15 characters')
        .min(3, 'Password is too short - should be 8 chars minimum.'),
    // password: Yup.string()
    //     .required('No password provided.')
    //     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    // firstName: Yup.string()
    //     .required('Required'),
    // lastName: Yup.string()
    //     .max(20, 'Must be less than 20 characters')
    //     .required('Required'),
    // acceptedTerms: Yup.boolean()
    //     .required('Required')
    //     .oneOf([true], 'You must accept the terms and conditions.'),
});

// interface FormProps {
//     touched: boolean | undefined,
//     errors: string | undefined,
//     label: string,
//     name: string,
//     validLabel?: string,
//     type?: string,
//     placeholder?: string,
// };

// const TextField: React.FC<FormProps> = (props) => {
//     const { touched, errors, label, validLabel = "Seems good", placeholder = "", ...field } = props;
//     return (
//         <Form.Group>
//             <Form.Label>{label}</Form.Label>
//             <Field
//                 as={Form.Control}
//                 placeholder={placeholder}
//                 {...field}
//             />
//             {touched ? (
//                 errors ?
//                     <Form.Control.Feedback type="invalid">
//                         {errors}
//                     </Form.Control.Feedback>
//                     :
//                     <Form.Control.Feedback type="valid">
//                         {validLabel}
//                     </Form.Control.Feedback>
//             ) : null}
//         </Form.Group>
//     )
// };



// Shape of form values
interface FormValues {
    text: string,
}

const InnerForm = (props: FormikProps<FormValues>) => {

    const { touched, errors, isSubmitting } = props;

    return (
        <Card
            style={{
                margin: "50px auto",
                padding: "30px",
                width: "900px",
            }}
        >
            <FormikForm>

                <Media>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="http://via.placeholder.com/64"
                        alt="placeholder"
                    />
                    <Media.Body>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        <ButtonToolbar>
                            <Button variant="light">
                                <IconBold />
                            </Button>
                            <Button variant="light">
                                <IconItalic />
                            </Button>
                            <Button variant="light">
                                <IconCamera />
                            </Button>
                            {/* <Button variant="light">
                                <IconCamera />
                            </Button> */}
                            <Button disabled={isSubmitting} type="submit" className="ml-auto">Submit</Button>
                        </ButtonToolbar>
                    </Media.Body>
                </Media>





            </FormikForm>
        </Card>
    );
};


interface AddPostFormProps {
    text?: string,
}


const AddPostForm = withFormik<AddPostFormProps, FormValues>({

    mapPropsToValues: props => {
        return {
            text: "",
        };
    },

    validationSchema: schema,

    handleSubmit: (values, { setSubmitting }) => {

        setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 2000);
    },

})(InnerForm);

export default AddPostForm;