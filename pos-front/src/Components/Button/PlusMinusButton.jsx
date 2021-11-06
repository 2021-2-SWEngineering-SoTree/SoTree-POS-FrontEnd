import React from 'react';
import styled from 'styled-components';

const PlusMinusButtonTemplate = styled.button`
    background-color : #C4C4C4;
    border-radius : 20px;
    color : black;
    height : 2rem;
    width : 2rem;
    margin : 1rem 0.3rem;
    text-align : center;
    font-size : 1.2rem;
    cursor : pointer;

`


const PlusMinusButton = ({name}) => {
    return (
        <PlusMinusButtonTemplate>
           {name}
        </PlusMinusButtonTemplate>
    )
}

export default PlusMinusButton;