import Header from "../../Components/Header";
import {Link, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import EmployeeManagementTable from "../../Components/Table/EmployeeManagementTable";
import React, {useEffect, useState} from "react";
import EmployeeAddPage from "./EmployeeAddPage";
import EmployeeActivitiesListPage from "./EmployeeActivitiesListPage";
import RectangleModal from "../../Components/Modal/RectangleModal";
import EmployeeCommutingPage from "./EmployeeCommutingPage";
import axios from "axios";
import EmployeeModifyPage from "./EmployeeModifyPage";
import EmployeeDeletePage from "./EmployeeDeletePage";
import ModalButton from "../../Components/Button/ModalButton";


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


// input data format
const CreateRowData = (choice, number, name, id, pw, latestDate, pos) => {
    return [choice, number, name, id, pw, latestDate, pos];
}
const CreateArrivalRowData = (number, name, id, ArrivalDate, pos) => {
    return [number, name, id, ArrivalDate, pos];
}
const CreateLeaveRowData = (number, name, id, leaveDate, pos) => {
    return [number, name, id, leaveDate, pos];
}
const CreatePaymentRowData = (number, name, orderNum, type, totalPrice, payDate, positionNum) => {
    return [number, name, orderNum, type, totalPrice, payDate, positionNum];
}
const CreateOrderRowData = (number, name, type, totalPrice, amount, orderDate, positionNum) => {
    return [number, name, type, totalPrice, amount, orderDate, positionNum];
}
const CreateStockRowData = (number, name, stockNum, stockName, beforeAmount, afterAmount, changeDate) => {
    return [number, name, stockNum, stockName, beforeAmount, afterAmount, changeDate];
}

//---------------------- input rows information(back-end)---------------------


const EmployeeManagementPage = () => {

    const columnName = ['선택', '번호', '이름', 'ID', '비밀번호', '최근 출근일자', '직급']
    const arriveColumnName = ['번호', '이름', 'ID', '출근 일자', '직급']
    const leaveColumnName = ['번호', '이름', 'ID', '퇴근 일자', '직급']
    const paymentColumnName = ['결제번호', '이름', '주문 번호', '결제 종류', '결제 금액', '결제 일자', '자리 번호']
    const orderColumnName = ['주문번호', '이름', '주문 종류', '주문 합계', '수량', '주문 일자', '자리 번호']
    const stockColumnName = ['번호', '이름', '재고 번호', '재고 이름', '변경전 수량', '변경후 수량', '수정 일자']

    const [commute, setCommute] = useState(false);
    const [listOfEmployee,  setEmployeeList] = useState(false);
    const [addEmployee, setAddEmployee] = useState(false);
    const [changeEmployee, setChangeEmployee] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState(false);

    const cells = []
    const [cello, setCells] = useState([]);
    const [changeCello, setChangeCells] = useState([]);   // 테이블 안에 값이 바뀜.
    const [changeTable, setChangeTable] = useState([]);     // 테입르 컬럼 명이 바뀜.

    const onClickEmployeeCommute = () => { setCommute(!commute); }
    const onClickEmployeeAdd = () => { setAddEmployee(!addEmployee); }
    const onClickEmployeeChange = () => { setChangeEmployee(!changeEmployee); }
    const onClickEmployeeDelete = () => { setDeleteEmployee(!deleteEmployee); }
    const onClickEmployeeList = () => {
        onClickEmployeeListArrival();
        setEmployeeList(!listOfEmployee);
    }

    const changeState = (cellsElement, tableNameElement) => {
        setChangeCells(cellsElement);
        setChangeTable(tableNameElement);
    }

    const onClickEmployeeListArrival = () => {
        const arrivalCells = [
            CreateArrivalRowData(1, 'test1', '1234', '2021-01-01', '사원')
        ];
        changeState(arrivalCells, arriveColumnName);
    }
    const onClickEmployeeListLeave = () => {
        const leaveCells = [
            CreateLeaveRowData(1, 'test2', '1234', '2021-01-01', '사원')
        ];
        changeState(leaveCells, leaveColumnName);
    }
    const onClickEmployeeListPayment = () => {
        const paymentCells = [
            CreatePaymentRowData(1, 'test3', 2, '현금', 6000, '2021-10-01 12:00', 4)
        ];
        changeState(paymentCells, paymentColumnName);
    }
    const onClickEmployeeListOrder = () => {
        const orderCells = [
            CreateOrderRowData(1, 'test4', '테이블', 6000, 1, '2021-01-01', '4')
        ];
        changeState(orderCells, orderColumnName);
    }
    const onClickEmployeeListStock = () => {
        const stockCells = [
            CreateStockRowData(1, 'test5', '1', '돼지고기', 100, 90,'2021-01-01')
        ];
        changeState(stockCells, stockColumnName);
    }



    useEffect(async () => {
        try {
            // 데이터를 받아오는 동안 시간 소모. await 대기
            const res = await axios.post('http://localhost:8080/getAllPersonName')
            //console.log(res);
            // 받아온 데이터로 다음 일을 진행하려고 await 로 대기
            // 받아온 데이터를 map 해주어 rowData 별 data 선언
            console.log(res.data);

            for (let i = 0; i < res.data.length; i++) {
                cells.push(CreateRowData('blink', i+1, res.data[i],
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
                    <EmployeeManagementTable columnName={columnName} cells={cello} isCheckBox={true}/>
                </LeftDiv>
                <LeftDiv visible={listOfEmployee}>
                    <div style={{marginBottom: '1.0rem'}}>
                    <ModalButton name={'출 근'} onClick={onClickEmployeeListArrival}/>
                    <ModalButton name={'퇴 근'} onClick={onClickEmployeeListLeave}/>
                    <ModalButton name={'결 제'} onClick={onClickEmployeeListPayment}/>
                    <ModalButton name={'주 문'} onClick={onClickEmployeeListOrder}/>
                    <ModalButton name={'재 고'} onClick={onClickEmployeeListStock}/>
                    </div>
                    <EmployeeManagementTable columnName={changeTable} cells={changeCello} isCheckBox={false}/>
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