import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SmallModal from '../../Components/Modal/SmallModal';
import ModalButton from '../../Components/Button/ModalButton';
import Header from '../../Components/Header';

const Div = styled.div`
    flex-wrap: nowrap;
    display: flex;
    width : 100%;
    height : 87vh;  
    max-height : 56rem;
    border : 1px solid black;
`;

const PageWrapper = styled.div`
    justify-content : center;
    margin : 2rem;
    height : 70vh;
    display : flex;
    margin : 0 auto;
    margin-top:1rem;
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 0.5rem;
    }
    justify-content : center;
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
`;

const InputLable = styled.label`
    font-size : 1.5rem;
`;

const Input = styled.input`
    height : 4rem;
    width : 26rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
    text-align : center;
`;

const Form = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const CheckButton = styled.button`
    width : 7rem;
    height : 4rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 0.7rem; 
    border-radius : 0.5rem;
    padding : 0;
    margin-right : 1rem;
`;

const ChangePw = ()=>{

    const [pw, setPw]=useState('');
    const [newpw,setNewpw]=useState('');
    const [againpw,setAgainpw]=useState('');

    const [errorM,setErrorM]=useState('');
    const [errorM2,setErrorM2]=useState('');
    const [check, setCheck]=useState(false);

    const newpwRef = useRef();
    const againpwRef = useRef();

    const changePw = () =>{
        if(!pw) alert('비밀번호를 입력하세요');
        else if(!check) alert('비밀번호를 다시 입력하세요');
        else{
            
        }
    }

    const validatePwd = password =>{
        const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
        return reg.test(password);
    }

    useEffect(()=>{
        console.log('비밀번호 입력');
        if(!validatePwd(newpw)){
            setErrorM("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
            setErrorM2("비밀번호를 다시 입력하세요");
            setCheck(false);
        }
        else {
            setErrorM("올바른 비밀번호");
            if(newpw===againpw) {
                setErrorM2("올바른 비밀번호");
                setCheck(true);
            }
            else {
                setErrorM2("비밀번호를 다시 입력하세요");
                setCheck(false);
            }
        }
    },[newpw, againpw]);

    return (
        <>
       <Header text ={"비밀번호 변경"} restaurantName = {localStorage.getItem('storeName')}/>
       <Div>
            <PageWrapper>
                <Form onSubmit = {'changePw'}>
                    <WrapperDiv>
                        <InputLable>현재 비밀번호</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                        <Input type = "password" placeholder = {"현재 비밀번호"} style={{flexGrow:3}}
                            value={pw}
                            onChange={(e)=> {setPw(e.target.value.trim());}}
                            onKeyPress={(e)=> {if(e.key === 'Enter') newpwRef.current.focus();}}/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>비밀번호</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                        <Input type = "password" placeholder = {"변경 비밀번호"} style={{flexGrow:3}}
                            value={newpw}
                            ref={newpwRef}
                            onChange={(e)=> {setNewpw(e.target.value.trim());}}
                            onKeyPress={(e)=> {if(e.key === 'Enter') againpwRef.current.focus();}}/>
                        </div>
                        {errorM}
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>비밀번호 재확인</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                        <Input type = "password" placeholder = {"변경 비밀번호 재입력"} style={{flexGrow:3}}
                            value={againpw}
                            ref={againpwRef}
                            onChange={(e)=> {setAgainpw(e.target.value.trim());}}
                        />
                        </div>
                        {errorM2}
                    </WrapperDiv>
                    <div style={{display : 'flex', flexDirection : 'row', justifyContent:'center', marginTop:'2rem'}}>
                        <CheckButton type = "submit" onClick={changePw}>완료</CheckButton>
                    </div>
                </Form>
            </PageWrapper>
        </Div>
        </>
    )
}

export default ChangePw;