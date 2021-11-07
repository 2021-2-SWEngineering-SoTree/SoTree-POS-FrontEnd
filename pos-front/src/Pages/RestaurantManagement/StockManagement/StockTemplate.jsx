import React, {useState} from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import {Modal, SmallModal} from '../../../Components/Modal';
import AddMenu from '../MenuManagement/AddMenu';
import ChangeMenu from '../MenuManagement/ChangeMenu';
import DeleteMenu from '../MenuManagement/DeleteMenu';
import { Link } from 'react-router-dom';
import Table from '../../../Components/Table/Table';

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

    const onClickAdd = () => {
        setAddStock(!addStock);
    }

    const onClickChange = () => {
        setChangeStock(!changeStock);
    }

    const onClickDelete = () => {
        setDeleteStock(!deleteStock);
    }

    return (
        <>
        <Modal visible={addStock}>
            <AddMenu/>
        </Modal>
        <Modal visible={changeStock}>
            <ChangeMenu/>
        </Modal>

        <SmallModal visible={deleteStock}>
            <DeleteMenu name={'돈까스'}/>
        </SmallModal>
        <Header text ={"재고 관리"} restaurantName = {"혜민이네 돈까스"}/>
        <div style={{width:"100%"}}>
            <LeftDiv>
                <div style={{width:'100%'}}>
                    <Table/>
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