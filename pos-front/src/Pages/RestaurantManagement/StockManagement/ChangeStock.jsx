import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Calculator from "../../../Components/Calculator/Calculator";
import MessageStock from "./MessageStock";
import { SmallModal } from '../../../Components/Modal';
import axios from "axios";

const PageWrapper = styled.div`
    margin : 2rem;
  
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 1rem;
    }
    justify-content : center;
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
`;

const InputLable = styled.label`
    font-size : 1.5rem;
    float: left;
`;

const Input = styled.input`
    height : 3rem;
    width : 13rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
    margin-left : 1.0rem;
`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const CheckButton = styled.button`
    width : 4rem;
    height : 3.5rem;
    font-size : 1.2rem;
    background-color : #C4C4C4;
    margin-top : 2rem;
    margin-right : 1rem; 
    border-radius : 0.5rem;
    padding : 0;
`;

const CategorySelector = styled.select`
    height : 3.2rem;
    width : 10rem;
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

const Title = styled.h1`
    text-align:center;
`;


const ChangeStock = ({onClickChange, stock, clickedIndex}) => {

    const [stockCell, setStockCells] = useState([{}]);
    const [select, setSelect] = useState("");
    const [quantity , setQuantity] = useState('');
    const [message, setMessage] = useState('제고수정');

    const handleChange = async(e) => {
        setSelect(e.target.value);
        console.log(e.target.value);
    }

    useEffect(async () => {
        try {
            console.log("select clickedIndex: " + clickedIndex);
            const getEmployee = []
            const res = await axios.get('http://localhost:8080/getAllPersonName')
            console.log('가져온 직원 값들' + res.data);
            for (let i = 0 ; i < res.data.length; i++) {
                getEmployee.push(res.data[i]);
            }
            setStockCells(getEmployee);
            console.log(stockCell);
        } catch (e) {
            console.error(e.message);
        }
    }, []);


    const changeHandleClick = async(e) =>{
        e.preventDefault();
        if(window.confirm("정말로 수정하시겠습니까?")){
            console.log("ok");
            const ingredients = [{
                quantityChanged: +quantity,
                employeeId: select,
                memo : message,
            }];
            console.log(ingredients);
            let managerId = window.localStorage.getItem('managerId');
            const data = {
                stockName: stock[clickedIndex].stockName,
                managerId: managerId,
                stockDetailList: ingredients,
            };
            const data2 = JSON.stringify(data);
            console.log("data2: ", data2);
            await axios.put(`http://localhost:8080/stock/update`,
                data2, {
                    headers : {
                        "Content-Type": 'application/json; charset=UTF-8',
                    }
                }).then((res) => {
                console.log(res);
                setQuantity('');
                onClickChange();
            }).catch(e=>{console.log(e.message); alert('재고 수정 실패');})
        };
    }

    const changeQuantity = (change) =>{
        setQuantity(change);
    }

    return (
        <>
            <PageWrapper>
                <Title> {clickedIndex && stock[clickedIndex].stockName}</Title>
                <Form>
                    <WrapperDiv>
                        <InputLable>현재수량
                        <Input placeholder = {"0"} style={{flexGrow:3}}
                               value = {clickedIndex && stock[clickedIndex].quantity} />인분
                        </InputLable>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>변경수량
                        <Input placeholder = {"0"} style={{flexGrow:3}}
                               value = {quantity}
                               onChange={(e)=>setQuantity(e.target.value)} />인분
                        </InputLable>
                    </WrapperDiv>
                    <WrapperDiv>
                        <Calculator num={"3.0rem"} num2={"6.0rem"} quantity={quantity} changeQuantity={changeQuantity}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>변경사유
                        <Input placeholder = {"0"} style={{flexGrow:3}}
                               value = {message}
                               onChange={(e)=>setMessage(e.target.value)} />인분
                        </InputLable>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>담당
                        <CategorySelector onChange={handleChange}>
                            {Array(stockCell.length).fill(undefined, undefined, undefined).map((index, i) =>
                                <option key={i} value={stockCell[i].EmployeeId}>{stockCell[i].personName}</option>)}
                        </CategorySelector>
                            <CheckButton onClick = {changeHandleClick}>수정</CheckButton>
                            <CheckButton>닫기</CheckButton>
                        </InputLable>
                    </WrapperDiv>
                </Form>
            </PageWrapper>
        </>
    );
};

export default ChangeStock;