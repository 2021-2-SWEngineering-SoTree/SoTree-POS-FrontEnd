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

const EmployeeDeletePage = ({menu}) => {

    const [check,setCheck]=useState(false);

    const success = (e)=>{
        alert('직원이 삭제되었습니다');
    }

    const fail = () =>{
        alert('직원을 삭제할 수 없습니다');
    }

    const handleCheck = async(e)=>{
        e.preventDefault();
        setCheck(!check);
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        // let managerId = window.localStorage.getItem('managerId');
        // const data = {
        // };

        // const data2=JSON.stringify(data);
        // console.log(data2);
        // check ? axios.delete(`http://localhost:8080/menu/${id}`,
        //     {
        //         data : data2,
        //         headers : {
        //             'Content-type': 'application/json; charset=UTF-8'
        //         }
        //     }
    
        //     ).then((res)=>{
        //         check && success();
        //     }).catch((error)=>{
        //         fail();
        //         console.log(error);
        //     })
        //     :menu ? alert('체크 버튼을 눌러주세요'):alert('메뉴를 선택해주세요');
        //
    }


    return (
        <>
        <div style={{marginTop:'30%'}}>
        <Text>
        <Menu>{menu ? menu : '직원선택 필수!'}</Menu><TextByMenu>{menu?'직원을':''}</TextByMenu>
        </Text>
        <UnderText>
            {menu?'선택하신 게 맞습니까':'삭제할 직원을 선택해주세요!'}
            {menu && <Input type="checkbox" checked={check} onChange={handleCheck} />}
        </UnderText>
        </div>
        </>
    );
};

export default EmployeeDeletePage;