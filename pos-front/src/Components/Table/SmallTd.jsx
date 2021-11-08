import React from 'react';
import styled from 'styled-components';

const Cell = styled.td`
    width : 14%;
    background-color: #ffffff;
    border : 1px solid #000000;
`;

const SmallTd = ({rowIndex, cellIndex, menu}) => {
    
    const showMenu = () =>{console.log(menu)};
    const index = rowIndex*7+cellIndex;

    return (
        <Cell onClick={showMenu}>
            <div style={{display: 'flex', flexDirection:'column'}}>
                <div style={{marginBottom : '1.3rem'}}>
                    {(index+1>menu.length)? null:menu[index].menuName}
                </div>
                <div>
                    {(index+1>menu.length)? null:menu[index].price}
                </div>
            </div>
        </Cell>
    );
};

export default SmallTd;