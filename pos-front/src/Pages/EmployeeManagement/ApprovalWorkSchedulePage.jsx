import React from 'react';
import styled from "styled-components";
import {TableContainer} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import CategoryButton from "../../Components/Button/FragmentWindowButton";
import ModalButton from "../../Components/Button/ModalButton";

const WrapperDiv = styled.div`
    & + & {
      margin-top : 1rem;
    }
    justify-content : center;
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
    right: 50%;
    left: 50%;
`;


const InnerDiv = styled.div`
    & + & {
      margin-top : 1rem;
    }
    display: flex;
    justify-content : center;
    margin-left: auto;
    margin-right: auto;
`;


const HeaderLabel = styled.label`
    padding-top: 1.0rem;
    font-size : 1.5rem;
    display: flex;
    justify-content : center;
`;


const ContentLabel = styled.label`
    font-size: 1.0rem;
    align-content: center;
    text-align: center;
`;


const Input = styled.input`   
    height : 2.0rem;
    width : 13rem;
    background-color : #F2F0F0;
    font-size : 1.0rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem;
    margin-right : 0.5rem;
    margin-left : 1.0rem;
`;

const DividedHr = styled.hr`
  border: solid 1px #000000;
  width: 33rem;
  height: 0;
  margin-bottom: 0;
`;

// td column style
const ColumnCell = styled.td`
    background-color: #474D4E;
    color: white;
    font-size: 15px;
    text-align: center;
    width: 4rem;
    vertical-align: center;
`;

// td style
const EmployeeManagementCell = styled.td`
    background-color: #f3f3f3;
    color: #000000;
    font-size: 15px;
    text-align: center;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    vertical-align: center;
`;

// tr style
const EmployeeManagementRow = styled.tr`
    text-align: center;
    vertical-align: center;
    background-color: #f3f3f3;
    width: 4rem;
    font-size: 15px;
`;

// table style
const EmployeeManagementTableStyle = styled.table`
    align-content: center;
    min-width: 100px;
    width: 100%;
`;

const ApprovalWorkSchedulePage = ({approval, setApproval, reConstruct, setReConstruct}) => {

    const columnName = ['선택', '월', '화', '수', '목', '금', '토', '일'];
    const rowName = ['N', 'B', 'L', 'D'];
    const date = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16);

    const onClickSubmit = () => {
        alert("등록 test");
    }

    const onChangeHandler = (e) => {
        console.log("선택된 value 값: ", e.target.value);
    }

    return (
        <>
            <WrapperDiv>
                <InnerDiv>
                    <HeaderLabel>+ 선택된 직원 정보</HeaderLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 번&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호
                        <Input type="text" value={''} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름
                        <Input type="text" value={''} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 직&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급
                        <Input type="text" value={''} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 현재 시간
                        <Input type="text" value={''||date} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <DividedHr/>
                </InnerDiv>
                <InnerDiv>
                    <HeaderLabel>+ 근무표 등록</HeaderLabel>
                </InnerDiv>
                <InnerDiv>
                    <TableContainer component={Paper} margin='10px' style={{overflow: 'hidden', marginBottom: '1.0rem'}}>
                        <EmployeeManagementTableStyle >
                            <TableHead>
                                <EmployeeManagementRow>
                                    {Array(columnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                        <ColumnCell key={i}>{columnName[i]}</ColumnCell>)}
                                </EmployeeManagementRow>
                            </TableHead>
                            <TableBody>
                                {Array(rowName.length).fill(undefined, undefined, undefined).map((td, i)=>
                                    <EmployeeManagementRow key={i}>
                                        <EmployeeManagementCell key={rowName[i]}>
                                            {rowName[i]}
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={columnName[i]+'월'} id={columnName[i]+'월'} onChange={onChangeHandler}>
                                            <input type="radio" />
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={columnName[i]+'화'} onChange={onChangeHandler}>
                                            <input type="radio"/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={columnName[i]+'수'} onChange={onChangeHandler}>
                                            <input type="radio"/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={columnName[i]+'목'} onChange={onChangeHandler}>
                                            <input type="radio"/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={columnName[i]+'금'} onChange={onChangeHandler}>
                                            <input type="radio"/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={columnName[i]+'토'} onChange={onChangeHandler}>
                                            <input type="radio"/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={columnName[i]+'일'} onChange={onChangeHandler}>
                                            <input type="radio"/>
                                        </EmployeeManagementCell>
                                    </EmployeeManagementRow>)
                                }
                            </TableBody>
                        </EmployeeManagementTableStyle>
                    </TableContainer>
                </InnerDiv>
                <InnerDiv>
                    <ModalButton name={"등록"} onClick={onClickSubmit} />
                </InnerDiv>
            </WrapperDiv>
        </>
    );
}

export default ApprovalWorkSchedulePage
