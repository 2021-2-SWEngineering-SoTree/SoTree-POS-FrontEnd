import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import ModalButton from "../../Components/Button/ModalButton";
import {AiOutlineDown} from "react-icons/ai";
import {IoRefresh} from "react-icons/all";

//  I'm going to write the code first,
//  and then divide the file during the refactoring.

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 25px;
    text-align: center;
    vertical-align: center;
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

// name button
const NameSortedButton = styled.button`
    background-color: #8DDEE9;
    border-color: #8DDEE9;
    opacity: 1;
    height: 50%;
    vertical-align: middle;
    padding-top: 0.4rem;
    margin-bottom: 0.2rem;
`;

const NotExistDataDiv = styled.div`
    display: flex;
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    margin-left: 400px;
    margin-right: 400px;
    margin-top: 200px;
`


const MintFormTable = ({columnName, cells, setGetNumber, clickListener,
                           sortedClickHandler, isNameButton, sorted, emptyFlag}) => {

    //----------------- check box ---------------------------------------------------

    const onChange = (e) => {
        const name = e.target.value; // 우선 e.target 에서 name 과 value 를 추출
        console.log(name);
        setGetNumber(name);
    };

    useEffect(() => {
        console.log(emptyFlag);
    }, [emptyFlag])

    //--------------------------------------------------------------------------------
    const showRow = (cells, ele) => {
        return (
            Array(cells.length).fill(undefined, undefined, undefined).map((obj, j)=>
                <EmployeeManagementCell key={j}>
                    {cells[j]==='blink' ?
                        <input name='radio' type="radio" value={ele} onChange={onChange} style={{width: 30, height: 30,}}/>
                        : (cells[j] === 'approval' ?
                            <ModalButton value={ele} name={'승인'} onClick={()=>clickListener(ele)}/>
                            : cells[j])}
                </EmployeeManagementCell>)
        )
    }

    // choice 봐야됨.
    return (
        <>
        { !emptyFlag ?
        <TableContainer component={Paper} margin='10px' style={{overflow: 'hidden',}}>
            <EmployeeManagementTableStyle >
                <TableHead>
                    <EmployeeManagementRow>
                        {Array(columnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                isNameButton ?
                                (!sorted?
                                    <ColumnCell key={i+columnName[i]}>{columnName[i]}<NameSortedButton onClick={()=>sortedClickHandler(i)}><AiOutlineDown/></NameSortedButton></ColumnCell>:
                                    <ColumnCell key={i+columnName[i]}>{columnName[i]}<NameSortedButton onClick={()=>sortedClickHandler(i)}><IoRefresh/></NameSortedButton></ColumnCell>
                                )
                                :<ColumnCell key={i}>{columnName[i]}</ColumnCell>
                        )}
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
            : <NotExistDataDiv>데이터가 존재하지 않습니다.</NotExistDataDiv>}
        </>
    );
};

export default MintFormTable
