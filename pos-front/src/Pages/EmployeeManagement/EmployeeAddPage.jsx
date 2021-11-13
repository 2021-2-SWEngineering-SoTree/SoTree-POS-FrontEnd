import React from 'react';
import styled from "styled-components";

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
    float: right;
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

const EmployeeAddPage = () => {
    return (
        <Form>
            <div>
                <CheckButton>닫기</CheckButton>
            </div>
        </Form>
    );
}

export default EmployeeAddPage
