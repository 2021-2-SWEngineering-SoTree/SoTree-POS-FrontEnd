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

const Text = styled.h2`
    margin-top : 5%;
    text-align : center;
`;

const Button = styled.button`
    width : 5rem;
    height : 3rem;
    background-color : #C4C4C4;
    font-size : 1.3rem;
    margin-left : 80%;
    margin-top : 2%;
    border-radius : 10px;
   
`

const FindId = () =>{
    //??????, ?????????, ????????????, ????????? 
    const [id, setId]=useState(''); 
    const [pw,setPw]=useState('');
    const [name, setName]=useState('');
    
    const [first, setFirst] = useState("010");
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');
    
    const [emailName, setEmailName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    const [visible, setVisible]=useState(false);
    
    const idRef = useRef();
    const firstRef = useRef();
    const middleRef = useRef();
    const lastRef = useRef();
    const emailNameRef = useRef();
    const emailAddressRef = useRef();

    const validateEmail = check =>{
        const reg = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
        return reg.test(check);
    }

    const validatePhoneNum = check =>{
        const reg = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/
        return reg.test(check);
    }

    const findPw = async () =>{
        const data = {
            loginId : id,
            userName : name,
            email : emailName+"@"+emailAddress,
            phoneNumber : first+"-"+middle+"-"+last
        }
        console.log(data);
        await axios.post('http://localhost:8080/findUserPw',JSON.stringify(data),{
            headers : {
            "Content-Type" : `application/json;charset=utf8`,
        }}).then((res)=>{
            console.log(res.data);
            setPw(res.data);
        }).catch(e=>{
            console.log(e);
            setPw('');
        })
        setVisible(true);

    }

    const findPwClick = () =>{
        if(!name){
            alert('????????? ???????????????!');
        }
        else if(!id){
            alert('???????????? ???????????????!');
        }
        else if(!first||!middle||!last) alert('???????????? ???????????????!');
        else if(!emailName||!emailAddress) alert('???????????? ???????????????!');
        else if(!validatePhoneNum(first+"-"+middle+"-"+last)){
            alert('???????????? ????????? ?????????????????????');
        }
        else if(!validateEmail(emailName+"@"+emailAddress)){
            alert('????????? ????????? ?????????????????????');
        }
        else{
            findPw();
        }
    }
    
    return (
        <>
            <PageWrapper>

                <SmallModal visible={visible}>
                <Form>
                    <Title>?????? ??????</Title>
                    <br/>
                    {(pw!=='') &&
                        <>
                        <Text><span style={{padding:'1%', backgroundColor:'lightgray'}}>{id}</span> ?????? ???????????????</Text>
                        <Text><span style={{padding:'1%', backgroundColor:'lightgray'}}>{pw}</span> ??? ?????????????????????.</Text>
                        <Button onClick={()=>{window.location.replace("/")}}>??????</Button>
                        </>
                    }
                    {(pw==='') &&
                        <>
                        <Text>??????????????? ?????? ??? ????????????<br/>?????? ??????????????????</Text>
                        <br/>
                        <Button onClick={()=>{setVisible(false)}}>??????</Button>
                        </>
                    }
                    
                </Form>
                </SmallModal>

                <Form onSubmit = {'findPw'}>

                    <WrapperDiv>
                        <InputLable >??????</InputLable>
                        <Input type = "text" placeholder = {"??????"}
                        value={name} onChange={(e)=>setName(e.target.value)}
                        onKeyPress={(e)=> {if(e.key === 'Enter') idRef.current.focus();}}
                        />
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>ID</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                            <Input type = "text" placeholder = {"?????????"} style={{flexGrow:3}}
                             value={id} 
                             ref={idRef}
                             onChange={(e)=> {setId(e.target.value.trim());}}
                             onKeyPress={(e)=> {if(e.key === 'Enter') firstRef.current.focus();}}/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>????????????</InputLable>
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
                        <InputLable>?????????</InputLable>
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
                        <CheckButton type = "submit" onClick={findPwClick}>???????????? ??????</CheckButton>
                    </div>
                </Form>
            </PageWrapper>
        </>
    );
}

export default FindId;