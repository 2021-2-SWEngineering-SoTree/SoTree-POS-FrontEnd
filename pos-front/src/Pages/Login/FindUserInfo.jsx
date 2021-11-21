import React, {useState, useRef, useEffect} from 'react';
import Header from '../../Components/Header';
import styled from 'styled-components';
import FindId from './FindId';
import FindPw from './FindPw';

const Div = styled.div`
    flex-wrap: nowrap;
    display: flex;
    width : 100%;
    height : 87vh;  
    max-height : 56rem;
    border : 1px solid black;
    min-width : 90rem;
`;

const LeftDiv = styled.div`
    width : 50%;
    border-right: 2px dashed black;
`

const RightDiv = styled.div`
    width : 50%;
    border-left : 2px dashed black;
`

const FindUserInfo = () => {


    return (
        <>
        <Header text ={"아이디/비밀번호 찾기"}/>
        <Div>
            <LeftDiv>
                <FindId/>
            </LeftDiv>
            <RightDiv>
                <FindPw/>
            </RightDiv>
        </Div>   
        </>
    );
};

export default FindUserInfo;