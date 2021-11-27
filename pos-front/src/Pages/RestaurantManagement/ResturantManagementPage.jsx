import React from 'react';
import styled from 'styled-components';
import SoTree_Main_Logo from '../../Assets/SoTree_Vector_Logo.svg';
import { Route, Link, Routes } from 'react-router-dom';
import MenuTemplate from './MenuManagement/MenuTemplate';
import SeatTemplate from './SeatManangement/SeatTemplate';
import StockTemplate from './StockManagement/StockTemplate';
import EventTemplate from './EventManagement/EventTemplate';

import Header from '../../Components/Header';


const Div = styled.div`
    max-width: 1980px;
    padding: 20px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height : 680px;
`;
const LeftDiv = styled.div`
    width : 100%;
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
    align-items : center;
`;

const RightDiv = styled.div`
    width : 60%;
    margin : 0 auto;
    align-items: center
`;

const InnerRightDiv = styled.div`
    vertical-align : middle;
    text-align: center;
    margin-top : 18vh;
    align-items : center;
`;

const LogoImg = styled.img`
    width : 700px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const Button = styled.button`
    top:50%;
    width : 25rem;
    height : 4.5rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size : 1.3rem;
    margin-bottom : 2.5rem;
    
`;

const RestaurantManagementPage = () => {
    return (
        <>
        <Header text ={"매장 관리"} restaurantName = {localStorage.getItem('storeName')}/>
        <Div>
            <LeftDiv>
                <LogoDiv>
                    <LogoImg src = {SoTree_Main_Logo} alt="Logo"/>
                </LogoDiv>
            </LeftDiv>
            <RightDiv>
                <InnerRightDiv>
                    <Link to = "/restaurantManagement/menu"><Button>메뉴 관리</Button></Link>
                    <Link to = "/restaurantManagement/stock"><Button>재고 관리</Button></Link>
                    <Link to = "/restaurantManagement/event"><Button>이벤트 관리</Button></Link>
                    <Link to = "/restaurantManagement/seat"><Button>좌석 관리</Button></Link>
                </InnerRightDiv>
            </RightDiv>
            <Routes>
                <Route path="/restaurantManagement/menu" element={<MenuTemplate/>} />
                <Route path="/restaurantManagement/stock" element={<StockTemplate/>} />
                <Route path="/restaurantManagement/seat" element={<SeatTemplate/>} />  
                <Route path="/restaurantManagement/event" element={<EventTemplate/>} />  
            </Routes>
        </Div>
        </>
    );
};

export default RestaurantManagementPage;