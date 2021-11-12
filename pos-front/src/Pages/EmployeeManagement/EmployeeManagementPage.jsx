import Header from "../../Components/Header";
import {Link, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import EmployeeManagementTable from "./Table/EmployeeManagementTable";
import React, {useState} from "react";
import EmployeeAddPage from "./EmployeeAddPage";
import {Modal} from "../../Components/Modal";
import EmployeeCommutingPage from "./EmployeeCommutingPage";
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
  flex-grow: 1;
  overflow: scroll;
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

const EmployeeManagementPage = () => {

    const [commute, setCommute] = useState(false);
    const [addEmployee, setAddEmployee] = useState(false);
    const [changeEmployee, setChangeEmployee] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState(false);

    const onClickEmployeeCommute = () => {
        setCommute(!commute);
    }
    const onClickEmployeeAdd = () => {
        setAddEmployee(!addEmployee);
    }
    const onClickEmployeeChange = () => {
        setChangeEmployee(!changeEmployee);
    }
    const onClickEmployeeDelete = () => {
        setDeleteEmployee(!deleteEmployee);
    }


    return (
        <>
            <Modal visible={commute} >
                <EmployeeCommutingPage/>
            </Modal>
            <Modal visible={addEmployee}>
                <EmployeeAddPage/>
            </Modal>
            <Modal visible={changeEmployee}>
                <EmployeeModifyPage />
            </Modal>
            <Modal visible={deleteEmployee}>
                <EmployeeDeletePage/>
            </Modal>
            <Header text={"직원 관리"} restaurantName={"혜민이네 돈까스"}/>
            <Div>
                <LeftDiv>
                    <EmployeeManagementTable/>
                </LeftDiv>
                <RightDiv>
                    <InnerRightDiv>
                        <Link to="/employeeManagement/workSchedule"><Button>근무표</Button></Link>
                        <Button2 onClick={onClickEmployeeCommute}>직원 출퇴근</Button2>
                        <Link to="/employeeManagement/employeeActivity"><Button>직원활동내역</Button></Link>
                        <Link to="/employeeManagement/employeeApproval"><Button2>직원승인</Button2></Link>
                        <Button onClick={onClickEmployeeAdd}>직원추가</Button>
                        <Button onClick={onClickEmployeeChange}>직원수정</Button>
                        <Button onClick={onClickEmployeeDelete}>직원삭제</Button>
                    </InnerRightDiv>
                </RightDiv>
                <Routes>
                    <Route path="/employeeManagement/workSchedule" element={<EmployeeAddPage/>} />
                    <Route path="/employeeManagement/employeeActivity" element={<EmployeeAddPage/>} />
                    <Route path="/employeeManagement/employeeApproval" element={<EmployeeAddPage/>} />
                </Routes>
            </Div>
        </>
    );
};

export default EmployeeManagementPage;