import React from 'react';
import SmallTd from './SmallTd';
import styled from 'styled-components';

const Tr = styled.tr`
height : 4.5rem;
`;
const SmallTr = ({menu, rowIndex, getIndex}) => {
    return (
        <>
        <Tr>
            {Array(7).fill().map((td, i)=>
            <SmallTd menu={menu} rowIndex={rowIndex} cellIndex={i} getIndex={getIndex} />
            )}
        </Tr>
        </>
        
    );
};

export default SmallTr;