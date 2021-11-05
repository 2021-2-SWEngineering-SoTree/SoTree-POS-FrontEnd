import React from 'react';
import styled from 'styled-components';
import SoTree_Main_Logo from '../../Assets/SoTree_Vector_Logo.svg';
import { Route, Link, Routes } from 'react-router-dom';
import MenuAvgTimeTemplate from './MenuAvgTime/MenuAvgTimeTemplate';
import MenuSalesTemplate from './MenuSales/MenuSalesTemplate';
import SalesTemplate from './Sales/SalesTemplate';

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

const RightDiv = styled.div`
    width : 70%;
    margin : 0 auto;
    align-items: center
`;

const InnerRightDiv = styled.div`
    vertical-align : middle;
    text-align: center;
    margin-top : 202px;
    align-items : center;
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
    top:50%;
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


const RestaurantSalesHomePage = () => {
    return (
        <>
        <Div>
            <LeftDiv>
                <LogoDiv>
                    <LogoImg src = {SoTree_Main_Logo} alt="Logo"/>
                </LogoDiv>
            </LeftDiv>
            <RightDiv>
            <InnerRightDiv>
                <Link to = "/menusales"><Button>메뉴 통계</Button></Link>
                <Link to = "/sales"><Button>매상 통계</Button></Link>
                <Link to = "/menuavgtime"><Button>메뉴별 평균 시간 정보</Button></Link>
            </InnerRightDiv>
            </RightDiv>
            <Routes>
                <Route path="/menusales" element={<MenuAvgTimeTemplate/>} />
                <Route path="/sales" element={<MenuSalesTemplate/>} />
                <Route path="/menuavgtime" element={<SalesTemplate/>} />  
            </Routes>
        </Div>
        </>
    );
};

export default RestaurantSalesHomePage;