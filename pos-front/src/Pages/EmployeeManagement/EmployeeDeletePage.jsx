import React from 'react';
import styled from 'styled-components';

const CheckButton = styled.button`
    width : 5rem;
    height : 2.7rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 0.5rem;
    margin-right : 0.3rem; 
    border-radius : 0.5rem;
    padding : 0;
`;

const EmployeeDeletePage = () => {
    return (
        <div>
            <b>직원삭제</b>
            <CheckButton>닫기</CheckButton>
        </div>
    );
};

export default EmployeeDeletePage;