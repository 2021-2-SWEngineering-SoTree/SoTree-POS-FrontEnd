import React, { useState, useRef, useEffect } from 'react';
import Header from '../../Components/Header';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
    justify-content : center;
    margin : 5vh;
    display : flex;
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 1vh;
    }
    justify-content : center;
    margin-bottom : 1vh;
    display : flex;
    flex-direction : column;
`;

const InputLable = styled.label`
    font-size : 1.5rem;
`;

const Input = styled.input`
    height : 4rem;
    background-color : #F2F0F0;
    font-size : 1.5vw;
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
    width : 7vw;
    height : 4rem;
    font-size : 1.5vw;
    background-color : #C4C4C4;
    margin-top : 0.7rem; 
    border-radius : 0.5rem;
    padding : 0;
`;

const MonthSelector = styled.select`
    height : 4.3rem;
    background-color : #F2F0F0;
    font-size : 1.5vw;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
`;

const TextDiv = styled.div`
    height : 4rem;
    font-size : 1.5vw;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-right : 0.5rem;
    margin-top : 1.2rem;
    font-weight : bold;
`;

const CheckboxInput = styled.input`
    width : 1.8vw;
    height : 1.8rem;
    margin-left : 1rem;
`;

const ErrorText = styled.div`
    font-size : 1vw;
    color : ${(props) => props.color ? props.color : "#FF0000"};
    margin-top : 0.3rem;
    margin-bottom : -0.7rem;
    font-weight : bold;
`;

const SignUpComponent = ({mode, setSelectCategory, visible}) => {

    const [id, setId] = useState('');  const [idDuplicationCheck, setIdDuplicationCheck] = useState(false);
    const [pwd, setPwd] = useState(''); const [pwdErrorMessage, setPwdErrorMessage] = useState("8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????.");
    const [pwdCheck, setPwdCheck] = useState(''); const [pwdCheckMessage, setPwdCheckMessage] = useState("??????????????? ???????????? ????????????.");
    const [name, setName] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [day, setDay] = useState('');
    const [first, setFirst] = useState("010");
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');
    const [firstStore, setFirstStore] = useState("02");
    const [middleStore, setMiddleStore] = useState('');
    const [lastStore, setLastStore] = useState('');
    const [emailName, setEmailName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [type, setType] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [workStoreName, setWorkStoreName] = useState('');
    const [checkWorkStore, setCheckWorkStore] = useState('');
    const [managerId, setManagerId] = useState('');

    const [errorMessage, setErrorMessage] = useState("??????????????? ??????");

    const pwdRef = useRef();
    const pwdCheckRef = useRef();
    const nameRef = useRef();
    const yearRef = useRef();
    const monthRef = useRef();
    const dayRef = useRef();
    const firstRef = useRef();
    const middleRef = useRef();
    const lastRef = useRef();
    const middleStoreRef = useRef();
    const lastStoreRef = useRef();
    const emailNameRef = useRef();
    const EmailAddressRef = useRef();
    const storePhoneNumberRef = useRef();

    const didMountRef = useRef();

    const navigate = useNavigate();

    const duplicateCheck = async (e, name) =>{
        e.preventDefault();
        if(name === ""){
            alert("???????????? ???????????????!");
        }else{
            await axios.post('http://localhost:8080/userIdPresent', name, {headers:{"Content-Type" : "text/plain"}}).then((res)=>{
                console.log(res);
                if(res.data === true){
                    alert("??????????????? ??????????????????.");
                    setIdDuplicationCheck(true);
                }else{
                    alert("?????? ???????????? ????????? ?????????.");
                }
            }).catch(error=>console.log(error));
        }    
    };

    const storeNameCheck = async (e, workStoreName) =>{
        e.preventDefault();
        if(workStoreName === ""){
            alert("??????????????? ???????????????");
        }else{
            await axios.post('http://localhost:8080/findBranchName', workStoreName, {headers:{"Content-Type" : "text/plain"}}).then((res)=>{
                console.log(res);
                if(res.data !== -1){
                    alert("???????????? ???????????????. ??????????????? ??????????????????~");
                    setCheckWorkStore(true);
                    console.log(res.data);
                    setManagerId(res.data);
                }else{
                    alert("???????????? ?????? ???????????????.");
                }
            }).catch(error=>console.log(error));
        }    
    };

    const clearButtonHandler = (e)=>{
        e.preventDefault();
        alert("???????????????");
    }

    const validatePwd = password =>{
        const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
        return reg.test(password);
    }

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


    useEffect(()=>{
        if(didMountRef.current){
            let _errroMessage = "";
            if(!name){
                _errroMessage = "????????? ???????????????";
            }else if(!(validateEmail(emailName+"@"+emailAddress))){
                _errroMessage = "????????? ????????? ????????? ?????? ????????????.";
            }else if(!(validateDate(year+"-"+month+"-"+day))){
                _errroMessage = "????????? ??????????????? ????????????.(YYYY-MM-DD)";
            }
            if(!validatePhoneNum(first+"-"+middle+"-"+last)){
                _errroMessage = "???????????? ?????? ?????????????????????.";
            }
            if(last.length > 4){
                _errroMessage = "???????????? ?????? ?????????????????????.";
            }
            if(!idDuplicationCheck){
                _errroMessage = "????????? ??????????????? ????????????!";
            }

            if(!type){
                if(!storeName){
                    _errroMessage = "???????????? ???????????????";
                }else if(!validatePhoneNum(firstStore+"-"+middleStore+"-"+lastStore)){
                    _errroMessage = "???????????? ?????? ?????? ?????????????????????.";
                }
                if(lastStore.length > 4){
                    _errroMessage = "???????????? ?????? ?????????????????????.";
                }
            }else{
                if(!workStoreName){
                    _errroMessage = "?????? ???????????? ???????????????";
                }else if(!checkWorkStore){
                    _errroMessage = "????????? ?????? ???????????? ??????????????? ????????????!";
                }
            }
            setErrorMessage(_errroMessage);
            if(pwd!==pwdCheck){
                setPwdCheckMessage("??????????????? ???????????? ????????????.");
                _errroMessage = "??????????????? ???????????? ????????????."
            }else{
                if(pwdCheck.length>0){
                    setPwdCheckMessage("??????");
                }
            }
            
            if((validatePwd(pwd))){
                setPwdErrorMessage("????????? ????????????");
            }else{
                setPwdErrorMessage("8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????.");
                _errroMessage = "8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????."
            }            
            setErrorMessage(_errroMessage);
        }else{
            didMountRef.current = true;
        }
    },[name, pwd, pwdCheck, emailName, emailAddress, year, month, day, first, middle, last, idDuplicationCheck, workStoreName, storeName, firstStore, middleStore, lastStore, checkWorkStore, type]);

    useEffect(()=>{
        if(didMountRef.current){
            setIdDuplicationCheck(false);
        }else{
            didMountRef.current = true;
        }
    }, [id])

    useEffect(()=>{

    },[type])

    useEffect(()=>{
        mode !== 'employee' ? setType(false) : setType(true);
        mode !== 'employee' ? setWorkStoreName('') : setWorkStoreName(window.localStorage.getItem('storeName'));
        mode !== 'employee' ? setCheckWorkStore('') : setCheckWorkStore(true);
        mode !== 'employee' ? setCheckWorkStore('') : setManagerId(window.localStorage.getItem('managerId'));

    },[])

    const cancelClickHandler = () => {
        setSelectCategory(!visible);
    }

    const handleSubmit = async(e) =>{
        if(!type){
            // ????????? ????????????
            if(pwdErrorMessage==="????????? ????????????" && pwdCheckMessage==="??????" && errorMessage===""&& idDuplicationCheck){
                let changeday = day;
                if(day.length===1){
                    changeday = "0"+changeday;
                }
                let data = {
                        loginId : id,
                        birthDay : year+"-"+month+"-"+changeday+ " 13:30",
                        userName : name,
                        email : emailName+"@"+emailAddress,
                        phoneNumber : first+"-"+middle+"-"+last,
                        password : pwd,
                        storeName : storeName,
                        branchPhoneNumber : firstStore+"-"+middleStore+"-"+lastStore
                }
                e.preventDefault();
                alert("prevent check!");
                await axios.post('http://localhost:8080/addManager', JSON.stringify(data), {
                    headers : {
                    "Content-Type" : `application/json`,
                }}).then((res)=>{
                    console.log(res);
                    alert("??????????????? ?????????????????????!");
                    if(mode!=='employee'){
                        navigate('/');
                    }
                }).catch(error => {console.log(error); alert("??????????????????! ????????????????????????");});
            }else{
                alert("????????? ??????????????????!");
            }
        }else{
            // ??????????????????
            if(pwdErrorMessage==="????????? ????????????" && pwdCheckMessage==="??????" && errorMessage===""&& idDuplicationCheck){
                let changeday = day;
                if(day.length===1){
                    changeday = "0"+changeday;
                }
                let data = {
                        loginId : id,
                        birthDay : year+"-"+month+"-"+changeday+ " 13:30",
                        userName : name,
                        email : emailName+"@"+emailAddress,
                        phoneNumber : first+"-"+middle+"-"+last,
                        password : pwd,
                        managerId : managerId
                }
                e.preventDefault();
                alert("prevent check!");
                await axios.post('http://localhost:8080/addUser', JSON.stringify(data), {
                    headers : {
                    "Content-Type" : `application/json`,
                }}).then((res)=>{
                    console.log(res);
                    if(mode!=='employee'){
                        navigate('/');
                    }else{
                        setId('');
                        setYear(''); setMonth(); setDay('');
                        setName(''); setEmailName(''); setEmailAddress('');
                        setFirst(''); setMiddle(''); setLast('');
                        setPwd(''); setErrorMessage('??????????????? ??????');
                        setPwdErrorMessage("8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????.");
                        setIdDuplicationCheck(''); setPwdCheckMessage("??????????????? ???????????? ????????????.");
                        cancelClickHandler(); setPwdCheck('');
                    }
                }).catch(error => {console.log(error); alert("??????????????????! ????????????????????????");});
            }else{
                alert("????????? ??????????????????!");
            }
        }
        
    }

    return (
        <>
            <PageWrapper>
                <Form onSubmit = {handleSubmit}>
                    <WrapperDiv>
                        <InputLable>ID</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                            <Input type = "text" placeholder = {"?????????"} style={{flexGrow:3}}
                             value={id} 
                             onChange={(e)=> {setId(e.target.value.trim());}}
                             onKeyPress={(e)=> {if(e.key === 'Enter') pwdRef.current.focus();}}/>
                            <CheckButton style={{flexGrow:1}} onClick={(e)=>duplicateCheck(e, id)}>????????????</CheckButton>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>????????????</InputLable>
                        <Input type = "password" placeholder = {"????????????"}
                         value={pwd}
                         ref={pwdRef}
                         onChange={(e)=>setPwd(e.target.value.trim())} 
                         onKeyPress={(e)=> {if(e.key === 'Enter') pwdCheckRef.current.focus();}}/>
                        <ErrorText color={pwdErrorMessage==="????????? ????????????" ? "#008000" : "#FF0000"}>{pwdErrorMessage}</ErrorText>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>???????????? ??????</InputLable>
                        <Input type = "password" placeholder = {"???????????? ??????"} 
                        value={pwdCheck}
                        ref={pwdCheckRef}
                        onChange={(e)=>setPwdCheck(e.target.value.trim())}
                        onKeyPress={(e)=> {if(e.key === 'Enter') nameRef.current.focus();}}/>
                        <ErrorText color={pwdCheckMessage==="??????" ? "#008000" : "#FF0000"}>{pwdCheckMessage}</ErrorText>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable >??????</InputLable>
                        <Input type = "text" placeholder = {"??????"}
                        value={name}
                        ref={nameRef}
                        onChange={(e)=>setName(e.target.value.trim())}
                        onKeyPress={(e)=> {if(e.key === 'Enter') yearRef.current.focus();}}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable >????????????</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Input  type = "text" placeholder = {"???(4???)"}
                            value={year}
                            ref={yearRef}
                            onChange={(e)=>setYear(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') monthRef.current.focus();}}/>
                            <MonthSelector id="mm" 
                            value={month}
                            ref={monthRef}
                            onChange={(e)=> {setMonth(e.target.value); dayRef.current.focus();}}
                            onKeyPress={(e)=> {if(e.key === 'Enter') dayRef.current.focus();}}>
                                    <option>???</option>
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
                            <Input type = "text" placeholder = {"???"}
                            value={day}
                            ref={dayRef}
                            onChange={(e)=>setDay(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') firstRef.current.focus();}}/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>????????????</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', alignItems:'center'}}>
                            <Input type = 'text' style={{width:'11.5rem'}}
                            value = {first}
                            ref = {firstRef}
                            onChange={(e)=>setFirst(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') middleRef.current.focus();}}/>
                            <TextDiv>-</TextDiv>
                            <Input type = "text" placeholder = {"1234"} style={{width:'12rem'}}
                            value={middle}
                            ref={middleRef}
                            onChange={(e)=>setMiddle(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') lastRef.current.focus();}}/>
                            <TextDiv>-</TextDiv>
                            <Input type = "text" placeholder = {"5678"} style={{width:'12rem'}} 
                            value={last}
                            ref={lastRef}
                            onChange={(e)=>setLast(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') emailNameRef.current.focus();}}/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>?????????</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Input type = "text" placeholder = {"admin12"} style={{width:'19.2rem'}} 
                            value={emailName}
                            ref={emailNameRef}
                            onChange={(e)=>setEmailName(e.target.value.trim())}
                            onKeyPress={(e)=> {if(e.key === 'Enter') EmailAddressRef.current.focus();}}/>
                            <TextDiv> @ </TextDiv>
                            <Input type = "text" placeholder = {"naver.com"} style={{width:'19.15rem'}} 
                            value={emailAddress}
                            ref={EmailAddressRef}
                            onChange={(e)=>setEmailAddress(e.target.value.trim())}/>
                        </div>
                    </WrapperDiv>
                    {mode !== 'employee' ?
                        <>
                            <WrapperDiv>
                                <div style={{display : 'flex', flexDirection : 'row'}}>
                                    <InputLable>????????????</InputLable>
                                    <CheckboxInput type = 'checkbox' value={type} onChange={()=>{setType((prev)=>!prev)}}/>
                                </div>
                            </WrapperDiv>
                        </>
                 : null}
                    
                    {type === false ?
                        <>
                            <WrapperDiv>
                                <InputLable>?????????</InputLable>
                                <div style={{display : 'flex', flexDirection : 'row'}}>
                                    <Input type = "text" placeholder = {"?????????"}
                                    value={storeName}
                                    onChange={(e)=>setStoreName(e.target.value.trim())}
                                    onKeyPress={(e)=> {if(e.key === 'Enter') storePhoneNumberRef.current.focus();}}/>
                                </div> 
                            </WrapperDiv>
                            <WrapperDiv>
                            <InputLable>?????? ????????????</InputLable>
                            <div style={{display : 'flex', flexDirection : 'row', alignItems:'center'}}>
                                <Input type = 'text' style={{width:'11.5rem'}}
                                value = {firstStore}
                                onChange={(e)=>setFirstStore(e.target.value.trim())}
                                onKeyPress={(e)=> {if(e.key === 'Enter') middleStoreRef.current.focus();}}/>
                                <TextDiv>-</TextDiv>
                                <Input type = "text" placeholder = {"1234"} style={{width:'12rem'}}
                                value={middleStore}
                                ref={middleStoreRef}
                                onChange={(e)=>setMiddleStore(e.target.value.trim())}
                                onKeyPress={(e)=> {if(e.key === 'Enter') lastStoreRef.current.focus();}}/>
                                <TextDiv>-</TextDiv>
                                <Input type = "text" placeholder = {"5678"} style={{width:'12rem'}} 
                                value={lastStore}
                                ref={lastStoreRef}
                                onChange={(e)=>setLastStore(e.target.value.trim())}
                                />
                            </div>
                            </WrapperDiv>
                        </>
                        :
                        <>
                            <WrapperDiv>
                                <InputLable>???????????????</InputLable>
                                <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                                    <Input type = "text" placeholder = {"?????????"} style={{flexGrow:3}}
                                    value={workStoreName} 
                                    onChange={(e)=> {setWorkStoreName(e.target.value.trim());}}
                                    />
                                    <CheckButton style={{flexGrow:1}} onClick={(e)=>storeNameCheck(e, workStoreName)}>????????????</CheckButton>
                                </div>
                            </WrapperDiv>
                        </>
                    }
                    <ErrorText style={{fontSize : '1.3rem', marginBottom:'-1.5rem'}}>{errorMessage}</ErrorText>
                    <div style={{display : 'flex', flexDirection : 'row', justifyContent:'space-around', marginTop:'2rem'}}>
                        <CheckButton onClick={clearButtonHandler}>?????????</CheckButton>
                        <CheckButton type = "submit" onClick={handleSubmit}>????????????</CheckButton>
                    </div>
                </Form>
            </PageWrapper>
        </>
    );
};

export default SignUpComponent;