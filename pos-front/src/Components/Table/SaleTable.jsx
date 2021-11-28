import React from 'react';
import styled from 'styled-components';
import SaleTr from './SaleTr';

const TableDiv = styled.table`
    border-collapse : collapse;
    border : 1px solid #000000;
`;

const Tr = styled.tr`
height : 3vh;
`;

const Cell = styled.td`
    width : 14%;
    background-color: #ffffff;
    border : 1px solid #000000;
    font-weight : bold;
    text-align : center;
`;

const SaleTable = ({week, arr, width, height}) => {
    
    return (
        <>
        {!week &&<h3 style={{marginLeft:'32%'}}>근무표를 불러옵니다..</h3>}
        {week && 
        <TableDiv style={{width:width, height:height}}>
        <Tr>
            <Cell style={{backgroundColor:'#FFEEEE'}}><span style={{color:'red'}}>일</span></Cell>
            <Cell style={{backgroundColor:'#F5F5F5'}}>월</Cell>
            <Cell style={{backgroundColor:'#F5F5F5'}}>화</Cell>
            <Cell style={{backgroundColor:'#F5F5F5'}}>수</Cell>
            <Cell style={{backgroundColor:'#F5F5F5'}}>목</Cell>
            <Cell style={{backgroundColor:'#F5F5F5'}}>금</Cell>
            <Cell style={{backgroundColor:'#EEEEFF'}}><span style={{color:'blue'}}>토</span></Cell>
        </Tr>
        {Array(week).fill().map((data,i)=> 
                <SaleTr arr={arr} rowIndex={i}/>
                )}
        </TableDiv> 
        
        }
        </>
    );
};

export default SaleTable;