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

const List = styled.div`
    & + & {
        margin-top : 0.3rem
    }
    display : flex
`

const SaleTd = ({rowIndex, cellIndex, arr}) => {

    const index = rowIndex*7+cellIndex;
    return (
        <Cell key={index}>
            <Menu>
            <div style={{marginTop:'7%'}}>
                <div style={{float:'left', marginTop:'-12%'}}>
                    {(index+1>arr.length)? null:(arr[index].day!=0)?(+arr[index].day.slice(-2)):null}
                </div>
                {
                    (index+1<=arr.length) && (arr[index].day!=0) && (<div style={{float : 'left', marginTop:'8%', marginLeft:'1%'}}>
                        <List>
                        L : {(index+1>arr.length)? null:(arr[index].L.length!=0)?' '+arr[index].L:null}
                        </List>
                        <List>
                        D :{(index+1>arr.length)? null:(arr[index].D.length!=0)?' '+arr[index].D:null}
                        </List>
                        <List>
                        F :{(index+1>arr.length)? null:(arr[index].F.length!=0)?' '+arr[index].F:null}
                        </List>
                    </div>)
                }   
            </div>
            </Menu>
        </Cell>
    );
};

export default SaleTd;