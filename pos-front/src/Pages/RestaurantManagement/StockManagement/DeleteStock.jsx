import React from 'react';
import styled from 'styled-components';
import ModalButton from '../../../Components/Button/ModalButton'

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

const DeleteStock = ({name, visible}) => {

    const deleteClickHandler = () =>{
        console.log("Delete button Clicked");
        if(window.confirm("정말로 삭제하시겠습니까?")){
            alert("삭제되었습니다.");
        }else{
            visible = !visible;
        }

    }
    return (
        <>
        <Form>
        <Title>재고 삭제</Title>
        <Text>
        <Menu>{name}</Menu><TextByMenu>메뉴를</TextByMenu>
        </Text>
        <UnderText>삭제하시겠습니까?</UnderText>
        <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
            <ModalButton name={'삭제'} onClick={deleteClickHandler}/>
            <ModalButton name={'닫기'} onClick={()=> {visible= !visible; console.log(visible)}}/>
        </div>
        </Form>
        </>
    );
};

export default DeleteStock;