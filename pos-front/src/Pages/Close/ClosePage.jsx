import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SmallModal from '../../Components/Modal/SmallModal';
import { Link, Routes, Route } from 'react-router-dom';
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import axios from 'axios';
import {Paper, TableContainer} from "@material-ui/core";

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

const Title = styled.h1`
    text-align:center;
`;
const Form = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;
const Text = styled.h2`
    margin-top : 5%;
    text-align : center;
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

const TableStyle = styled.table`
    width: 80%;
    margin : 0 auto;
    margin-top : 5%;
    max-height : 5rem;
`;

const ClosePage = () => {

    const navigate = useNavigate();
    const date = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16);


    const [visible, setVisible]=useState(false);
    const [stats,setStats]=useState([]); //기본
    const [total,setTotal] = useState(0);
    
    useEffect(()=>{
        setTotal(stats.reduce(
            (accumulator, currentValue) => accumulator + (+currentValue.price)
            ,0
        ));
    },[stats])

    useEffect(async ()=>{
        const date = new Date();
        const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        const managerId = window.localStorage.getItem('managerId');
        
        const data={
            branchId : managerId,
            stDate : today,
            enDate : today
        }
        console.log(data);
        await axios.post('http://localhost:8080/menuStatistic/getAll',data,{
        headers : {
        "Content-Type" : "application/json",
    }}).then((res)=>{
        console.log(res.data);
        setStats(res.data);
        
    }).catch(e=>{
        console.log(e);
    })


    },[])




    const logoutHandler = (e)=>{
        e.preventDefault();
        window.localStorage.clear();
        alert("로그아웃 되었습니다.");
        navigate('/');        
    }

    const finishClick = ()=>{
        setVisible(true);
    }

    return (
        <>
        <Header text ={"마감"} restaurantName = {localStorage.getItem('storeName')}/>
        <div style={{width : '80%', display:'flex', flexDirection : 'row'}}>
        <TableContainer style={{marginLeft:'5%',marginTop :'10vh',height : '70%',overflow: 'hidden', width : "100%"}}>
            <TableStyle style={{overflow:'auto', width:'100%'}}>
                <TableHead style={{height : '4vh'}}>
                    <OrderRow>
                        <ColumnCell>NO</ColumnCell>
                        <ColumnCell>메뉴</ColumnCell>
                        <ColumnCell>수량</ColumnCell>
                        <ColumnCell>판매금액</ColumnCell>
                    </OrderRow>
                </TableHead>
                <TableBody>
                    {stats.length>0 && stats.map((cell, index) => (
                        <OrderRow style={{height : '3.8vh'}}>
                            <OrderCell component="th" scope="cell">{index+1}</OrderCell>
                            <OrderCell>{cell.menuName}</OrderCell>
                            <OrderCell>{cell.orderQuantity}</OrderCell>
                            <OrderCell>{cell.price.toLocaleString()}</OrderCell>
                        </OrderRow>
                    ))}
                </TableBody>
            </TableStyle>                                    
        </TableContainer>
        <div style={{width : "20%",marginLeft : "10vw",display :'flex', flexDirection : 'column', justifyContent : 'center',
            alignItems:'center' }}>
            <TableContainer style={{marginLeft:'5%',marginTop :'10vh',height : '70%',overflow: 'hidden',}}>
                <TableStyle style={{overflow:'auto', width:'100%'}}>
                    <TableHead style={{height : '4vh'}}>
                        <OrderRow>
                            <OrderCell>총 매출</OrderCell>
                            <OrderCell>{total.toLocaleString()}</OrderCell>
                        </OrderRow>
                    </TableHead>
                    <TableBody>
                    <OrderRow>
                            <OrderCell>부가세</OrderCell>
                            <OrderCell>{(total*0.1).toLocaleString()}</OrderCell>
                        </OrderRow>
                        <OrderRow>
                            <OrderCell>순매출</OrderCell>
                            <OrderCell>{(total*0.9).toLocaleString()}</OrderCell>
                        </OrderRow>
                    </TableBody>
                </TableStyle>                
            </TableContainer>   
                                

            <SmallModal visible={visible}>
                    <Form>
                        <Title>{date}</Title>
                        <Text>마감을 진행하겠습니까?</Text>
                        <Button style={{width:'4.5rem'}} onClick={logoutHandler}>예(홈으로 이동)</Button>
                        <Button onClick={()=>{setVisible(false)}}>아니요</Button>
                    </Form>
            </SmallModal>
            <div style={{display :'flex', flexDirection : 'row'}}>
                <Link to = "/employeeManagement"><Button>직원관리</Button></Link>    
                <Link to = "/restaurantManagement/stock"><Button>재고 관리</Button></Link>
                <Button style={{width:'4.5rem'}} onClick={finishClick}>영업마감</Button>
            </div>
            
        </div> 
        </div>
        </>
    );
};

export default ClosePage