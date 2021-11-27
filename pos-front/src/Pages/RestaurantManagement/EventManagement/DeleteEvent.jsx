import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import ModalButton from '../../../Components/Button/ModalButton';
import axios from 'axios';

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
    margin-top:2rem;
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

const Input = styled.input`
    margin-left : 0.7rem;
    margin-top : 0.5rem;
    width : 1.4rem;
    height : 1.4rem;
`;


const DeleteMenu=({event})=>{

    const [ingredients,setIngredients]=useState([]);
    const [check,setCheck]=useState(false);

    useEffect(()=>{
    },[]);

    const success = (e)=>{
        alert('이벤트가 삭제되었습니다');
        window.location.replace("/restaurantManagement/menu")
    }

    const fail = () =>{
        alert('이벤트를 삭제할 수 없습니다');
    }

    const handleCheck = async(e)=>{
        e.preventDefault();
        setCheck(!check);
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        let managerId = window.localStorage.getItem('managerId');
    };  

    return(
        <>
        <Form>
        <Title>이벤트 삭제</Title>
        <Text>
        <Menu>{event ? event : '이벤트 선택 필수!'}</Menu><TextByMenu>{event?'이벤트를':''}</TextByMenu>
        </Text>
        <UnderText>
            {event?'선택하신 게 맞습니까':'삭제할 이벤트를 선택해주세요!'}
            {event && <Input type="checkbox" checked={check} onChange={handleCheck} />}
        </UnderText>
        <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
            {event && <ModalButton name={'삭제'} onClick={handleClick}></ModalButton>}
            <ModalButton name={'닫기'}></ModalButton>
        </div>
        </Form>
        </>
    )
}

export default DeleteMenu;