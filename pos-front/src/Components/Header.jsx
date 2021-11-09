import React, { useEffect, useState, memo } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import styled from 'styled-components';
import SoTree_Main_Logo from '../Assets/SoTree_Vector_Logo.svg'
import { AiOutlineArrowLeft } from "react-icons/ai";
const HeaderDiv = styled.div`
    min-width : 810px;
    height : 5.9rem;
    display : flex;
    background-color : #D7FAFF;
    padding : 0;
    margin : 0;
`;

const LogoDiv = styled.img`
    width : 12rem;
    height : 5rem;
    padding : 0;
    margin : 0;
`;

const PageName = styled.div`
    height : 5rem;
    margin-left : 3rem;
    font-size : 3.5rem;
`;

const TimeName = styled.div`
    margin-top : -1rem;
    font-size : 1.8rem;
`;

const RestaurantNameDiv = styled.div`
    font-size : 1.8rem;
    margin-top : 0.5rem;
    width : 100%;
`;


const RightDiv = styled.div`
    text-align : right;
    max-width : 500px
    float : right;
    width : 40%;
    margin-right : 2rem;
`;

const LeftDiv = styled.div`
    display : flex;
    float : left;
    width : 60%;
`;

const BackButton = styled.button`
    width : 5rem;
    height : 5rem;
    background: #474D4E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin : 0.3rem;
    border-radius: 30px;
`;

const Header = memo(({text,restaurantName}) => {

    const navigate = useNavigate();
    const logoClickHandler = ()=>{
        console.log("Logo Clicked");
    }

    const [time, setTime] = useState(new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16));

    useEffect((()=>{
        console.log("time changed");
    }),[time])

    setTimeout(()=> {
        setTime(new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16));
      }, 60000);

    return (
        <HeaderDiv>
            <LeftDiv>
                <Link to={window.localStorage.getItem('Token') ? "/homePage" : "/"}>
                    <LogoDiv onClick= {logoClickHandler} src = {SoTree_Main_Logo}/>
                </Link>
                <PageName>{text}</PageName>
            </LeftDiv>
            <RightDiv>
                <div style={{display:'flex', flexDirection:'row', float : 'right'}}>
                    <div>
                        <BackButton onClick={() => navigate(-1)}>
                            <AiOutlineArrowLeft style={{color:'white', fontSize:'2.5rem'}}/>
                        </BackButton>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', marginLeft:'2rem'}}>
                        <RestaurantNameDiv>{restaurantName}</RestaurantNameDiv><br/>
                        <TimeName>{time}</TimeName>
                    </div>
                </div>

            </RightDiv>
        </HeaderDiv>
    );
});

export default Header;