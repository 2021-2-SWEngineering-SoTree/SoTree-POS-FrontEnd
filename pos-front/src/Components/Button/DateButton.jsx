import React from 'react';
import styled from 'styled-components';

const DateButtonTemplate = styled.button`
    background-color : #C8C8C8;
    border-radius : 15px;
    color : #FFFFFF;
    height : 3.4rem;
    width :9rem;
    margin : 1%;
    text-align : center;
    font-size : 2rem;
    vertical-align: middle;
    cursor : pointer;
    &:focus {
        background: #767676;
    }
`



const DateButton = ({name, onClick}) => {
    return (
        <DateButtonTemplate onClick={onClick}>
           {name}
        </DateButtonTemplate>
    )
}

export default DateButton;

