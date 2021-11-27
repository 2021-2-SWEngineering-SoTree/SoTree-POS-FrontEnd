import React, { useState, useRef, useEffect } from 'react';
import Header from '../../Components/Header';
import SignUpComponent from './SignUpComponent';

const SignUp = () => {


    return (
        <>
            <Header text ={"회원가입"} restaurantName = {""}/>
            <SignUpComponent/>
        </>
    );
};

export default SignUp;