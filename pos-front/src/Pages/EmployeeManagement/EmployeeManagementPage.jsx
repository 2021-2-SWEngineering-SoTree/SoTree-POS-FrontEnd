import Header from "../../Components/Header";
import {Link, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import MintFormTable from "../../Components/Table/MintFormTable";
import React, {useEffect, useState} from "react";
import EmployeeAddPage from "./EmployeeAddPage";
import EmployeeActivitiesListPage from "./EmployeeActivitiesListPage";
import RectangleModal from "../../Components/Modal/RectangleModal";
import EmployeeCommutingPage from "./EmployeeCommutingPage";
import axios from "axios";
import EmployeeModifyPage from "./EmployeeModifyPage";
import EmployeeDeletePage from "./EmployeeDeletePage";


const Div = styled.div`
    max-width: 1980px;
    padding: 20px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height: 680px;
`;


const LeftDiv = styled.div`
    width: 200%;
    height: 100%;
    padding-top: 2.0rem;
    flex-grow: 1;
    overflow: scroll;
    display: ${(props) => (props.visible ? 'block' : 'none')};
`;


const RightDiv = styled.div`
    width: 70%;
    margin-top: 3%;
    margin-bottom: 3%;
    align-items: center;
`;


const InnerRightDiv = styled.div`
    vertical-align: middle;
    text-align: center;
    margin-top: 0;
    align-items: center;
`;


const Button = styled.button`
    top: 50%;
    width: 20rem;
    height: 4rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size: 1.3rem;
    margin-bottom: 1rem;
`;


const Button2 = styled.button`
    top: 50%;
    width: 20rem;
    height: 4rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size: 1.3rem;
    margin-bottom: 3rem;
`;


// input data format (직원 리스트)
const CreateRowData = (choice, number, name, id, pw, latestDate, pos) => {
    return [choice, number, name, id, pw, latestDate, pos];
}


const EmployeeManagementPage = () => {

    const columnName = ['선택', '번호', '이름', 'ID', '비밀번호', '최근 출근일자', '직급']

    const [commute, setCommute] = useState(false);

    const [addEmployee, setAddEmployee] = useState(false);
    const [changeEmployee, setChangeEmployee] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState(false);

    const [cello, setCells] = useState([]);     // 초반 테이블 내용
    const [listOfEmployee,  setEmployeeList] = useState(false);  // 버튼 클릭시 LeftDiv 의 변경


    const onClickEmployeeCommute = () => { setCommute(!commute); }
    const onClickEmployeeAdd = () => { setAddEmployee(!addEmployee); }
    const onClickEmployeeChange = () => { setChangeEmployee(!changeEmployee); }
    const onClickEmployeeDelete = () => { setDeleteEmployee(!deleteEmployee); }
    const onClickEmployeeList = () => { setEmployeeList(!listOfEmployee); }

    useEffect(async () => {
        try {
            const cells = []
            // 데이터를 받아오는 동안 시간 소모. await 대기
            const res = await axios.post('http://localhost:8080/getAllPersonName')
            console.log(res);
            console.log(res.data);

            for (let i = 0; i < res.data.length; i++) {

                cells.push(CreateRowData('blink', i+1, res.data[i].personName,
                    'hello', '1234', '2021-11-03 13:00', '사장'))
            }
            setCells(cells);
            console.log(cello);
        } catch (e) {
            console.error(e.message)
        }
    }, []);

    return (
        <>
            <RectangleModal visible={commute}>
                <EmployeeCommutingPage visible={commute} setCommute={setCommute}/>
            </RectangleModal>
            <RectangleModal visible={addEmployee}>
                <EmployeeAddPage visible={addEmployee}/>
            </RectangleModal>
            <RectangleModal visible={changeEmployee}>
                <EmployeeModifyPage/>
            </RectangleModal>
            <RectangleModal visible={deleteEmployee}>
                <EmployeeDeletePage/>
            </RectangleModal>
            <Header text={"직원 관리"} restaurantName={"혜민이네 돈까스"}/>
            <Div>
                <LeftDiv visible={!listOfEmployee}>
                    <MintFormTable columnName={columnName} cells={cello} isCheckBox={true}/>
                </LeftDiv>
                <LeftDiv visible={listOfEmployee}>
                    <EmployeeActivitiesListPage/>
                </LeftDiv>
                <RightDiv>
                    <InnerRightDiv>
                        <Link to="/employeeManagement/workSchedule"><Button>근무표</Button></Link>
                        <Button2 onClick={onClickEmployeeCommute}>직원 출퇴근</Button2>
                        <Button onClick={onClickEmployeeList}>직원활동내역</Button>
                        <Link to="/employeeManagement/employeeApproval"><Button2>직원승인</Button2></Link>
                        <Button onClick={onClickEmployeeAdd}>직원추가</Button>
                        <Button onClick={onClickEmployeeChange}>직원수정</Button>
                        <Button onClick={onClickEmployeeDelete}>직원삭제</Button>
                    </InnerRightDiv>
                </RightDiv>
                <Routes>
                    <Route path="/employeeManagement/workSchedule" element={<EmployeeAddPage/>} />
                    <Route path="/employeeManagement/employeeActivity" element={<EmployeeActivitiesListPage/>} />
                    <Route path="/employeeManagement/employeeApproval" element={<EmployeeAddPage/>} />
                </Routes>
            </Div>
        </>
    );
};

export default EmployeeManagementPage;