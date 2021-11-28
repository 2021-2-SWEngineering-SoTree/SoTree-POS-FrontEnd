import React, {useEffect, useState} from "react";
import ModalButton from "../../Components/Button/ModalButton";
import MintFormTable from "../../Components/Table/MintFormTable";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner"


// input data format (직원 활동 리스트)
const CreateArrivalRowData = (number, name, id, ArrivalDate, pos) => {
    return [number, name, id, ArrivalDate, pos];
}
const CreateLeaveRowData = (number, name, id, leaveDate, pos) => {
    return [number, name, id, leaveDate, pos];
}
const CreatePaymentRowData = (number, name, orderNum, type, totalPrice, payDate) => {
    return [number, name, orderNum, type, totalPrice, payDate];
}
const CreateOrderRowData = (number, name, type, totalPrice, orderDate) => {
    return [number, name, type, totalPrice, orderDate];
}
const CreateStockRowData = (number, name, stockNum, stockName, changeAmount, afterAmount, changeDate) => {
    return [number, name, stockNum, stockName, changeAmount, afterAmount, changeDate];
}



const EmployeeActivitiesListPage = ({cello}) => {

    const [loading, setLoading] = useState(false);

    const yearList = [2021, 2022];
    const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const getDayOfMonth = (month) => {
        if(month === 1 || month === 3 || month === 5 || month === 7
        || month === 8 || month === 10 || month === 12) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        }
        else if(month === 2) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        }
    }

    const arriveColumnName = ['번호', '이름', 'ID', '출근 일자', "직급"]
    const leaveColumnName = ['번호', '이름', 'ID', '퇴근 일자', '직급']
    const paymentColumnName = ['결제번호', '이름', '주문 번호', '결제 종류', '결제 금액', '결제 일자']
    const orderColumnName = ['주문번호', '이름', '주문 종류', '주문 합계', '주문 일자']
    const stockColumnName = ['번호', '이름', '재고 번호', '재고 이름', '변경량', '수정 일자','메모']

    const date = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
    const currentMonth = date.substr(5,2);
    const currentYear = date.substr(0,4);
    const currentDay = '-1';

    const [changeCello, setChangeCells] = useState([]);   // 테이블 안에 값이 바뀜.
    const [changeTable, setChangeTable] = useState([]);     // 테이블 컬럼 명이 바뀜.
    const [emptyFlag, setEmptyFlag] = useState(false);

    const [selectMonth, setSelectMonth] = useState(currentMonth);      // 선택된 월
    const [selectDay, setSelectDay] = useState(currentDay);
    const [selectYear, setSelectYear] = useState(currentYear);
    const [criterion, setCriterion] = useState("COME");
    const [sortedCategoryCello, setSortedCategoryCello] = useState([]);
    const [saveChangeCello, setSaveChangeCello] = useState([]);
    const [sortedCategory, setSortedCategory] = useState(-1);

    const changeState = (cellsElement, tableNameElement) => {
        setChangeCells(cellsElement);
        setChangeTable(tableNameElement);
        setSaveChangeCello(copySorted(cellsElement, sortedCategory));
    }

    const formatOfTime = (year, month, day) => {
        let date = '';
        if(day === "" || day === '-1') { date = String(selectYear) + '-' + String(selectMonth); }
        else { date = String(selectYear) + - + String(selectMonth) + '-' + String(selectDay) }
        console.log(date);
        return date;
    }

    const getEmployeeList = async (cri, dat, id) => {
        let data = {
            criterion: cri,
            date: dat,
            BranchId: id
        }
        return await axios.post('http://localhost:8080/manage/EmployeeActivity', JSON.stringify(data), {
            headers : {
                "Content-Type" : `application/json`
            }})
    }

    useEffect(async () => {
        try {
            console.log("effect year: ", selectYear);
            console.log("effect month: ", selectMonth);
            console.log("effect day: ", selectDay);
            // 2021-10
            // 2021-10-11 두가지 경우.
            let managerId = window.localStorage.getItem('managerId');
            console.log('Employee List Change');
            const new_date = formatOfTime(selectYear, selectMonth, selectDay);
            let result = await getEmployeeList(criterion, new_date, managerId);
            console.log("result: ", result.data);

            let cells = [];
            if(result.data[0] === undefined) {
                changeState([''], [''])
                setEmptyFlag(true);
            }
            else {
                setEmptyFlag(false)
                let keys = Object.keys(result.data[0]);

                console.log("keys: ",keys);

                if (criterion === "COME") {
                    for (let i = 0 ; i < result.data.length; i++){
                        cells.push( CreateArrivalRowData(i+1, result.data[i][keys[0]],
                            result.data[i][keys[1]], result.data[i][keys[2]], '직원'));
                    }
                    changeState(cells, arriveColumnName);
                }
                if (criterion === "OUT") {
                    for (let i = 0 ; i < result.data.length; i++){
                        cells.push( CreateLeaveRowData(i+1, result.data[i][keys[0]],
                            result.data[i][keys[1]], result.data[i][keys[2]], '직원'));
                    }
                    changeState(cells, leaveColumnName);
                }
                if (criterion === "PAY") {
                    for (let i = 0 ; i < result.data.length; i++){
                        cells.push( CreatePaymentRowData(i+1, result.data[i][keys[3]],
                            result.data[i][keys[4]], result.data[i][keys[5]], result.data[i][keys[1]],
                            result.data[i][keys[0]]));
                    }
                    changeState(cells, paymentColumnName);
                }
                if (criterion === "ORDER") {
                    for (let i = 0 ; i < result.data.length; i++){
                        cells.push( CreateOrderRowData(result.data[i][keys[6]], result.data[i][keys[4]],
                            result.data[i][keys[3]], result.data[i][keys[0]], result.data[i][keys[1]]));
                    }
                    changeState(cells, orderColumnName);
                }
                if (criterion === "STOCK") {
                    for (let i = 0 ; i < result.data.length; i++) {
                        let name = result.data[i][keys[5]] === "NULL" ? "관리자": result.data[i][keys[5]];
                        cells.push( CreateStockRowData(i+1, name,
                            result.data[i][keys[0]], result.data[i][keys[2]], result.data[i][keys[6]],
                            result.data[i][keys[3]], result.data[i][keys[4]]))
                    }
                    changeState(cells, stockColumnName);
                }
            }
            setLoading(true);
        } catch (e) {
            console.error(e.message)
        }
    }, [selectYear, selectMonth, selectDay, criterion, cello]);

    const onClickEmployeeListArrival = async () => { setCriterion("COME"); }    // COME
    const onClickEmployeeListLeave = async () => { setCriterion("OUT"); }       // OUT
    const onClickEmployeeListPayment = async () => { setCriterion("PAY"); }     // PAY
    const onClickEmployeeListOrder = async () => { setCriterion("ORDER"); }     // ORDER
    const onClickEmployeeListStock = async () => { setCriterion("STOCK"); }     // STOCK

    // select year select
    const handleYearChangeSelect = (e) => {
        console.log("선택된 년(Year) ", e.target.value);
        setSelectYear(e.target.value);
    }

    // select month select
    const handleMonthChangeSelect = (e) => {
        console.log("선택된 월(month): ", e.target.value);
        setSelectMonth(e.target.value);
        setSelectDay('-1');
    }

    // select day select
    const handleDayChangeSelect = (e) => {
        console.log("선택된 일(day): ", e.target.value);
        setSelectDay(e.target.value);
    }
    // sorted
    const copySorted = (arr, i) =>{
        return arr.slice().sort((a, b) => {
            return a[i] < b[i] ? -1 : a[i] > b[i] ? 1 : 0;
        });
    }

    useEffect(async () => {
        await sortedClickHandler(0);
    }, [loading, changeTable])

    useEffect(async () => {
        console.log("2번째 useEffect sortedCategoryCello 값: ", sortedCategoryCello);
        await setSortedCategoryCello(copySorted(saveChangeCello, sortedCategory));
        setSaveChangeCello(changeCello);
    }, [sortedCategory])

    useEffect(async () => {
        await setChangeCells(sortedCategoryCello);
    },[sortedCategoryCello])

    const sortedClickHandler = async(i) => {
        console.log("이름순 정렬 클릭");
        setSortedCategory(i);
    }
    //
    return (
        <>
            <div>
                <div style={{float: 'Left', marginBottom: '1.0rem'}}>
                    <ModalButton name={'출 근'} onClick={onClickEmployeeListArrival}/>
                    <ModalButton name={'퇴 근'} onClick={onClickEmployeeListLeave}/>
                    <ModalButton name={'결 제'} onClick={onClickEmployeeListPayment}/>
                    <ModalButton name={'주 문'} onClick={onClickEmployeeListOrder}/>
                    <ModalButton name={'재 고'} onClick={onClickEmployeeListStock}/>
                </div>
                <div>
                    <div style={{float: 'Right', margin: '1.0rem', marginRight: '0.5rem'}}>
                        <select onChange={handleDayChangeSelect} value={selectDay || ''} style={{marginTop: '2.0rem'}}>
                            <option value={"-1" || ''}>전체</option>
                            {getDayOfMonth(selectYear).map((day) =>
                                <option key={day} value={day || ''}>{day}일</option>)}
                        </select>
                    </div>
                    <div style={{float: 'Right', margin: '1.0rem', marginRight: '0.5rem'}}>
                        <select onChange={handleMonthChangeSelect} value={selectMonth || ''} style={{marginTop: '2.0rem'}}>
                            {monthList.map((month) =>
                                <option key={month} value={month || ''}>{month}월</option>)}
                        </select>
                    </div>
                    <div style={{float: 'Right', margin: '1.0rem', marginRight: '0.5rem'}}>
                        <select onChange={handleYearChangeSelect} value={selectYear || ''} style={{marginTop: '2.0rem'}}>
                            {yearList.map((year) =>
                                <option key={year} value={year || ''}>{year}년</option>)}
                        </select>
                    </div>
                </div>
            </div>
            {!loading ? <Spinner/> :
            <div>
                <MintFormTable columnName={changeTable} cells={changeCello} isNameButton={true}
                               sortedClickHandler={sortedClickHandler} emptyFlag={emptyFlag}/>
            </div>}
        </>
    )
}

export default EmployeeActivitiesListPage;