import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header from '../../../Components/Header';
import MidModal from '../../../Components/Modal/MidModal';
import SmallModal from '../../../Components/Modal/SmallModal';
import AddEvent from './AddEvent';
import ChangeEvent from './ChangeEvent';
import DeleteEvent from './DeleteEvent';
import {TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

import axios from 'axios';

const LeftDiv = styled.div`
    width : 50vw;
    margin : 2rem 2rem;
    gap : 1em;
    height : 44rem;
    float : left;
    text-align:center; //중앙정렬
    margin-left : 12em;
`;

const LeftTopDiv = styled.div`
    display : flex;
    width : 78rem;
    display: inline-block; //중앙정렬
`;

const LeftBottomDiv = styled.div`
    margin : 2rem 0rem;
    height : 35rem;
    width : 78rem;
    display: inline-block;
`;

const RightDiv = styled.div`
    width: 27vw;
    margin : 2rem 2rem;
    flex-wrap: nowrap;
    gap: 1em;
    height : 44rem;
    float:right;
    padding-top : 13rem;
    padding-left : 3rem;
`;

const Button = styled.button`
    width : 20rem;
    height : 4.5rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size : 1.3rem;
    margin-bottom : 3.6rem;
    cursor : pointer;
    
`;

const Title=styled.div`
    margin : 1rem;
    font-size : 2rem;
    font-weight : bold;
`;

const TableStyle = styled.table`
    width: 80%;
    margin : 0 auto;
    margin-top : 5%;
    max-height : 5rem;
`;

const OrderCell = styled.td`
    color: #000000;
    font-size: 20px;
    text-align: center;
`;

const OrderRow = styled.tr`
    background-color: ${props => props.checked ? '#E4E6E7': '#F2F8F9'};
    &:focus {
        background: #FF0000;
    }
`;

const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 20px;
    text-align: center;
`;

const EventTemplate = () => {

    const [events, setEvents] = useState([]); //eventlist
    const [addEvent, setAddEvent] = useState(false);
    const [changeEvent, setChangeEvent] = useState(false);
    const [deleteEvent, setDeleteEvent] = useState(false);

    //테이블에서 선택한 메뉴의 인덱스
    const [index, setIndex]=useState(-1);
    const [selectedEvent, setSelectedEvent]=useState('');

    const getIndex=(index)=>{
        setIndex(index);
    }

    // useEffect(()=>{
    //     if(index>-1 && index<categoryMenus.length) {
    //         console.log('바뀜');
    //         setSelectedMenu(categoryMenus[index].menuName);
    //         setSelectedId(categoryMenus[index].id);
    //         setSelectedPrice(categoryMenus[index].price);
    //         setSelectedCategory(categoryMenus[index].menuCategory);
    //     }
    //     else {
    //         setSelectedMenu('');
    //         setSelectedId(-1);
    //         setSelectedPrice(0);
    //         setSelectedCategory('');
    //     }
    // },[index])

    const onClickAdd = () => {
        setAddEvent(!addEvent);
    }

    const onClickChange = () => {
        setChangeEvent(!changeEvent);
    }

    const onClickDelete = () => {
        setDeleteEvent(!deleteEvent);
    }

    return (
        <>
        
        <MidModal visible={addEvent}>
            <AddEvent/>
        </MidModal>
        <MidModal visible={changeEvent}>
            <ChangeEvent menu={selectedEvent}/>
        </MidModal>

        <SmallModal visible={deleteEvent}>
            <DeleteEvent menu={selectedEvent}/>
        </SmallModal>
        
        <Header text ={"이벤트 관리"} restaurantName = {localStorage.getItem('storeName')}/>
        <LeftDiv>
            <LeftTopDiv style={{marginTop:'3%'}}>
                <Title>현재 이벤트 목록</Title>
            </LeftTopDiv>
            <LeftBottomDiv>
                            <TableContainer style={{marginTop:'-5%',overflow: 'hidden'}}>
                                <TableStyle style={{overflow:'auto', width:'60%'}}>
                                    <TableHead style={{height : '4vh'}}>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>이벤트</ColumnCell>
                                            <ColumnCell>할인</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    {/* event 목록 나열.
                                        {sales.length>0 && sales.map((cell, index) => (
                                        index<11 &&
                                        <OrderRow style={{height : '3.8vh'}}>
                                            <OrderCell component="th" scope="cell">{index+1}</OrderCell>
                                            <OrderCell>{cell.menuName}</OrderCell>
                                            <OrderCell>{cell.price.toLocaleString()}</OrderCell>
                                        </OrderRow>
                                    ))} */}
                                    <OrderRow style={{height : '3.8vh'}}>
                                            <OrderCell onClick={(e)=>{console.log("##")}}>1</OrderCell>
                                            <OrderCell>{'11월 행사'}</OrderCell>
                                            <OrderCell>{'30%'}</OrderCell>
                                        </OrderRow>
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
            </LeftBottomDiv>
        </LeftDiv>

        <RightDiv>
                <Button onClick={onClickAdd}>이벤트 생성</Button>
                <Button onClick={onClickChange}>이벤트 변경</Button>
                <Button onClick={onClickDelete}>이벤트 삭제</Button>
        </RightDiv>
        </>
    );
};

export default EventTemplate;