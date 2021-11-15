import React, {useEffect, useState} from "react";
import ModalButton from "../../Components/Button/ModalButton";
import MintFormTable from "../../Components/Table/MintFormTable";
import axios from "axios";


// input data format (직원 활동 리스트)
const CreateArrivalRowData = (number, name, id, ArrivalDate, pos) => {
    return [number, name, id, ArrivalDate, pos];
}
const CreateLeaveRowData = (number, name, id, leaveDate, pos) => {
    return [number, name, id, leaveDate, pos];
}
const CreatePaymentRowData = (number, name, orderNum, type, totalPrice, payDate, positionNum) => {
    return [number, name, orderNum, type, totalPrice, payDate, positionNum];
}
const CreateOrderRowData = (number, name, type, totalPrice, orderDate, positionNum) => {
    return [number, name, type, totalPrice, orderDate, positionNum];
}
const CreateStockRowData = (number, name, stockNum, stockName, changeAmount, afterAmount, changeDate) => {
    return [number, name, stockNum, stockName, changeAmount, afterAmount, changeDate];
}



const EmployeeActivitiesListPage = () => {

    const arriveColumnName = ['번호', '이름', 'ID', '출근 일자', '직급']
    const leaveColumnName = ['번호', '이름', 'ID', '퇴근 일자', '직급']
    const paymentColumnName = ['결제번호', '이름', '주문 번호', '결제 종류', '결제 금액', '결제 일자', '자리 번호']
    const orderColumnName = ['주문번호', '이름', '주문 종류', '주문 합계', '주문 일자', '자리 번호']
    const stockColumnName = ['번호', '이름', '재고 번호', '재고 이름', '변경량', '변경후 수량', '수정 일자']


    const [changeCello, setChangeCells] = useState([]);   // 테이블 안에 값이 바뀜.
    const [changeTable, setChangeTable] = useState([]);     // 테이블 컬럼 명이 바뀜.


    const changeState = (cellsElement, tableNameElement) => {
        setChangeCells(cellsElement);
        setChangeTable(tableNameElement);
    }

    useEffect(async () => {
        try {
            const res = await axios.post('http://localhost:8080/EmployeeActivity');
            console.log(res);
            const arrivalCells = [
                CreateArrivalRowData(1, 'test1', '1234', '2021-01-01', '사원')
            ];
            changeState(arrivalCells, arriveColumnName);
        } catch (e) {
            console.error(e.message)
        }
    }, []);

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
            CreateOrderRowData(1, 'test4', '테이블', 6000, '2021-01-01', '4')
        ];
        changeState(orderCells, orderColumnName);
    }
    const onClickEmployeeListStock = () => {
        const stockCells = [
            CreateStockRowData(1, 'test5', '1', '돼지고기', 100, 90,'2021-01-01')
        ];
        changeState(stockCells, stockColumnName);
    }

    return (
        <>
            <div style={{marginBottom: '1.0rem'}}>
                <ModalButton name={'출 근'} onClick={onClickEmployeeListArrival}/>
                <ModalButton name={'퇴 근'} onClick={onClickEmployeeListLeave}/>
                <ModalButton name={'결 제'} onClick={onClickEmployeeListPayment}/>
                <ModalButton name={'주 문'} onClick={onClickEmployeeListOrder}/>
                <ModalButton name={'재 고'} onClick={onClickEmployeeListStock}/>
            </div>
            <MintFormTable columnName={changeTable} cells={changeCello} isCheckBox={false}/>
        </>
    )
}

export default EmployeeActivitiesListPage;