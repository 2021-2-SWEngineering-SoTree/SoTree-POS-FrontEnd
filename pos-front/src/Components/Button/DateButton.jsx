import React from 'react';
import styled from 'styled-components';

const DateButtonTemplate = styled.button`
    background-color : #C8C8C8;
    border-radius : 15px;
    color : #FFFFFF;
    height : 3.2rem;
    width : 10rem;
    margin : 1rem;
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
        <DateButtonTemplate>
           {name}
        </DateButtonTemplate>
    )
}

export default DateButton;

