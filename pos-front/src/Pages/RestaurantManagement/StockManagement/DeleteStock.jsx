import React from 'react';
import styled from 'styled-components';
import ModalButton from '../../../Components/Button/ModalButton'
import axios from "axios";

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

const DeleteStock = ({stock, clickedIndex, onClickDelete, visible}) => {

    const deleteClickHandler = async () =>{
        console.log("Delete button Clicked");
        if(window.confirm("정말로 삭제하시겠습니까?")){
            const time = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
            const ingredients = [{
                time: time,
                quantityChanged: '',
                employeeId: 99,
            }];
            console.log(ingredients);
            let managerId = window.localStorage.getItem('managerId');
            const data = {
                stockName: stock[clickedIndex].stockName,
                managerId: managerId,
                quantity: stock[clickedIndex].quantity,
                stockDetailList: ingredients,
                employeeId: 99,
            }
            console.log(data);
            await axios.delete(`http://localhost:8080/stock/${stock[clickedIndex].id}`,
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
        <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
            <ModalButton name={'삭제'} onClick={deleteClickHandler}/>
            <ModalButton name={'닫기'} onClick={onClickDelete}/>
        </div>
        </Form>
        </>
    );
};

export default DeleteStock;