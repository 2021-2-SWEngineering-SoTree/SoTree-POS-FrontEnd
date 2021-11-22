import React, { useState } from 'react';
import styled from "styled-components";
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Tr from "./Tr";
import {findAllByDisplayValue} from "@testing-library/react";

//  I'm going to write the code first,
//  and then divide the file during the refactoring.

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 25px;
    text-align: center;
`;

// td style
const EmployeeManagementCell = styled.td`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 30px;
    text-align: center;
`;

// tr style
const EmployeeManagementRow = styled.tr`
    background-color: #FFFFFF
`;

// table style
const EmployeeManagementTableStyle = styled.table`
    min-width: 700px;
    width: 100%;
`;


const MintFormTable = ({columnName, cells, setGetNumber, isNameButton}) => {

    //----------------- check box ---------------------------------------------------

    const onChange = (e) => {
        const name = e.target.value; // 우선 e.target 에서 name 과 value 를 추출
        console.log(name);
        setGetNumber(name);
    };

    //--------------------------------------------------------------------------------
    const showRow = (cells, ele) => {
        return (
            Array(cells.length).fill(undefined, undefined, undefined).map((obj, j)=>
                <EmployeeManagementCell key={j}>
                    {cells[j]==='blink' ?
                        <input name='radio' type="radio" value={ele} onChange={onChange} style={{width: 30, height: 30,}}/>
                        : cells[j]}
                </EmployeeManagementCell>)
        )
    }

    // choice 봐야됨.
    return (
        <TableContainer component={Paper} margin='10px' style={{overflow: 'hidden',}}>
            <EmployeeManagementTableStyle>
                <TableHead>
                    <EmployeeManagementRow>
                        {Array(columnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                            <ColumnCell key={i}>{columnName[i]}</ColumnCell>)}
                    </EmployeeManagementRow>
                </TableHead>
                <TableBody>
                    {Array(cells.length).fill(undefined, undefined, undefined).map((td, i)=>
                        <EmployeeManagementRow key={i}>
                            {showRow(cells[i], i)}
                        </EmployeeManagementRow>)
                    }
                </TableBody>
            </EmployeeManagementTableStyle>
        </TableContainer>
    );
};

export default MintFormTable
