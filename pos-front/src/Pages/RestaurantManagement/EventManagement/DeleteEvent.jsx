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


const DeleteMenu=({event, index})=>{

    const success = (e)=>{
        alert('이벤트가 삭제되었습니다');
        window.location.replace("/restaurantManagement/event")
    }

    const fail = () =>{
        alert('이벤트를 삭제할 수 없습니다');
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        if(window.confirm("정말로 삭제하시겠습니까?")){
            let id = index>='0' ? event[index].id : '';
            let managerId = window.localStorage.getItem('managerId');
            await axios.delete(`http://localhost:8080/event/deleteEvent/${managerId}/${id}`,
                null,{
                    headers : {
                        "Content-Type": `application/json`,
                    }
            }).then((res) => {
                console.log(res);
                success();
            }).catch(e=>{console.log(e.message); fail();})
        }else{
        }
    };  

    return(
        <>
        <Form>
        <Title>이벤트 삭제</Title>
        <Text>
        <Menu>{index>='0' && event[index].eventName}</Menu><TextByMenu>{index>='0' ? '이벤트를':''}</TextByMenu>
        </Text>
        <UnderText>
            {index>='0' ?'삭제하시겠습니까?':'삭제할 메뉴를 선택해주세요!'}
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