import React from 'react';
import styled from "styled-components";
import {SignUp} from "../Login";

const CheckButton = styled.button`
  width : 4rem;
  height : 3.5rem;
  font-size : 1.2rem;
  background-color : #C4C4C4;
  margin-top : 2rem;
  margin-right : 1rem;
  border-radius : 0.5rem;
  padding : 0;
`;

const EmployeeCommutingPage = () => {
    const handleClick = (e) => {
        e.preventDefault();
        if (window.confirm("정말로 추가하시겠습니까?")) {
            alert("추가되었습니다.");
        }
    }
    return (
        <>
            <CheckButton onClick = {handleClick}>추가</CheckButton>
            <CheckButton>닫기</CheckButton>
        </>
    );
}

export default EmployeeCommutingPage
