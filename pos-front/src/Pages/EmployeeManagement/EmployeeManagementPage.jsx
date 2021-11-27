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
import EmployeeApprovalPage from "./EmployeeApprovalPage";


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
    padding-top: 0rem;
    flex-grow: 1;
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
const CreateRowData = (choice, number, name, id, birthday, email, phone, pos) => {
    return [choice, number, name, id, birthday, email, phone, pos];
}


const EmployeeManagementPage = () => {

    const columnName = ['선택', '번호', '이름', 'ID', '생년월일', '이메일', '전화번호', '직급']
    const [employeeManagementChange, setEmployeeManagementChange] = useState(1);
    const [employeeId, setEmployeeId] = useState([]);

    const [commute, setCommute] = useState(false);
    const [addEmployee, setAddEmployee] = useState(false);
    const [changeEmployee, setChangeEmployee] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState(false);

    const [getNumber, setGetNumber] = useState(-1);
    const [cello, setCells] = useState([]);     // 초반 테이블 내용
    const [listOfEmployee,  setEmployeeList] = useState(1);  // 버튼 클릭시 LeftDiv 의 변경

    let selectedEmployee = [];
    let selectedEmployeeId = -1;
    const [reConstruct, setReConstruct] = useState([0, '', '']);


    const onClickEmployeeCommute = () => {
        if (getNumber === -1) {
            alert("직원이 선택되지 않았습니다.");
        }
        else {
            selectedEmployee = cello[getNumber];
            selectedEmployeeId = employeeId[getNumber];
            // index(1): number, index(2):name, index(7): pos
            setReConstruct([selectedEmployee[1], selectedEmployee[2], selectedEmployee[7], selectedEmployeeId]);
            console.log("check row", reConstruct)
            setCommute(!commute);
        }
    }
    const onClickEmployeeAdd = () => { setAddEmployee(!addEmployee); }
    const onClickEmployeeChange = () => { setChangeEmployee(!changeEmployee); }
    const onClickEmployeeDelete = () => { setDeleteEmployee(!deleteEmployee); }
    const onClickEmployeeList = () => {
        setEmployeeManagementChange((employeeManagementChange === 1
        || employeeManagementChange === 3) ? 2 : 1);
        setEmployeeList((listOfEmployee === 1
            || listOfEmployee === 3) ? 2 : 1);
    }
    const onClickEmployeeApproval = () => {
        setEmployeeManagementChange((employeeManagementChange === 1
        || employeeManagementChange === 2) ? 3 : 1);
        setEmployeeList((listOfEmployee === 1
            || listOfEmployee === 2) ? 3 : 1);
    }

    const onClickName = () => {
        cello.sort(cello[2]);
        setCells(cello);
    }

    useEffect(async () => {
        try {
            let managerId = window.localStorage.getItem('managerId');
            // 데이터를 받아오는 동안 시간 소모. await 대기
            await axios.post('http://localhost:8080/getAllUser',  JSON.stringify(managerId), {
                headers : {
                    "Content-Type" : `application/json`,
                }
            }).then((res)=>{
                const cells = [];
                const cell2 = [];
                console.log(res);
                console.log(res.data);

                for (let i = 0; i < res.data.length; i++) {
                    cell2.push(res.data[i].employeeId);
                    cells.push(CreateRowData('blink', i+1, res.data[i].personName,
                        res.data[i].loginId, res.data[i].birthDay, res.data[i].email, res.data[i].phoneNumber, res.data[i].position))
                }
                setCells(cells);
                setEmployeeId(cell2);
                console.log(employeeId);
                console.log(cello);
            })
        } catch (e) {
            console.error(e.message)
        }
    }, [listOfEmployee, employeeManagementChange]);

    return (
        <>
            <RectangleModal setSelectCategory={setCommute} visible={commute} TitleName={"직원 출퇴근"}>
                <EmployeeCommutingPage visible={commute} setCommute={setCommute} reConstruct={reConstruct} setReConstruct={setReConstruct}/>
            </RectangleModal>
            <RectangleModal setSelectCategory={setAddEmployee} visible={addEmployee} TitleName={"직원 추가"} mode = {'employee'}>
                <EmployeeAddPage visible={addEmployee}/>
            </RectangleModal>
            <RectangleModal setSelectCategory={setChangeEmployee} visible={changeEmployee} TitleName={"직원 수정"}>
                <EmployeeModifyPage/>
            </RectangleModal>
            <RectangleModal setSelectCategory={setDeleteEmployee} visible={deleteEmployee} TitleName={"직원 삭제"}>
                <EmployeeDeletePage/>
            </RectangleModal>
            <Header text={"직원 관리"} restaurantName={"혜민이네 돈까스"}/>
            <Div>
                <LeftDiv visible={listOfEmployee===1} style={{paddingTop: "2.0rem", overFlow: "scroll"}}>
                    <MintFormTable columnName={columnName} cells={cello} setGetNumber={setGetNumber} isNameButton={false}/>
                </LeftDiv>
                <LeftDiv visible={listOfEmployee===2} style={{overflow: "auto", marginTop: "2.0rem"}}>
                    <EmployeeActivitiesListPage cello={cello}/>
                </LeftDiv>
                <LeftDiv visible={listOfEmployee===3} style={{overflow: "auto", marginTop: "2.0rem"}}>
                    <EmployeeApprovalPage setGetNumber={setGetNumber}/>
                </LeftDiv>
                <RightDiv>
                    <InnerRightDiv>
                        <Link to="/employeeManagement/workSchedule"><Button>근무표</Button></Link>
                        <Button2 onClick={onClickEmployeeCommute}>직원 출퇴근</Button2>
                        <Button onClick={onClickEmployeeList}>{employeeManagementChange === 2 ? "직원관리로 돌아가기" : "직원활동내역"}</Button>
                        <Button2 onClick={onClickEmployeeApproval}>{employeeManagementChange === 3 ? "직원관리로 돌아가기" :"직원 승인"}</Button2>
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