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
const SaleTd = ({rowIndex, cellIndex, arr}) => {

    const index = rowIndex*7+cellIndex;

    return (
        <Cell key={index}>
            <Menu>
            <div style={{display: 'flex', flexDirection:'column'}}>
                <div style={{marginBottom : '1.3rem'}}>
                    {(index+1>arr.length)? null:arr[index].day}
                </div>
                <div>
                    {(index+1>arr.length)? null:arr[index].매출}
                </div>
            </div>
            </Menu>
        </Cell>
    );
};

export default SaleTd;