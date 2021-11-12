import React from 'react';
import styled from 'styled-components';

const Cell = styled.td`
    width : 14%;
    background-color: #ffffff;
    border : 1px solid #000000;
`;

const Menu = styled.button`
    width:100%;
    height:100%;
    background-color:#ffffff;
    border : 0px;
    &:focus {
    background: #7D7272;
    }
`;
const SmallTd = ({rowIndex, cellIndex, menu, getIndex}) => {

    const index = rowIndex*7+cellIndex;
    const showMenu = () =>{getIndex(index)};

    return (
        <Cell key={index} onClick={showMenu}>
            <Menu>
            <div style={{display: 'flex', flexDirection:'column'}}>
                <div style={{marginBottom : '1.3rem'}}>
                    {(index+1>menu.length)? null:menu[index].menuName}
                </div>
                <div>
                    {(index+1>menu.length)? null:menu[index].price}
                </div>
            </div>
            </Menu>
        </Cell>
    );
};

export default SmallTd;