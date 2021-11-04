import React from 'react';
import styled from 'styled-components';
import SoTree_Main_Logo from '../Assets/SoTree_Vector_Logo.svg'
import UserInfo from '../Components/UserInfo';
import { Link } from 'react-router-dom';

const Div = styled.div`
    max-width: 1980px;
    padding: 20px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height : 680px;
`;
const LeftDiv = styled.div`
    width : 200%;
    height : 100%;
    flex-grow : 1;
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
    width : 70%;
    justify-content: center;
`;

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

const Button = styled.button`
    width : 20rem;
    height : 4rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size : 1.3rem;
    margin-bottom : 1rem;
`;

const HomePage = () => {
    return (
        <Div>
            <LeftDiv>
                <LogoDiv>
                    <LogoImg src = {SoTree_Main_Logo} alt="Logo"/>
                </LogoDiv>
            </LeftDiv>
            <LoginDiv>
                <UserInfo/>
                <Link to = "/sale"><Button>판매</Button></Link>
                <Link to = "/restaurantManagement"><Button>매장관리</Button></Link>
                <Link to = "/restaurantSalesHome"><Button>매출현황</Button></Link>
                <Link to = "/employeeManagement"><Button>직원관리</Button></Link>
                <Link to = "/close"><Button>마감</Button></Link>
            </LoginDiv>
        </Div>
    );
};

export default HomePage;