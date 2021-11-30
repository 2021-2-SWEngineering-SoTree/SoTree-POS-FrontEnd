import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import ModalButton from '../../Components/Button/ModalButton';
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

const Input = styled.input`
    margin-left : 0.7rem;
    margin-top : 0.5rem;
    width : 1.4rem;
    height : 1.4rem;
`;

const EmployeeDeletePage = ({id, name}) => {

    const fail = () =>{
        alert('직원을 삭제할 수 없습니다');
    }


    const handleClick = async (e) =>{
        e.preventDefault();
        alert("직원을 삭제합니다");
        window.location.replace("/employeeManagement");
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            branchId : managerId,
            employeeId : id
        };
        const data2=JSON.stringify(data);
        console.log(data2);
        axios.put(`http://localhost:8080/deleteEmployee`,data2,
            {    
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }
            ).then((res)=>{
            }).catch((error)=>{
                fail();
                console.log(error);
            })        
    }

    return (
        <>
        <form>
        <div style={{marginTop:'30%'}}>     
        <Text>
        <Menu>{name}</Menu><TextByMenu>직원을</TextByMenu>
        </Text>
        <UnderText>
            선택하신 게 맞습니까?
        </UnderText>
        <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em', marginTop:'8em'}}>
            <ModalButton name={'삭제'} onClick={handleClick}></ModalButton>
            <ModalButton name={'닫기'}></ModalButton>
        </div>
        </div>
        </form>
        </>
    );
};

export default EmployeeDeletePage;