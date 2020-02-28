import React, { useContext } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, /*FormikErrors,*/ Form as FormikForm, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

import { ReactComponent as IconCamera } from '../assets/add_post_form_camera.svg';
import { addPost } from '../state/ducks/posts/operations';

import { useDispatch, connect, useSelector } from 'react-redux';
import { postsSelectors } from '../state/ducks/posts';


import DefaultAvatar from '../assets/images/defaultAvatar.png';

const schema = Yup.object({
    postContent: Yup.string()
        .required('Required')
        .max(3000, 'Must be less than 15 characters')
        .min(3, 'Too short - should be 8 chars minimum.'),
});

interface FormValues {
    postContent: string,
    file: string,
}

const InnerForm = (props: FormikProps<FormValues>) => {

    const dispatch = useDispatch();

    const { touched, errors, isSubmitting, setFieldValue } = props;
    const authorized = useSelector((state: any) =>
        !state.firebase.auth.isEmpty
    );

    const profile = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile : null
    );


    return (authorized && profile) ?

        (<Card
            className="add_post_form"
        >
            <FormikForm>

                <Media>
                    <img
                        src={profile.profilePicPath || DefaultAvatar}
                        alt="placeholder"
                        className="add_post_form__avatar"
                    />
                    <Media.Body>
                        <Form.Group
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Field
                                as="textarea"
                                className="form-control add_post_form__textarea"
                                rows="3"
                                name="postContent"
                                placeholder="Wpisz treść wpisu..."
                                onChange={(e: any) => {
                                    console.log(e.target.value);
                                    props.setFieldValue('postContent', e.target.value);
                                    console.log(props.values.postContent);
                                }}
                            />

                            {touched.postContent && errors.postContent ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.postContent}
                                </Form.Control.Feedback>
                                : null}

                        </Form.Group>
                        <ButtonToolbar>

                            {
                                props.values.file &&
                                <img
                                    src={URL.createObjectURL(props.values.file)}
                                    alt="Generic placeholder"
                                    className="add_post_form__attached_photo"
                                />
                            }

                            <label
                                htmlFor="file"
                                className="add_post_form__input_file_label"
                            >
                                <span>
                                    <IconCamera />
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}>

                                        DODAJ ZDJĘCIE
                                    </span>
                                </span>
                            </label>

                            <input id="file" name="file" type="file" className="add_post_form__input_file" onChange={(event: any) => {
                                setFieldValue("file", event.currentTarget.files[0]);
                            }} />
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="ml-auto"
                            >
                                Dodaj post
                            </Button>
                        </ButtonToolbar>
                    </Media.Body>
                </Media>





            </FormikForm>
        </Card >)
        : null;

};

// const addPostOnSubmit: any = (values: any, { props, setSubmitting }: any): any => {
// const addPostOnSubmit = (values: any) => {
// props.dispatch(addPost("Jakis kontent", "nazwa autora"));

// console.log(values);


// setTimeout(() => {
//     console.log(JSON.stringify(values, null, 2));
//     setSubmitting(false);


// }, 2000);
// }

interface AddPostFormProps {
    postContent?: string,
    file?: string,
    dispatch?: any,
    addPostOnSubmit?: any,

}

const AddPostFormFormik = withFormik<AddPostFormProps, FormValues>({

    mapPropsToValues: props => {
        return {
            postContent: "",
            file: "",
        };
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,

    handleSubmit: (values, { props, setSubmitting }) => {
        props.addPostOnSubmit(values.postContent, values.file);
        setSubmitting(false);
    },

})(InnerForm);

const mapDispatchToProps = (dispatch: any) => ({
    addPostOnSubmit: (postContent: string, file: any) => dispatch(addPost(postContent, file)),
});

const AddPostForm = connect(
    null,
    mapDispatchToProps
)(AddPostFormFormik);

export default AddPostForm;