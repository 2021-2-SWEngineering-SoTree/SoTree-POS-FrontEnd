import React, { useEffect } from 'react';
import styled from 'styled-components';
import SoTree_Main_Logo from '../Assets/SoTree_Main_Logo.png';
import { Login } from './Login';

const Div = styled.div`
    max-width: 1980px;
    margin-top : 7rem;
    padding : 1rem 10rem;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height : 80vh;
    max-height : 56rem;
`;

const LeftDiv = styled.div`
    width : 500rem;
    height : 100%;
    flex-grow : 1;
    margin-right : 15rem;
`;

const LogoDiv = styled.div`
    min-width : 600px;
    height : 300px;
    line-height : 300px;
    vertical-align : middle;
    text-align: center;
    margin-top : 200px;
`;

const LoginDiv = styled.div`
    width : 200rem;
    height : 100%;
    flex-grow : 1;
`;

const LogoImg = styled.img`
    width : 800px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const MainPage = ({loginCallBack}) => {

    useEffect(()=>{
        window.localStorage.clear();
        console.log("clear?", window.localStorage.length)
    },[])

    return (
        <Div>
            <LeftDiv>
                <LogoDiv>
                    <LogoImg src = {SoTree_Main_Logo} alt="Logo"/>
                </LogoDiv>
            </LeftDiv>
            <LoginDiv>
                <Login loginCallBack={loginCallBack}/>
            </LoginDiv>
        </Div>
    );
};

export default MainPage;