import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import profile_Image from '../../Assets/profile.png'

const Input = styled.input`
    font-size: 1.25rem;
    outline: none;
    border: none;
    border-bottom: 1px solid #c5f6fa;
    margin : 0.5rem;
`;

const Button = styled.button`
    width : 7rem;
    height : 3rem;
    background-color : #FAF8F8;
    margin-bottom : 1rem;
`;

const MainDiv = styled.div`
    background-color : #D7FAFF;
    height : 100%; 
    border-radius : 1rem;
    border: 1px solid #50FAD2;
    box-sizing: border-box;
    text-align : center;
`;

const ProfileImg = styled.img`
    width : 13rem;
    height : 13rem;
    margin : 2rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const ButtonDiv = styled.div`
    margin : 1rem;
`;

const Login = () => {

    const [id, SetId] = useState('');
    const [pwd, SetPwd] = useState('');

    const clickHandler = ()=>{
        console.log("Login button cliecked;",id, pwd);
    };

    return (
        <>                   
            <MainDiv>
                <div style={{textAlign:'center'}}>
                    <ProfileImg src = {profile_Image}/>
                </div>
                <div>
                    <Input type ="text" value = {id} onChange={(e)=> SetId(e.target.value)} placeholder="Id"/>
                </div>
                <div>
                    <Input type ="text" value = {pwd} onChange={(e)=> SetPwd(e.target.value)} placeholder="password"/>
                </div>
                <ButtonDiv>
                    <Link to="/homePage">
                        <Button onClick={clickHandler}>로그인</Button>
                    </Link>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Link to="/findUserInfo">
                            <Button onClick={clickHandler}>ID/PW 찾기</Button>
                        </Link>
                        <Link to="/signUp">
                            <Button onClick={clickHandler}>회원가입</Button>
                        </Link>
                    </div>
                </ButtonDiv>
            </MainDiv>
        </>
    );
};

export default Login;