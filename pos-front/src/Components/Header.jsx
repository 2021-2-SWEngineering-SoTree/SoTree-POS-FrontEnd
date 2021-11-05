import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SoTree_Main_Logo from '../Assets/SoTree_Vector_Logo.svg'

const HeaderDiv = styled.div`
    min-width : 810px;
    height : 5.5rem;
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

const Header = ({text,restaurantName}) => {

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
                <LogoDiv src = {SoTree_Main_Logo}/>
                <PageName>{text}</PageName>
            </LeftDiv>
            <RightDiv>
                <RestaurantNameDiv>{restaurantName}</RestaurantNameDiv><br/>
                <TimeName>{time}</TimeName>
            </RightDiv>
        </HeaderDiv>
    );
};

export default Header;