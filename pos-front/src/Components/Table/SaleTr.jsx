import React from 'react';
import SaleTd from './SaleTd';
import styled from 'styled-components';

const Tr = styled.tr`
height : 4.5rem;
`;
const SaleTr = ({arr, rowIndex}) => {
    return (
        <>
        <Tr>
            {Array(7).fill().map((td, i)=>
            <SaleTd arr={arr} rowIndex={rowIndex} cellIndex={i}/>
            )}
        </Tr>
        </>
        
    );
};

export default SaleTr;