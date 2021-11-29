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
    width : 13rem;
    height : 4rem;
    background-color : #EBE7E7;
    margin-bottom : 1.7rem;
    font-size : 1.7rem;
    margin-right : 1rem;
    border-radius : 13px;
    box-shadow : 0 1px;
`;

const Title = styled.h1`
    float:center;
    text-align:center;
    background-color:#F2F2F2;
    border-radius:10px;
    width:70%;
`;
const Form = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;
const Text = styled.h1`
    margin-top : 15%;
    text-align : center;
`;

const OrderCell = styled.td`
    color: #000000;
    font-size: 20px;
    text-align: center;
    border : 1px solid black;
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
    border:1px solid black;
`;

const TableStyle = styled.table`
    width: 80%;
    margin : 0 auto;
    margin-top : 5%;
    max-height : 5rem;
`;

const Titles=styled.div`
    float:left;
    margin-left:7rem;
    margin-top:6rem;
    font-size : 2.4rem;
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


    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <SmallModal visible={visible}>
                    <Form>
                        <center><Title>{date}</Title></center>
                        <Text>마감을 진행하시겠습니까?</Text>
                        <div style={{display:'flex', justifyContent:'center', marginTop:'20%'}}>
                        <Button style={{width:'56%'}} onClick={logoutHandler}>예(홈으로 이동)</Button>
                        <Button style={{width:'30%'}} onClick={()=>{setVisible(false)}}>아니요</Button>
                        </div>
                    </Form>
        </SmallModal>

        <Header text ={"마감"} restaurantName = {localStorage.getItem('storeName')}/>
        <div style={{height : '89vh', width : '99vw', display:'flex', flexDirection : 'row'}}>
        <div style={{width:'60%'}}>
            <Titles>당일 매출 현황</Titles>
            <TableContainer style={{marginLeft:'5%',marginTop :'1vh',height : '70%',overflow: 'hidden', width : "90%"}}>
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
                                <OrderCell>{(+cell.price).toLocaleString()}</OrderCell>
                            </OrderRow>
                        ))}
                    </TableBody>
                </TableStyle>                                    
            </TableContainer>
        </div>
        <div style={{width : "40%",display :'flex', flexDirection : 'column', justifyContent : 'center',
            alignItems:'center' }}>
            <TableContainer style={{width:'60%', marginLeft:'-2%',marginTop :'9vh', marginBottom:'6vh',height : '40%',overflow: 'hidden',}}>
                <TableStyle style={{border:'1px solid black', overflow:'auto', width:'100%'}}>
                    <TableHead >
                        <OrderRow style={{border:'1px solid black'}}>
                            <OrderCell style={{width : '30%', height : '8vh'}}>총 매출</OrderCell>
                            <OrderCell>{total.toLocaleString()}</OrderCell>
                        </OrderRow>
                    </TableHead>
                    <TableBody>
                    <OrderRow>
                            <OrderCell style={{height : '8vh'}}>부가세</OrderCell>
                            <OrderCell>{(total*0.1).toLocaleString()}</OrderCell>
                        </OrderRow>
                        <OrderRow>
                            <OrderCell style={{height : '8vh'}}>순매출</OrderCell>
                            <OrderCell>{(total*0.9).toLocaleString()}</OrderCell>
                        </OrderRow>
                    </TableBody>
                </TableStyle>                
            </TableContainer>   

            <div style={{display:'flex'}}>        
            <Link to = "/employeeManagement"><Button onClick={()=>alert("직원 관리 페이지로 이동합니다")}>직원 관리</Button></Link>
            &nbsp;&nbsp;&nbsp;
            <Link to = "/restaurantManagement/stock"><Button onClick={()=>alert("재고 관리 페이지로 이동합니다")}>재고 관리</Button></Link>
            </div>
            <br/>
            <Button onClick={finishClick}>영업 마감</Button>
        </div> 
        </div>
        </>
    );
};

export default ClosePage