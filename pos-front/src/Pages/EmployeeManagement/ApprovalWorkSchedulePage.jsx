import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {TableContainer} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import CategoryButton from "../../Components/Button/FragmentWindowButton";
import ModalButton from "../../Components/Button/ModalButton";
import axios from "axios";

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

const ApprovalWorkSchedulePage = ({reConstruct, approval, setApproval}) => {

    const columnName = ['선택', '일', '월', '화', '수', '목', '금', '토'];
    const tableRowName = ['N(Non)', 'F(Full)', 'L(Lunch)', 'D(Dinner)'];
    const rowName = ['N', 'F', 'L', 'D'];
    const date = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16);

    const [weekState, setWeekState] = useState(['N', 'N', 'N', 'N', 'N', 'N', 'N']);


    const onClickSubmit = async() => {
        console.log(weekState);
        let managerId = window.localStorage.getItem('managerId');
        if (window.confirm("해당 직원을 등록하시겠습니까?")) {
            let approvalData = {
                branchId: managerId,
                employeeId: reConstruct[3],
                workSchedule: weekState.join(''),
            }
            await axios.post('http://localhost:8080/allowEmployee', JSON.stringify(approvalData),
                {headers: {"Content-Type": `application/json`,}}).then((res)=>{
                alert("직원이 정상적으로 승인되었습니다.");
                setApproval(!approval);
                }).catch(error => {
                    console.log(error);
                    alert("직원 승인 오류, 다시 진행 바람");
            })
        }
        setWeekState(['N', 'N', 'N', 'N', 'N', 'N', 'N'])
    }

    const onChangeHandler = (e) => {
        console.log(e.target.value);
        const weekend = e.target.value.substr(0,1);
        weekState[+weekend] = e.target.value.substr(1,1);
    }



    return (
        <>
            <WrapperDiv>
                <InnerDiv>
                    <HeaderLabel>+ 선택된 직원 정보</HeaderLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 번&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호
                        <Input type="text" value={reConstruct[0] || ""} style={{flexGrow:3}} readOnly/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름
                        <Input type="text" value={reConstruct[1] || ""} style={{flexGrow:3}} readOnly/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 직&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급
                        <Input type="text" value={reConstruct[2] || ""} style={{flexGrow:3}} readOnly/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 현재 시간
                        <Input type="text" value={''||date} style={{flexGrow:3}} readOnly/>
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
                                            {tableRowName[i]}
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={'일'+rowName[i]}>
                                            <input type="radio" name='일' value={('0'+rowName[i]) || ""} onChange={(e)=>{onChangeHandler(e)}}
                                                   style={{width: 20, height: 20,}}/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={'월'+rowName[i]}>
                                            <input type="radio" name='월' value={('1'+rowName[i]) || ""} onChange={(e)=>{onChangeHandler(e)}}
                                                   style={{width: 20, height: 20,}}/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={'화'+rowName[i]}>
                                            <input type="radio" name='화' value={('2'+rowName[i]) || ""} onChange={(e)=>{onChangeHandler(e)}}
                                                   style={{width: 20, height: 20,}}/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={'수'+rowName[i]}>
                                            <input type="radio" name='수' value={('3'+rowName[i]) || ""} onChange={(e)=>{onChangeHandler(e)}}
                                                   style={{width: 20, height: 20,}}/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={'목'+rowName[i]}>
                                            <input type="radio" name='목' value={('4'+rowName[i]) || ""} onChange={(e)=>{onChangeHandler(e)}}
                                                   style={{width: 20, height: 20,}}/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={'금'+rowName[i]}>
                                            <input type="radio" name='금' value={('5'+rowName[i]) || ""} onChange={(e)=>{onChangeHandler(e)}}
                                                   style={{width: 20, height: 20,}}/>
                                        </EmployeeManagementCell>
                                        <EmployeeManagementCell key={'토'+rowName[i]}>
                                            <input type="radio" name='토' value={('6'+rowName[i]) || ""} onChange={(e)=>{onChangeHandler(e)}}
                                                   style={{width: 20, height: 20,}}/>
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
