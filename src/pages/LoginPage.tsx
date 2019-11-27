

import React from 'react';

import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const LoginPage: React.FC = () => {

    const isLogged = useSelector((state: any) => !state.firebase.auth.isEmpty);

    console.log(isLogged);


    return (


        isLogged ?
            <Redirect to="/" /> :
            <LoginForm title="Login" />


    );
}

export default LoginPage;
