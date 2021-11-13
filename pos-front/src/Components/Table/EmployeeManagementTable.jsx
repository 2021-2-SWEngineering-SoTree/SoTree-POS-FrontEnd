import React, { useState } from 'react';
import styled from "styled-components";
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Tr from "./Tr";

//  I'm going to write the code first,
//  and then divide the file during the refactoring.

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 30px;
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

//-----------------------------------------------------------------------------

const CheckBox = () => {
    return (
        <input type="checkbox" style={{width: 30, height: 30,}}/>
    );
};

//--------------------------------------------------------------------------------

const EmployeeManagementTable = ({columnName, cells, isCheckBox}) => {

    // check box    -> 나중에 해결.
    const [checkedInputs, setCheckedInputs] = useState(new Set());
    const [cChecked, setChecked] = useState(false);

    const changeHandler = (checked, checkNumber) => {
        if (checked) {
            checkedInputs.add(checkNumber);
            setCheckedInputs(checkedInputs);
            console.log("check it");
        }
        else {
            // check cancel
            checkedInputs.delete(checkNumber);
            setCheckedInputs(checkedInputs);
            console.log("check cancel");
        }
    };

    const checkHandler = ({target}) => {
        setChecked(!cChecked);
        changeHandler(target.checked, target.number);
    }

    const length = {isCheckBox} ? {columnName}.length-1 : {columnName}.length;

    // choice 봐야됨.
    return (
        <TableContainer component={Paper} margin='10px' style={{overflow: 'hidden',}}>
            <EmployeeManagementTableStyle>
                <TableHead>
                    <EmployeeManagementRow>
                        {Array(columnName.length).fill().map((tr,i)=>
                            <ColumnCell>{columnName[i]}</ColumnCell>)}

                    </EmployeeManagementRow>
                </TableHead>
                <TableBody>
                    {cells.map((cell) => (
                        <EmployeeManagementRow key={cell.number}>
                            <EmployeeManagementCell component="th" scope="cell">
                                {isCheckBox && <CheckBox id={cell.number} checked={cChecked}
                                                          onChange={e => checkHandler(e)}/>}
                            </EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.number}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.name}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.id}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.pw}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.latestDate}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.pos}</EmployeeManagementCell>
                        </EmployeeManagementRow>
                    ))}
                </TableBody>
            </EmployeeManagementTableStyle>
        </TableContainer>
    );
};

export default EmployeeManagementTable
