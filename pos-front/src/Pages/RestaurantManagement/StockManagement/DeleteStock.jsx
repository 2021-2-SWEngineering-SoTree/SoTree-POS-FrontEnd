import React from 'react';
import styled from 'styled-components';
import ModalButton from '../../../Components/Button/ModalButton'
import axios from "axios";
import { useState } from 'react';

const Title = styled.h1`
    text-align:center;
`;

const TextByMenu = styled.h2`
    margin-left : 1rem;
`

const UnderText = styled.h2`
    text-align:center;
`

const Text = styled.div`
    display : flex;
    align-items: center;
    justify-content: center;
`;

const Menu = styled.div`
    text-align : center;
    background-color : #ECECEC;
    height : 3.2rem;
    width : 17rem;
    font-size : 2rem;
`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
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

const DeleteStock = ({stock, clickedIndex, onClickDelete, visible}) => {

    const [message, setMessage] = useState('제고삭제');

    const deleteClickHandler = async () =>{
        console.log("Delete button Clicked");
        if(window.confirm("정말로 삭제하시겠습니까?")){
            let managerId = window.localStorage.getItem('managerId');
            const data = {
                stockName: stock[clickedIndex].stockName,
                managerId: managerId,
                stockDetailList : [{
                    memo : message,
                }]
            }
            console.log(data);
            await axios.put(`http://localhost:8080/stock/delete`,
                JSON.stringify(data),{
                    headers : {
                        "Content-Type": `application/json`,
                    }
            }).then((res) => {
                console.log(res);
                alert("삭제되었습니다.");
                onClickDelete();
            }).catch(e=>{console.log(e.message); alert('재고 삭제 실패');})
        }else{
            onClickDelete();   
        }
    }



    return (
        <>
        <Form>
            <Title>재고 삭제</Title>
            <Text>
                <Menu>{clickedIndex? stock[clickedIndex].stockName:""}</Menu><TextByMenu>메뉴를</TextByMenu>
            </Text>
                <UnderText>삭제하시겠습니까?</UnderText>
            <WrapperDiv>
                <InputLable>삭제사유
                    <Input placeholder = {"삭제이유"} style={{flexGrow:3}}
                            value = {message} onChange={(e)=>{setMessage(e.target.value)}} />
                </InputLable>       
            </WrapperDiv>
            <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
                <ModalButton name={'삭제'} onClick={deleteClickHandler}/>
                <ModalButton name={'닫기'} onClick={onClickDelete}/>
            </div>
        </Form>
        </>
    );
};

export default DeleteStock;