import React, { useEffect, useState, useRef } from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import Table from '../../../Components/Table/Table'
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { useParams,useLocation } from 'react-router-dom';
import axios from 'axios';


const PageWrapper = styled.div`
    justify-content : center;
    margin : 5rem;
    display : flex;
`;

const Form = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 1rem;
    }
    justify-content : left;
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
`;

const CategorySelector = styled.select`
    height : 3.2rem;
    width : 15rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 2.0rem;
    margin-left: 1.0rem;
`;

const InputLable = styled.label`
    font-size : 1.5rem;
    float: left;
`;

const Div = styled.div`
  max-width: 1980px;
  flex-wrap: nowrap;
  display: flex;
  gap: 1em;
  height: 600px;
`;

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 2rem;
    text-align: center;
    padding : 10px;
    font-weight : bold;
`;

// td style
const StockDetailCell = styled.td`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 1.5rem;
    text-align: center;
    padding : 0.8rem;
    color : ${(props)=> props.colors !== ""? props.colors : "#000000"};
    
`;

// tr style
const StockDetailRow = styled.tr`
    background-color: #FFFFFF
`;

// table style
const StockDetailTableStyle = styled.table`
    min-width: 700px;
    width: 100%;
`;

const StockDetail = () => {

    const params = useParams();
    const location = useLocation();

    let didMount = useRef();
    
    useEffect(async ()=>{
        await getStockDetailsHandler();
        didMount.current = true;
        },[])

const [stockDetails, setStockDetails] = useState([]);
const [selectionStockName, setSelectionStockName] = useState([]);
const [stock, setStock] = useState([]);

const getStockDetailsHandler = async() =>{
    const managerId = window.localStorage.getItem('managerId');
    const stockName = location.state;
    const data = JSON.stringify({
        managerId : managerId,
        stockName : stockName
    })
    await axios.post('http://localhost:8080/stock/getAllStockDetailsOnSelectionStock',data,{
        headers : {
        "Content-Type" : `application/json`,
    }}).then(async(res)=>{
        const stock_temp = await getStocksWithOutActive();
        setStock(stock_temp.data);
        setStockDetails(res.data);
        console.log("가져온 stockDetail 값 :", res.data);
        console.log("가져온 getStock 값 :",stock_temp);
        setSelectionStockName(stockName);
    }).catch(async(e)=>{
        console.log("에러지점", e);
        setSelectionStockName(stockName);
        const stock_temp = await getStocksWithOutActive();
        setStock(stock_temp.data);
    })
}

const getOtherStockDetailHandler = async(stockName) =>{
    const managerId = window.localStorage.getItem('managerId');
    const data = JSON.stringify({
        managerId : managerId,
        stockName : stockName
    })
    await axios.post('http://localhost:8080/stock/getAllStockDetailsOnSelectionStock',data,{
        headers : {
        "Content-Type" : `application/json`,
    }}).then((res)=>{
        setStockDetails(res.data);
        console.log("가져온 stockDetail 값 :", res.data);
        setSelectionStockName(stockName);
    }).catch(e=>{
        console.log(e);
        setStockDetails([]);
    })
}

useEffect(()=>{
    if(didMount.current){
        getOtherStockDetailHandler(selectionStockName);
    }
},[selectionStockName])

const getStocksWithOutActive =  async() =>{
    let managerId = window.localStorage.getItem('managerId');
  return axios.post('http://localhost:8080/stock/getAllStockWithOutActiveCondition',managerId,{
        headers : {
        "Content-Type" : `application/json`,
    }})
}

    return (
        <>
            <Header text ={"재고 추적 내역"} restaurantName = {localStorage.getItem('storeName')}/>
            <PageWrapper>
                <Form>
                    <WrapperDiv>
                        <InputLable style ={{fontWeight : 'bold', fontSize : '1.8rem', marginTop : '-1.5rem'}}>[{selectionStockName}] 재고 추적 내역 리스트</InputLable>
                        <InputLable style ={{fontWeight : 'bold', fontSize : '1.8rem',}}>재고 변경
                            <CategorySelector onChange={(e)=>setSelectionStockName(e.target.value)}>
                                {
                                    stock.map((s, index)=>
                                    <>
                                        <option value={s.stockName} selected = {s.stockName === selectionStockName ? true: false}>{s.stockName}</option>
                                    </>)
                                }
                            </CategorySelector>
                        </InputLable>
                    </WrapperDiv>
                    <Div>
                    <WrapperDiv>
                        <TableContainer component={Paper} margin='10px' style={{overflow:'scroll', width : '80vw'}}>
                            <StockDetailTableStyle>
                                <TableHead>
                                    <StockDetailRow>
                                        <ColumnCell>날짜</ColumnCell>
                                        <ColumnCell>담당</ColumnCell>
                                        <ColumnCell>이전 수량</ColumnCell>
                                        <ColumnCell>변경 수량</ColumnCell>
                                        <ColumnCell>변경 후 수량</ColumnCell>
                                        <ColumnCell>메모</ColumnCell>
                                    </StockDetailRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    stockDetails.length > 0 ? 
                                    stockDetails.map((cell) => (
                                        <StockDetailRow>
                                            <StockDetailCell component="th" scope="cell">{cell.time.substr(0,16)}</StockDetailCell>
                                            <StockDetailCell>{cell.employee !== null ? cell.employee.user.personName : "관리자"}</StockDetailCell>
                                            <StockDetailCell>{cell.finalQuantity - cell.quantityChanged}</StockDetailCell>
                                            <StockDetailCell colors = {cell.quantityChanged > 0 ? "" : "#FF0000"}>{cell.quantityChanged}</StockDetailCell>
                                            <StockDetailCell>{cell.finalQuantity}</StockDetailCell>
                                            <StockDetailCell>{cell.memo}</StockDetailCell>
                                        </StockDetailRow>
                                    ))
                                : <>
                                    <StockDetailRow>
                                        <StockDetailCell style ={{fontWeight : 'bold'}}>데이터가 없습니다. 다시 시도해주세요</StockDetailCell>
                                    </StockDetailRow>
                                  </>}
                                </TableBody>
                            </StockDetailTableStyle>
                        </TableContainer>
                    </WrapperDiv>
                    </Div>
                </Form>
            </PageWrapper>
        </>
    );
};

export default StockDetail;