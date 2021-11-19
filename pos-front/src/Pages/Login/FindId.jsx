import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SmallModal from '../../Components/Modal/SmallModal';
import ModalButton from '../../Components/Button/ModalButton';

const PageWrapper = styled.div`
    justify-content : center;
    margin : 5rem;
    display : flex;
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 1rem;
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

const Title = styled.h1`
    text-align:center;
`;

const Text = styled.h1`
    margin-top : 5%;
    text-align : center;
`;

const Button = styled.button`
    width : 6.3rem;
    height : 3.5rem;
    background-color : #C4C4C4;
    font-size : 1.8rem;
    margin-left : 80%;
    border-radius : 10px;
   
`

const FindId = () =>{
    //성명, 생년월일, 전화번호, 이메일 
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

    const [visible, setVisible]=useState(false);
    
    const yearRef = useRef();
    const monthRef = useRef();
    const dayRef = useRef();
    const firstRef = useRef();
    const middleRef = useRef();
    const lastRef = useRef();
    const emailNameRef = useRef();
    const emailAddressRef = useRef();

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

    const findId = async () =>{
        let finalday;
        if(day.length===1) finalday='0'+day;
        const data = {
            birthDay : year+"-"+month+"-"+finalday+ " 13:30",
            userName : name,
            email : emailName+"@"+emailAddress,
            phoneNumber : first+"-"+middle+"-"+last
        }
        console.log(data);
        setVisible(true);
        // await axios.post('',JSON.stringify(data),{
        //     headers : {
        //     "Content-Type" : `application/json;charset=utf8`,
        // }}).then((res)=>{
        //     setId(res.data);
        // }).catch(e=>{
        //     console.log(e);
        // })

    }

    const findIdClick = () =>{
        if(!name){
            alert('이름을 입력하세요!');
        }
        else if(!validateEmail(emailName+"@"+emailAddress)){
            alert('이메일 형식이 잘못되었습니다');
        }
        else if(!validateDate(year+"-"+month+"-"+day)){
            alert('생년월일 형식이 잘못되었습니다');
        }
        else if(!validatePhoneNum(first+"-"+middle+"-"+last)){
            alert('전화번호 형식이 잘못되었습니다');
        }
        else{
            findId();
        }
    }
    
    return (
        <>
            <PageWrapper>

                <SmallModal visible={visible}>
                <Form>
                    <Title>찾기 결과</Title>
                    <Text>{name}님의 아이디는</Text>
                    <Text>{id}입니다.</Text>
                    <Button onClick={()=>{window.location.replace("/")}}>닫기</Button>
                </Form>
                </SmallModal>

                <Form onSubmit = {'findId'}>

                    <WrapperDiv>
                        <InputLable >성명</InputLable>
                        <Input type = "text" placeholder = {"성명"}
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
                        <CheckButton type = "submit" onClick={findIdClick}>아이디 찾기</CheckButton>
                    </div>
                </Form>
            </PageWrapper>
        </>
    );
}

export default FindId;