import React from 'react';
import styled from 'styled-components';
import profile_Image from '../Assets/profile.png'
import {BsPerson} from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route } from 'react-router-dom';

const ContentDiv = styled.div`
    display : flex;
    width : 25.0rem;
    height : 13.0rem;
    background: #D7D6D6;
    border-radius: 1.8rem;
    margin-bottom : 1rem;
`;

const ProfileDiv = styled.div`
    margin : 2.5rem 0 2rem 1rem;
`;

const InfoDiv = styled.div`
    margin : 2.5rem 0 1rem 1rem;
    display : flex;
    flex-direction : column;
    justify-content : space-around;
    text-align : center;
`;

const ProfileImg = styled.img`
    width : 7.5rem;
    height : 7.5rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const ButtonDiv = styled.div`
    display : flex;
    margin-top : -0.5rem;
    margin-left : 0.5rem;
`;

const Button = styled.button`
    width : 4rem;
    height : 3rem;
    background-color : #FAF8F8;
    margin-bottom : 1rem;
    font-size : 0.8rem;
    margin-right : 1rem;
    border-radius : 10px;
    box-shadow : 0 1px;
`;

const Input = styled.div`
    width : 100%;
    font-size: 1rem;
    text-align : center;
    outline: none;
    border: none;
    padding : 0.5rem;
    margin : 0.5rem 0.5rem 0.5rem -0.5rem;
    background-color : #FAF8F8;
`;

const ImageDiv = styled.div`
    background-repeat : no-repeat;
    background-color : #F0F0F0;
    border-radius : 10px 0 0 10px;
    width : 50px;
    font-size: 1.25rem;
    margin : 0.5rem;
    padding-top : 0.3rem;
`;

const InputDiv = styled.div`
    display : flex;
    justify-content : center;
    margin-bottom : 1rem;
`;

const UserInfo = ({RestaurantName, EmpolyeeName}) => {

    let navigate = useNavigate();

    const logoutHandler = (e)=>{
        e.preventDefault();
        window.localStorage.clear();
        alert("로그아웃 되었습니다.");
        navigate('/');        
    }

    return (
        <ContentDiv>
            <ProfileDiv>
                <ProfileImg src = {profile_Image}/>
            </ProfileDiv>
            <InfoDiv>
                <b style={{marginTop:'0.5rem'}}>{RestaurantName}<br/></b>
                <InputDiv>
                    <ImageDiv><BsPerson style={{marginTop:'0.2rem'}}/></ImageDiv>
                        <Input>{EmpolyeeName}님</Input>
                </InputDiv>
                <ButtonDiv>
                    <Link to="/myInfo">
                        <Button>내정보</Button>
                    </Link>
                    <Button style={{width:'4.5rem'}} onClick={logoutHandler}>로그아웃</Button>
                </ButtonDiv>
            </InfoDiv>
        </ContentDiv>
    );
};

export default UserInfo;