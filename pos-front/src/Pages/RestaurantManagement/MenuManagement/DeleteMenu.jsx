import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import ModalButton from '../../../Components/Button/ModalButton';

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

//메뉴 이름과 아이디
const DeleteMenu=({menu, id, price, category})=>{

    const [menuData, setMenuData]=useState({});

    const handleClick = (e) =>{
        e.preventDefault();
        const data = {
            menuName : menu,
            price : price,
            menuCategory : category,
        };
    }


    return(
        <>
        <Form>
        <Title>{id} 메뉴 삭제{price} {category}</Title>
        <Text>
        <Menu>{menu ? menu : '메뉴 선택 필수!'}</Menu><TextByMenu>메뉴를</TextByMenu>
        </Text>
        <UnderText>삭제하시겠습니까?</UnderText>
        <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
            <ModalButton name={'삭제'} onClick={handleClick}></ModalButton>
            <ModalButton name={'닫기'}></ModalButton>
        </div>
        </Form>
        </>
    )
}

export default DeleteMenu;