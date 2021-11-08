import React, { useState } from 'react';
import styled from "styled-components";
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

//  ji-hwan
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

// input data format
const CreateRowData = (choice, number, name, id, pw, latestData, pos) => {
    return ({choice, number, name, id, pw, latestData, pos });
}

//---------------------- input rows information(back-end)---------------------
const cells = [
    CreateRowData('blink', '1', '이호준',
        'hello', '1234', '2021-11-03 13:00', '사장'),
    CreateRowData('blink', '2', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '3', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '4', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '5', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '6', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '7', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '8', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '9', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '10', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '11', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '12', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '13', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '14', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '15', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '16', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '17', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '18', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '19', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '20', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '21', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '22', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
    CreateRowData('blink', '23', '최지환',
        'world', '2345', '2021-11-03 13:00', '직원'),
]
//-----------------------------------------------------------------------------

const CheckBox = () => {
    return (
        <input type="checkbox" style={{width: 30, height: 30,}}/>
    );
};

//--------------------------------------------------------------------------------

const EmployeeManagementTable = () => {

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

    // choice 봐야됨.
    return (
        <TableContainer component={Paper} margin='10px' style={{overflow: 'hidden',}}>
            <EmployeeManagementTableStyle>
                <TableHead>
                    <EmployeeManagementRow>
                        <ColumnCell>선택</ColumnCell>
                        <ColumnCell>번호</ColumnCell>
                        <ColumnCell>이름</ColumnCell>
                        <ColumnCell>ID</ColumnCell>
                        <ColumnCell>비밀번호</ColumnCell>
                        <ColumnCell>최근 출근일자</ColumnCell>
                        <ColumnCell>직급</ColumnCell>
                    </EmployeeManagementRow>
                </TableHead>
                <TableBody>
                    {cells.map((cell) => (
                        <EmployeeManagementRow key={cell.number}>
                            <EmployeeManagementCell component="th" scope="cell">
                                <CheckBox id={cell.number} checked={cChecked}
                                          onChange={e => checkHandler(e)}/>
                            </EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.number}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.name}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.id}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.pw}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.latestData}</EmployeeManagementCell>
                            <EmployeeManagementCell>{cell.pos}</EmployeeManagementCell>
                        </EmployeeManagementRow>
                    ))}
                </TableBody>
            </EmployeeManagementTableStyle>
        </TableContainer>
    );
};

export default EmployeeManagementTable
