import React from 'react';
import styled from 'styled-components';
import { BsFillCreditCard2BackFill,  } from "react-icons/bs";
import SmallTable from "../../../Components/Table/SmallTable";
import { MdOutlineInput } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const BottomButton = styled.button`
    background-color : #474D4E;
    color : white;
    height : 95%;
    width : 13.6%;
    font-size:1.3rem;
    cursor : pointer;
    margin : 0.2rem;
    border-radius : 15px;
`

const CategoryButton = styled.button`
    background-color : #474D4E;
    border-radius : 15px;
    color : #FFFFFF;
    height : 5.3rem;
    width : 13.9%;
    margin : 0.1rem;
    text-align : center;
    font-size : 1.3rem;
    cursor : pointer;
    &:focus {
        background: #8DDEE9;
    }
`

const RightTopDiv = styled.div`
    height : 79%;
    border : 1px solid black;
    margin-bottom : 0.5rem;
`;

const RightTopTopDiv = styled.div`
    height : 15%;
    border : 1px solid black;
    text-align:center;
`;

const RightTopBottomDiv = styled.div`
    height : 85%;
    border : 1px solid black;
`;

const RightBottomDiv = styled.div`
    height : 20%;
    border : 1px solid black;
`;
const SaleDefaultMenuPage = ({onClickCategoryButton, categoryMenus, getIndex, makeOrderHandler, backClickHandler, changeDiv, btnClick}) => {

    const categoryButtonHandler = (e)=> onClickCategoryButton(e);

    let navigation = useNavigate();

    const cashPayHandler = (e)=>{
    }

    const changeDivHandler = (e)=> {changeDiv(e);}

    return (
        <>
        <RightTopDiv>
                        <RightTopTopDiv>
                            <CategoryButton id = '세트메뉴' name={'세트메뉴'} onClick={categoryButtonHandler}>세트메뉴</CategoryButton>
                            <CategoryButton id = '2~3인분메뉴' name={'2~3인분메뉴'} onClick={categoryButtonHandler}>2~3인분메뉴</CategoryButton>
                            <CategoryButton id = '식사메뉴' name={'식사메뉴'} onClick={categoryButtonHandler}>식사메뉴</CategoryButton>
                            <CategoryButton id = '사이드메뉴' name={'사이드메뉴'} onClick={categoryButtonHandler}>사이드메뉴</CategoryButton>
                            <CategoryButton id = '후식메뉴' name={'후식메뉴'} onClick={categoryButtonHandler}>후식메뉴</CategoryButton>
                            <CategoryButton id = '추가메뉴' name={'추가메뉴'} onClick={categoryButtonHandler}>추가메뉴</CategoryButton>
                            <CategoryButton id = '주류/음료' name={'주류/음료'} onClick={categoryButtonHandler}>주류/음료</CategoryButton>
                        </RightTopTopDiv>
                        <RightTopBottomDiv>
                            <SmallTable menu={categoryMenus} getIndex={getIndex} width={'100%'} height={'100%'}/>
                        </RightTopBottomDiv>
        </RightTopDiv>
        <RightBottomDiv>
                        <BottomButton onClick={makeOrderHandler}><MdOutlineInput/>주문</BottomButton>
                        <BottomButton onClick={()=>btnClick(1)}><BsFillCreditCard2BackFill/>현금</BottomButton>
                        <BottomButton onClick={()=>btnClick(2)}><GiMoneyStack/>신용카드</BottomButton>
                        <BottomButton onClick={()=>btnClick(3)}>복합결제</BottomButton>
                        <BottomButton onClick={backClickHandler}><IoMdArrowRoundBack/>돌아가기</BottomButton>
                        <BottomButton onClick={()=>btnClick(6)}>영수증관리</BottomButton>
                        <BottomButton>음식완성알림</BottomButton>
        </RightBottomDiv>
        </>
    );
};

export default SaleDefaultMenuPage;

