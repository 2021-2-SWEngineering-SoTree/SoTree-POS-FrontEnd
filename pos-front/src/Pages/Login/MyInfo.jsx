import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SmallModal from '../../Components/Modal/SmallModal';
import ModalButton from '../../Components/Button/ModalButton';
import Header from '../../Components/Header';
import { Link, Routes, Route } from 'react-router-dom';

const Div = styled.div`
    flex-wrap: nowrap;
    display: flex;
    width : 100%;
    height : 100vh;  
    min-height : 90vh;
    margin-top:6.5%;
`;
const PageWrapper = styled.div`
    justify-content : center;
    margin : 2rem;
    height : 70vh;
    display : flex;
    margin : 0 auto;
    margin-top:3.5%;
`;

const CheckButton = styled.button`
    width : 10.5rem;
    height : 4.5rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 0.7rem; 
    border-radius : 0.5rem;
    padding : 0;
    margin-right : 1rem;
`;

const WrapperDiv = styled.div`
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
    width : 40rem;
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

const TextDiv = styled.div`
    height : 4rem;
    font-size : 1.5rem;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-right : 0.5rem;
    margin-top : 1.2rem;
    font-weight : bold;
`;

const MyInfo = ()=>{
    //id 성명 생년월일 전화번호 이메일
    let loginId = window.localStorage.getItem('loginId');

    const [id, setId]=useState();

    const [name, setName]=useState('');

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [day, setDay] = useState('');
    
    const [first, setFirst] = useState("010");
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');

    const [emailName, setEmailName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    //가게정보
    const [storeName,setStoreName]=useState('');
    const [firstStore,setFirstStore]=useState('02');
    const [secondStore,setSecondStore]=useState('');
    const [thirdStore,setThirdStore]=useState('');

    const getInfos = async ()=>{
        console.log(typeof loginId, loginId);
        await axios.post('http://localhost:8080/getUserByLoginId',loginId,{
            headers : {
            "Content-Type" : `text/plain`,
        }}).then((res)=>{
            console.log(res.data);
            console.log(res.data.user);
            const {birthDay, phoneNumber, personName, email}=res.data.user;
            
            const emailArr=email.split('@');
            const birthArr=birthDay.split('-');
            const phoneArr=phoneNumber.split('-');
            const storeArr=res.data.branchPhoneNumber.split('-');

            console.log(emailArr,birthArr,phoneArr, personName);
            
            setName(personName);
            setEmailName(emailArr[0]);
            setEmailAddress(emailArr[1]);
            setFirst(phoneArr[0]);
            setMiddle(phoneArr[1]);
            setLast(phoneArr[2]);
            setYear(birthArr[0]);
            setStoreName(res.data.storeName);
            setFirstStore(storeArr[0]);
            setSecondStore(storeArr[1]);
            setThirdStore(storeArr[2]);

            if(birthArr[1][0]==='0') birthArr[1]=birthArr[1][1];
            setMonth(birthArr[1]);

            let day=birthArr[2].slice(0,2);
            if(day[0]==='0'){
                day=day[1];
            }
            setDay(day);

        }).catch(e=>{
            console.log(e);
        })
    }
    
    useEffect(async()=>{
        setId(loginId);
        await getInfos();
    },[]);

    return (
        <>
        <Header text ={"내 정보"} restaurantName = {localStorage.getItem('storeName')}/>
        <Div>
            <PageWrapper>
                <Form>
                    <WrapperDiv>
                        <InputLable>ID</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                        <Input type = "text" placeholder = {"아이디"}
                            value={id} disabled
                        />
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable >성명</InputLable>
                        <Input type = "text" value={name} disabled/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable >생년월일</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Input  type = "text" value={year} style={{width:'9.5rem'}} disabled/>
                            <TextDiv>년</TextDiv>
                            <Input type = "text"  value={month} style={{width:'9.5rem'}} disabled/>
                            <TextDiv>월</TextDiv>
                            <Input type = "text"  value={day} style={{width:'9.5rem'}} disabled/>
                            <TextDiv>일</TextDiv>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>전화번호</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', alignItems:'center'}}>
                            <Input type = 'text' style={{width:'10.8rem'}}
                            value = {first} disabled/>
                            <TextDiv>-</TextDiv>
                            <Input type = "text" style={{width:'10.8rem'}} value={middle} disabled/>
                            <TextDiv>-</TextDiv>
                            <Input type = "text"  style={{width:'10.8rem'}} value={last} disabled/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>이메일</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', width :'24rem'}}>
                            <Input type = "text" style={{width:'19.2rem'}} 
                            value={emailName} disabled/>
                            <TextDiv> @ </TextDiv>
                            <Input type = "text" style={{width:'17.2rem'}} 
                            value={emailAddress} disabled
                            />
                        </div>
                    </WrapperDiv>

                    <WrapperDiv>
                                <InputLable>가게명</InputLable>
                                <div style={{display : 'flex', flexDirection : 'row'}}>
                                    <Input type = "text" placeholder = {"가게명"}
                                    value={storeName} disabled/>
                                </div> 
                            </WrapperDiv>
                            <WrapperDiv>
                            <InputLable>가게 전화번호</InputLable>
                            <div style={{display : 'flex', flexDirection : 'row', alignItems:'center'}}>
                                <Input type = 'text' style={{width:'10.8rem'}}
                                value = {firstStore} disabled/>
                                <TextDiv>-</TextDiv>
                                <Input type = "text" placeholder = {"1234"} style={{width:'10.8rem'}}
                                value={secondStore} disabled/>
                                <TextDiv>-</TextDiv>
                                <Input type = "text" placeholder = {"5678"} style={{width:'10.8rem'}} 
                                value={thirdStore} disabled/>
                            </div>
                    </WrapperDiv>

                    <div style={{display : 'flex', flexDirection : 'row', justifyContent:'flex-end', marginTop:'2rem'}}>
                        <Link to = "/myInfo/changePw"><CheckButton>비밀번호 변경</CheckButton></Link>
                        <Link to = "/myInfo/changeInfo"><CheckButton style={{width:'6rem'}}>수정</CheckButton></Link>
                    </div>

                </Form>
            </PageWrapper>
        </Div>
        </>
    )
}

export default MyInfo;