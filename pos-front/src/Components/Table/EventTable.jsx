import React, { useState } from 'react';
import styled from "styled-components";
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import ModalButton from "../../Components/Button/ModalButton";

//  I'm going to write the code first,
//  and then divide the file during the refactoring.

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 25px;
    text-align: center;
`;

// td style
const EventCell = styled.td`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 20px;
    text-align: center;
`;

// tr style
const EventRow = styled.tr`
    background-color: #FFFFFF
`;

// table style
const EventTableStyle = styled.table`
    min-width: 580px;
    width: 100%;
`;

const TableButton = styled.button`
    min-width: 580px;
    width: 100%;
    font-size: 20px;
    background-color: aliceblue;
`;

const EventTable = ({columnName, cells, eventApply, setEventId}) => {

    //----------------- check box ---------------------------------------------------

    // 더미 해결해야됨.
    const onClickButton = (e) => {
        const getEventId = e.target.value; // 우선 e.target 에서 name 과 value 를 추출
        /**/
        console.log(getEventId);
        setEventId(getEventId);
    };

    //--------------------------------------------------------------------------------
    const showRow = (cells, ele) => {
        return (
            Array(cells.length).fill(undefined, undefined, undefined).map((obj, j)=>
                <EventCell key={cells+j}>
                    {j !== 0 ?  // 일단 value 를 더미로 넣은거임.
                        <TableButton value={cells+j} onClick={onClickButton}>{cells[j]}</TableButton>
                        : cells[j]}
                </EventCell>)
        )
    }

    // choice 봐야됨.
    return (
        <TableContainer component={Paper} margin='10px'>
            <EventTableStyle>
                <TableHead>
                    <EventRow>
                        {Array(columnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                            <ColumnCell key={i}>{columnName[i]}</ColumnCell>)}
                    </EventRow>
                </TableHead>
                <TableBody >
                    {Array(cells.length).fill(undefined, undefined, undefined).map((td, i)=>
                        <EventRow key={i}>
                            {showRow(cells[i], i)}
                        </EventRow>)
                    }
                </TableBody>
            </EventTableStyle>
        </TableContainer>
    );
};

export default EventTable
