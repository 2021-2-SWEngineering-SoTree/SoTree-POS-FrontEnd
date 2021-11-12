import React from 'react';
import styled from 'styled-components';
import SoTree_Main_Logo from '../Assets/SoTree_Vector_Logo.svg'
import UserInfo from '../Components/UserInfo';
import ResturantManagementPage from './RestaurantManagement/ResturantManagementPage';
import RestaurantSalesHomePage from './RestaurantSalesHome/RestaurantSalesHomePage';
import ClosePage from './Close/ClosePage';
import EmployeeManagementPage from './EmployeeManagement/EmployeeManagementPage';
import SalePage from './Sale/SalePage';

import { Link, Routes, Route } from 'react-router-dom';

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
    width : 230rem;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content: center;
    align-items : center;
    margin-top : -4rem;
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

const Button = styled.button`
    width : 20rem;
    height : 4rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size : 1.3rem;
    margin : 1rem 0 1rem 0;
`;

const HomePage = () => {

    let name = window.localStorage.getItem('userName');
    let storeName = window.localStorage.getItem('storeName');
    
    return (
        <Div>
        <Routes>
            <Route path="/restaurantManagement" element={<ResturantManagementPage/>}/>
            <Route path="/restaurantSalesHome" element={<RestaurantSalesHomePage/>}/>
            <Route path="/sale" element={<SalePage/>}/>
            <Route path="/close" element={<ClosePage/>}/>
            <Route path="/employeeManagement" element={<EmployeeManagementPage/>}/>
        </Routes>
        <LeftDiv>
            <LogoDiv>
                <LogoImg src = {SoTree_Main_Logo} alt="Logo"/>
            </LogoDiv>
        </LeftDiv>
        <LoginDiv>
            <UserInfo RestaurantName={storeName} EmpolyeeName={name}/>
            <Link to = "/CurrentSeatInfo"><Button>판매</Button></Link>
            <Link to = "/restaurantManagement"><Button>매장관리</Button></Link>
            <Link to = "/restaurantSalesHome"><Button>매출현황</Button></Link>
            <Link to = "/employeeManagement"><Button>직원관리</Button></Link>
            <Link to = "/close"><Button>마감</Button></Link>
        </LoginDiv>
    </Div>
    );
};

export default HomePage;