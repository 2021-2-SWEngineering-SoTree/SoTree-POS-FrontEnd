import React, {useState} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import profile_Image from '../../Assets/profile.png'
import {BsKey, BsPerson} from "react-icons/bs"
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Input = styled.input`
    font-size: 1.5rem;
    text-align : center;
    outline: none;
    border: none;
    border-bottom: 1px solid #c5f6fa;
    margin : 0.5rem 0.5rem 0.5rem 0;
    background-color : #FAF8F8;
`;

const Button = styled.button`
    width : 8rem;
    height : 4rem;
    background-color : #FAF8F8;
    margin-bottom : 1rem;
    font-size : 1.3rem;
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
    margin : 7rem 2rem 4rem 2rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const ButtonDiv = styled.div`
    margin : 4rem 2rem 2rem 2rem;
`;

const InputDiv = styled.div`
    display : flex;
    justify-content : center;
    margin-bottom : 1rem;
`;

const ImageDiv = styled.div`
    background-repeat : no-repeat;
    background-color : #F0F0F0;
    border-radius : 10px 0 0 10px;
    width : 30px;
    font-size: 1.25rem;
    margin : 0.5rem 0 0.5rem 0.5rem;
`

const Login = ({loginCallBack}) => {

    const [id, SetId] = useState('');
    const [pwd, SetPwd] = useState('');

    const navigate = useNavigate();

    const clickHandler = async (e)=>{
        console.log("Login button cliecked;",id, pwd);
        let data = {
            id : id,
            pw : pwd
        }
        await axios.post('http://localhost:8080/login', JSON.stringify(data), {
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            console.log(res.data);
            if(res.data === ""){
                alert("로그인실패zz");
            }else{
                const token = res.data;
                const user = jwt.verify(token, "webfirewood");
                if(user.userName === undefined){
                    alert("로그인 실패 포스기 실행 로그인은 관리자만 로그인 가능합니다");

                }else{
                    alert("로그인 성공");
                    axios.defaults.headers.common['Authorization'] = `webfirewood ${res.data}`;
                    window.localStorage.setItem('Token', JSON.stringify(res.data));
                    window.localStorage.setItem('userName', user.userName);
                    window.localStorage.setItem('storeName', user.storeName);
                    window.localStorage.setItem('storePhonenumber', user.storePhoneNumber);
                    loginCallBack(true);
                    navigate('/homePage');
                }
               
            }
        }).catch(error => {console.log(error); alert("로그인실패");});
    };

    return (
        <>                   
            <MainDiv>
                <div style={{textAlign:'center'}}>
                    <ProfileImg src = {profile_Image}/>
                </div>
                <InputDiv>
                    <ImageDiv><BsKey style={{marginTop:'0.2rem'}}/></ImageDiv>
                    <Input type ="text" value = {id} onChange={(e)=> SetId(e.target.value)} placeholder="user name"/>
                </InputDiv>
                <InputDiv>
                    <ImageDiv><BsPerson style={{marginTop:'0.2rem'}}/></ImageDiv>
                    <Input type ="password" value = {pwd} onChange={(e)=> SetPwd(e.target.value)} placeholder="password"/>
                </InputDiv>
                <ButtonDiv>
                    <div style={{marginTop:'-2vh'}}>
                        <Button onClick={(e)=>clickHandler(e)}>로그인</Button>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', marginTop:'1vh'}}>
                        <Link to="/findUserInfo">
                            <Button>ID/PW 찾기</Button>
                        </Link>
                        <Link to="/signUp">
                            <Button>회원가입</Button>
                        </Link>
                    </div>
                </ButtonDiv>
            </MainDiv>
        </>
    );
};

export default Login;