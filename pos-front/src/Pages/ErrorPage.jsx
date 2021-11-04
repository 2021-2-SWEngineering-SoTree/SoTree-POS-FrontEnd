import React from 'react';
import SoTreeLogo from '../Assets/SoTree_Main_Logo.png'
import styled from 'styled-components';

const LogoImg = styled.img`
    width : 600px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const MainDiv = styled.div`
    text-align : center;
    margin-top : 10rem;
`;

const ErrorPage = () => {
    return (
        <MainDiv>
            404ERROR<br/><br/><br/><br/>
            <LogoImg src = {SoTreeLogo}/>
        </MainDiv>
    );
};

export default ErrorPage;