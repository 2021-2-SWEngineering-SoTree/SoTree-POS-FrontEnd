import React from 'react'
import styled from 'styled-components'

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


const CheckButton = styled.button`
    width : 6rem;
    height : 3.2rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 2rem;
    margin-right : 1rem; 
    border-radius : 0.5rem;
    padding : 0;
    
`;

const DeleteMenu=({name})=>{
    return(
        <>
        <Title>메뉴 삭제</Title>
        <Text>
        <Menu>{name}</Menu><TextByMenu>메뉴를</TextByMenu>
        </Text>
        <UnderText>삭제하시겠습니까?</UnderText>
        <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
            <CheckButton>삭제</CheckButton>
            <CheckButton>닫기</CheckButton>
        </div>
        
        </>
    )
}

export default DeleteMenu;