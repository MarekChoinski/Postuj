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
import { addPost } from '../state/ducks/posts/operations';

import { useDispatch, connect } from 'react-redux';
import { postsSelectors } from '../state/ducks/posts';

const schema = Yup.object({
    postContent: Yup.string()
        .required('Required')
        .max(3000, 'Must be less than 15 characters')
        .min(3, 'Too short - should be 8 chars minimum.'),
});

interface FormValues {
    postContent: string,
}

const InnerForm = (props: FormikProps<FormValues>) => {
    const dispatch = useDispatch();

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
                        <Form.Group
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Field
                                as="textarea"
                                className="form-control"
                                rows="3"
                                name="postContent"
                                placeholder="Type post text..."
                            />

                            {touched.postContent && errors.postContent ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.postContent}
                                </Form.Control.Feedback>
                                : null}

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

// const addPostOnSubmit: any = (values: any, { props, setSubmitting }: any): any => {
const addPostOnSubmit = (values: any) => {
    // props.dispatch(addPost("Jakis kontent", "nazwa autora"));

    console.log(values);


    // setTimeout(() => {
    //     console.log(JSON.stringify(values, null, 2));
    //     setSubmitting(false);


    // }, 2000);
}

interface AddPostFormProps {
    postContent?: string,
    dispatch?: any,
    addPostOnSubmit?: any,

}

const AddPostFormFormik = withFormik<AddPostFormProps, FormValues>({

    mapPropsToValues: props => {
        return {
            postContent: "",
        };
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,

    handleSubmit: (values, { props, setSubmitting }) => {
        props.addPostOnSubmit(values.postContent);
        setSubmitting(false);
    },

})(InnerForm);

const mapDispatchToProps = (dispatch: any) => ({
    addPostOnSubmit: (postContent: string) => dispatch(addPost(postContent)),
});

const AddPostForm = connect(
    null,
    mapDispatchToProps
)(AddPostFormFormik);

export default AddPostForm;