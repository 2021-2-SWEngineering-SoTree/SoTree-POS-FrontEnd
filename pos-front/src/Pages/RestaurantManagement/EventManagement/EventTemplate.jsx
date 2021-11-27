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
    height : 50vh;
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
    height : 50vh;
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
    font-size : 2.5rem;
    font-weight : bold;
`;

const TableStyle = styled.table`
    width: 80%;
    margin : 0 auto;
    margin-top : 5%;
    max-height : 5rem;
    overflow : auto;
`;

const OrderCell = styled.td`
    color: #000000;
    font-size: 20px;
    text-align: center;
    height : 6vh;
`;

const OrderRow = styled.tr`
    background-color: ${props => props.checked ? '#E4E6E7': '#F2F8F9'};
    &:focus&:within {
        background: #FF0000;
    };
`;

const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 25px;
    text-align: center;
    font-weight : bold;
`;

const EventTemplate = () => {

    const [events, setEvents] = useState([]); //eventlist
    const [addEvent, setAddEvent] = useState(false);
    const [changeEvent, setChangeEvent] = useState(false);
    const [deleteEvent, setDeleteEvent] = useState(false);

    //테이블에서 선택한 메뉴의 인덱스
    const [index, setIndex]=useState('');
    const [selectedEvent, setSelectedEvent]=useState('');

    const getIndex=(index)=>{
        setIndex(index);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        let managerId = window.localStorage.getItem('managerId');
        await axios.post(`http://localhost:8080/event/getAllEvent/${managerId}`,{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            setEvents(res.data);
            console.log("가져온 Event 값 :",res.data);
        }).catch(e=>{
            console.log(e);
        })
    },[])

    const onClickAdd = () => {
        setAddEvent(!addEvent);
    }

    const onClickChange = () => {
        if(index >= '0'){
            setChangeEvent(!changeEvent);
        }else{
            alert("이벤트를 선택해주세요")
        }
    }

    const onClickDelete = () => {
        if(index >= '0'){
            setDeleteEvent(!deleteEvent);
        }else{
            alert("이벤트를 선택해주세요")
        }
    }

    const eventSelectHandler = (index, e) =>{
        e.preventDefault();
        setIndex(index);
        console.log("event Select", index)
    }

    useEffect(()=>{
        if(index){
            ref.current.focus();
            console.log(ref)
        }
    },[index])


    let ref = useRef();

    return (
        <>
        
        <MidModal visible={addEvent}>
            <AddEvent/>
        </MidModal>
        <MidModal visible={changeEvent}>
            <ChangeEvent event={events} index = {index === '0' ? +0 : index}/>
        </MidModal>

        <SmallModal visible={deleteEvent}>
            <DeleteEvent event={events} index = {index=== '0' ? +0 : index}/>
        </SmallModal>
        
        <Header text ={"이벤트 관리"} restaurantName = {localStorage.getItem('storeName')}/>
        <LeftDiv>
            <LeftTopDiv style={{marginTop:'10vh'}}>
                <Title>현재 이벤트 목록</Title>
            </LeftTopDiv>
            <LeftBottomDiv>
                            <TableContainer style={{marginTop:'-5%',overflow: 'hidden'}}>
                                <TableStyle style={{overflow:'auto', width:'80%'}}>
                                    <TableHead style={{height : '4vh'}}>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>이벤트</ColumnCell>
                                            <ColumnCell>할인</ColumnCell>
                                            <ColumnCell>최소충족금액</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                        {events.length>0 && events.map((cell, index) => (
                                        index<11 &&
                                        <OrderRow style={{height : '3.8vh'}} onClick={(e)=>{eventSelectHandler(index,e)}} ref={ref}>
                                            <OrderCell component="th" scope="cell">{index+1}</OrderCell>
                                            <OrderCell>{cell.eventName}</OrderCell>
                                            <OrderCell>{cell.eventDiscountValue === null ? cell.eventDiscountRate*100+"%" : cell.eventDiscountValue.toLocaleString()}</OrderCell>
                                            <OrderCell>{cell.criticalPoint.toLocaleString()+"원"}</OrderCell>
                                        </OrderRow>
                                    ))}
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