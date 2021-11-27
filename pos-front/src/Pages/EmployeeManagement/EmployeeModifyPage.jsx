import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div`
    flex-wrap: nowrap;
    display: flex;
    width : 100%;
    height : 87vh;  
    max-height : 56rem;
    margin-top : 6%;
`;
const PageWrapper = styled.div`
    justify-content : center;
    margin : 2rem;
    height : 70vh;
    display : flex;
    margin : 0 auto;
    margin-top:4%;
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
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
`;

const Form = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const MonthSelector = styled.select`
    height : 4.3rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
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

const CheckButton = styled.button`
    width : 10rem;
    height : 4.5rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 0.7rem; 
    border-radius : 0.5rem;
    padding : 0;
    margin-right : 1rem;
`;

const EmployeeModifyPage = ({}) => {
    //id 성명 생년월일 전화번호 이메일

    const [id, setId]=useState('');

    const [name, setName]=useState('');

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [day, setDay] = useState('');
    
    const [first, setFirst] = useState("010");
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');

    const [emailName, setEmailName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');


    const nameRef = useRef();
    const monthRef=useRef();
    const yearRef=useRef();
    const dayRef=useRef();
    const firstRef = useRef();
    const middleRef = useRef();
    const lastRef = useRef();
    const emailNameRef = useRef();
    const emailAddressRef = useRef();
    
    const getInfos = async ()=>{
        // await axios.post('http://localhost:8080/getUserByLoginId',loginId,{
        //     headers : {
        //     "Content-Type" : `text/plain`,
        // }}).then((res)=>{
        //     const {birthDay, phoneNumber, personName, email}=res.data.user;
            
        //     const emailArr=email.split('@');
        //     const birthArr=birthDay.split('-');
        //     const phoneArr=phoneNumber.split('-');
        //     console.log(emailArr,birthArr,phoneArr);
            
        //     setName(personName);
        //     setEmailName(emailArr[0]);
        //     setEmailAddress(emailArr[1]);
        //     setFirst(phoneArr[0]);
        //     setMiddle(phoneArr[1]);
        //     setLast(phoneArr[2]);
        //     setYear(birthArr[0]);

        //     if(birthArr[1][0]==='0') birthArr[1]=birthArr[1][1];
        //     setMonth(birthArr[1]);

        //     let day=birthArr[2].slice(0,2);
        //     if(day[0]==='0'){
        //         day=day[1];
        //     }
        //     console.log(day);
        //     console.log(emailAddress);
        //     setDay(day);

        // }).catch(e=>{
        //     console.log(e);
        // })
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        setId();
        await getInfos();
    },[]);

    const validateEmail = check =>{
        const reg = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
        return reg.test(check);
    }

    const validateDate = check =>{
        const reg = /^(19|20)\d{2}-(0[1-9]|1[012])-([1-9]|[12][0-9]|3[0-1])$/;
        return reg.test(check);
    }

    const validatePhoneNum = check =>{
        const reg = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/
        return reg.test(check);
    }

    const updateInfo = async () =>{
        const data = {
            userName : name,
            birthDay : year+"-"+month+"-"+day,
            phoneNumber : first+"-"+middle+"-"+last,
            email : emailName+"@"+emailAddress,
            loginId : id
        }
        console.log(data);
        // await axios.put('http://localhost:8080/updateUser',JSON.stringify(data),{
        //         headers : {
        //         "Content-Type" : `application/json;charset=utf8`,
        //     }}).then((res)=>{
        //         console.log(res);
        //         alert('직원 정보가 변경되었습니다!');
        //         window.location.replace("/myInfo");
        //     }).catch(e=>{
        //         alert('입력한 정보를 다시한번 확인해주세요!');
        // })
    };

    
    const changeInfo = () =>{
        
        if(!name) alert('성명을 입력하세요!');
        else if(!year||!month||!day) alert("생년월일을 입력하세요!");
        else if(!first||!middle||!last) alert("전화번호를 입력하세요!");
        else if(!emailName||!emailAddress) alert("이메일을 입력하세요!");
        else if(!(validateDate(year+"-"+month+"-"+day))) alert("생년월일 형식이 올바르지 않습니다!");
        else if (!(validatePhoneNum(first+"-"+middle+"-"+last))) alert("전화번호 형식이 올바르지 않습니다!");
        else if(!(validateEmail(emailName+"@"+emailAddress))) alert("이메일 형식이 올바르지 않습니다!");
        else updateInfo();
    }


    return (
        <>
        <Div>
            <PageWrapper>
                <Form onSubmit = {changeInfo}>
                    <WrapperDiv>
                        <InputLable>ID</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                        <Input type = "text" placeholder = {"아이디"} style={{flexGrow:3}}
                            value={id}
                            onKeyPress={(e)=> {if(e.key === 'Enter') nameRef.current.focus();}}
                            disabled/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable >성명</InputLable>
                        <Input type = "text" placeholder = {"성명"} ref={nameRef}
                        value={name} onChange={(e)=>setName(e.target.value)}
                        onKeyPress={(e)=> {if(e.key === 'Enter') yearRef.current.focus();}}
                        />
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable >생년월일</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Input  type = "text" placeholder = {"년(4자)"}
                            value={year}
                            ref={yearRef}
                            onChange={(e)=>setYear(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') monthRef.current.focus();}}
                            />
                            <MonthSelector id="mm" 
                            value={month}
                            ref={monthRef}
                            onChange={(e)=> {setMonth(e.target.value)}}
                            onKeyPress={(e)=> {if(e.key === 'Enter') dayRef.current.focus();}}
                            >
                                    <option>월</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>                                    
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </MonthSelector>
                            <Input type = "text" placeholder = {"일"}
                            value={day}
                            ref={dayRef}
                            onChange={(e)=>setDay(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') firstRef.current.focus();}}
                            />
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>전화번호</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', alignItems:'center'}}>
                            <Input type = 'text' style={{width:'11.5rem'}}
                            value = {first}
                            ref={firstRef}
                            onChange={(e)=>setFirst(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') middleRef.current.focus();}}
                            />
                            <TextDiv>-</TextDiv>
                            <Input type = "text" placeholder = {"1234"} style={{width:'12rem'}}
                            value={middle}
                            ref={middleRef}
                            onChange={(e)=>setMiddle(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') lastRef.current.focus();}}
                            />
                            <TextDiv>-</TextDiv>
                            <Input type = "text" placeholder = {"5678"} style={{width:'12rem'}} 
                            value={last}
                            ref={lastRef}
                            onChange={(e)=>setLast(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') emailNameRef.current.focus();}}
                            />
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>이메일</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Input type = "text" placeholder = {"admin12"} style={{width:'19.2rem'}} 
                            value={emailName}
                            ref={emailNameRef}
                            onChange={(e)=>setEmailName(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') emailAddressRef.current.focus();}}
                            />
                            <TextDiv> @ </TextDiv>
                            <Input type = "text" placeholder = {"naver.com"} style={{width:'19.15rem'}} 
                            value={emailAddress}
                            ref={emailAddressRef}
                            onChange={(e)=>setEmailAddress(e.target.value.trim())}
                            />
                        </div>
                    </WrapperDiv>
                   
                    <div style={{display : 'flex', flexDirection : 'row', justifyContent:'flex-end', marginTop:'2rem'}}>
                        <CheckButton onClick={changeInfo}>완료</CheckButton>
                    </div>
                </Form>
            </PageWrapper>
        </Div>
        </>
    );
};

export default EmployeeModifyPage;