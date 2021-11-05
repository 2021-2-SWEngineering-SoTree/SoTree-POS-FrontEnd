import React from 'react';
import Header from '../../Components/Header';
import styled from 'styled-components';

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

const Form = styled.form`
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

const CheckboxInput = styled.input`
    width : 1.8rem;
    height : 1.8rem;
    margin-left : 1rem;
`;

const SignUp = () => {
    return (
        <>
            <Header text ={"회원가입"} restaurantName = {"혜민이네 돈까스"}/>
            <PageWrapper>
                <Form>
                    <WrapperDiv>
                        <InputLable>ID</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                            <Input placeholder = {"아이디"} style={{flexGrow:3}}/>
                            <CheckButton style={{flexGrow:1}}>중복확인</CheckButton>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>비밀번호</InputLable>
                        <Input placeholder = {"비밀번호"}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>비밀번호 확인</InputLable>
                        <Input placeholder = {"비밀번호 확인"}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>성명</InputLable>
                        <Input placeholder = {"성명"}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>생년월일</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Input placeholder = {"년(4자)"}/>
                            <MonthSelector id="mm">
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
                            <Input placeholder = {"일"}/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>전화번호</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', alignItems:'center'}}>
                            <Input type = 'text' value = "010" style={{width:'11.5rem'}}/>
                            <TextDiv>-</TextDiv>
                            <Input placeholder = {"1234"} style={{width:'12rem'}}/>
                            <TextDiv>-</TextDiv>
                            <Input placeholder = {"5678"} style={{width:'12rem'}}/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>이메일</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <Input placeholder = {"admin12"} style={{width:'19.2rem'}}/>
                            <TextDiv> @ </TextDiv>
                            <Input placeholder = {"naver.com"} style={{width:'19.15rem'}}/>
                        </div>
                    </WrapperDiv>
                    <WrapperDiv>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <InputLable>직원여부</InputLable>
                            <CheckboxInput type = 'checkbox' />
                        </div>
                    </WrapperDiv>
                    <div style={{display : 'flex', flexDirection : 'row', justifyContent:'space-around', marginTop:'2rem'}}>
                        <CheckButton>초기화</CheckButton>
                        <CheckButton>회원가입</CheckButton>
                    </div>
                </Form>
            </PageWrapper>

        </>
    );
};

export default SignUp;