import React from 'react';
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router";


const LargeButton = styled.button`
    width : 6rem;
    height : 5.5rem;
    font-size : 1.2rem;
    background-color : #C4C4C4;
    margin-right : 1rem;
    border-radius : 0.5rem;
    padding : 0;
    float: left;
`;


const CheckButton = styled.button`
    width : 4rem;
    height : 3.5rem;
    font-size : 1.2rem;
    background-color : #C4C4C4;
    margin-top : 2rem;
    margin-right : 1rem;
    border-radius : 0.5rem;
    padding : 0;
    float: left;
`;


const WrapperDiv = styled.div`
    & + & {
      margin-top : 1rem;
    }
    justify-content : center;
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
    right: 50%;
    left: 50%;
`;


const InnerDiv = styled.div`
    & + & {
      margin-top : 1rem;
    }
    display: flex;
    justify-content : center;
`;


const HeaderLabel = styled.label`
    padding-top: 1.0rem;
    font-size : 1.5rem;
    display: flex;
    justify-content : center;
`;


const ContentLabel = styled.label`
    font-size: 1.0rem;
    align-content: center;
    text-align: center;

`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
    float: right;
`;


const Input = styled.input`   
    height : 2.0rem;
    width : 13rem;
    background-color : #F2F0F0;
    font-size : 1.0rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem;
    margin-right : 0.5rem;
    margin-left : 1.0rem;
`;


const DividedHr = styled.hr`
  border: solid 1px #000000;
  width: 80%;
  height: 0;
  margin-bottom: 0; 
`;



const EmployeeCommutingPage = ({commute, setCommute}) => {
    const CancelClick = () => {
        setCommute(!commute)
    }
    const navigate = useNavigate();
    const arrivalHandleClick = async(e) => {

    }

    const leaveHandleClick = async(e) => {
        if (window.confirm("test, 퇴근")) {
            e.preventDefault();
            alert("test, 퇴근 추가 되었음")
        }
    }

    return (
        <>
            <WrapperDiv>
                <InnerDiv>
                    <HeaderLabel>+ 선택된 직원 정보</HeaderLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 번&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호<Input placeholder = {"번호"} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름<Input placeholder = {"번호"} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 직&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급<Input placeholder = {"번호"} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 현재 시간<Input placeholder = {"번호"} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <DividedHr/>
                </InnerDiv>
                <InnerDiv>
                    <HeaderLabel>+ 출퇴근</HeaderLabel>
                </InnerDiv>
                <InnerDiv>
                    <LargeButton onClick={arrivalHandleClick}>출근 하기</LargeButton>
                    <ContentLabel style={{lineHeight: '90px'}}>현재 시간이 출근 기록으로 등록됩니다.</ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <LargeButton onClick={leaveHandleClick}>퇴근 하기</LargeButton>
                    <ContentLabel style={{lineHeight: '90px'}}>현재 시간이 퇴근 기록으로 등록됩니다.</ContentLabel>
                </InnerDiv>
            </WrapperDiv>
                <Form>
                    <div>
                        <CheckButton onClick={CancelClick}>닫기</CheckButton>
                    </div>
                </Form>
        </>
    );
}

export default EmployeeCommutingPage
