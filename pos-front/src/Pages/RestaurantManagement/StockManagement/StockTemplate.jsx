import React, {useEffect, useState} from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import {Modal, SmallModal} from '../../../Components/Modal';
import DeleteStock from './DeleteStock';
import { Link } from 'react-router-dom';
import AddStock from "./AddStock";
import StockTable from "./StockTable/StockTable";
import ChangeStock from "./ChangeStock";
import axios from 'axios';

const LeftDiv = styled.div`
    width : 70%;
    margin : 2rem;
    gap : 1em;
    height : 80vh;
    float : left;
    text-align:center; //중앙정렬
`;

const RightDiv = styled.div`
    width: 25%;
    flex-wrap: nowrap;
    gap: 1em;
    height : 35rem;
    float:right;
    margin-top : 10rem;
    margin-right : -3rem;
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
    margin-bottom : 4rem;
    cursor : pointer;
    
`;
  
const StockTemplate = () => {

    const [addStock, setAddStock] = useState(false);
    const [changeStock, setChangeStock] = useState(false);
    const [deleteStock, setDeleteStock] = useState(false);

    const [clickedIndex, setClickedIndex] = useState('');

    const [stock, setStock] = useState([]);

    const getClickedIndex = (index) => {
        console.log("cell clicked", index);
        setClickedIndex(index);
    }

    const onClickAdd = () => {
        setAddStock(!addStock);
    }

    const onClickChange = () => {
        setChangeStock(!changeStock);
    }

    const onClickDelete = () => {
        setDeleteStock(!deleteStock);
    }

    const getStocks =  async() =>{
        await axios.post('http://localhost:8080/stock/getAll','1',{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            setStock(res.data);
            console.log(res.data);
        }).catch(e=>{
            console.log(e);
        })
    }
        useEffect(()=>{
            getStocks();
            console.log("getStocks", stock);
        }, [])

        useEffect(()=>{
            getStocks();
        },[addStock, changeStock, deleteStock])
        

    return (
        <>
            <Modal visible={addStock}>
                <AddStock onClickAdd={onClickAdd}/>
            </Modal>
            <Modal visible={changeStock}>
                <ChangeStock/>
            </Modal>
            <SmallModal visible={deleteStock}>
                <DeleteStock name={'example'} visible = {deleteStock}/>
            </SmallModal>
            <Header text ={"재고 관리"} restaurantName = {localStorage.getItem('storeName')}/>
            <div style={{width:"100%"}}>
                <LeftDiv>
                    <div style={{width:'100%'}}>
                        <StockTable stock = {stock} clickedIndex={getClickedIndex}/>
                    </div>
                </LeftDiv>
                <RightDiv>
                        <Button onClick={onClickChange}>재고 수정</Button>
                        <Link to="/restaurantManagement/stock/stockDetail">
                            <Button>재고 추적</Button>
                        </Link>
                        <Button onClick={onClickAdd}>재고 추가</Button>
                        <Button onClick={onClickDelete}>재고 삭제</Button>
                </RightDiv>
            </div>
        </>
    );
};

export default StockTemplate;