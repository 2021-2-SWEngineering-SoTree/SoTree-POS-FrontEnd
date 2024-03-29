import { Navigate, useLocation, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import Header from "../../Components/Header";
import styled from 'styled-components';
import Calculator from "../../Components/Calculator/Calculator";
import CircledRectButton from "../../Components/Button/CircledRectButton";
import { Paper, TableContainer } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import InfoSpace from "../../Components/InfoSpace";
import { BsFillCreditCard2BackFill, } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineInput } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import React, { Component, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SmallTable from "../../Components/Table/SmallTable";
import { CardPay, MultiPay, CashPay } from './Pay';
import SaleDefaultMenuPage from "./RightDivComponents/SaleDefaultMenuPage";
import DisCount from "./Discount/DisCount";
import Event from "./Discount/Event";
import Receipt from "./Pay/Receipt";

const Div = styled.div`
    margin : 0.5rem 1rem;
    height : 85vh;
    display : flex;
`;

const LeftDiv = styled.div`
    margin : 0.5rem;
    width : 41%;
`
const LeftTopDiv = styled.div`
    height : 34%;
    border : 1px solid black;
    margin-bottom : 0.5rem;
`;

const LeftBottomDiv = styled.div`
    height : 65%;
    border : 1px solid black;
    display : flex;
`;

const LeftBottomInDiv = styled.div`
    width : 50%;
    border : 1px solid black;
`;

const LeftBottomTopDiv = styled.div`
    height : 20%;
    border : 1px solid black;
    text-align : center;
`

const RightDiv = styled.div`
    margin : 0.5rem;
    width : 57%;
`;

const RightTopDiv = styled.div`
    height : 79%;
    border : 1px solid black;
    margin-bottom : 0.5rem;
`;

const RightTopTopDiv = styled.div`
    height : 15%;
    border : 1px solid black;
    text-align:center;
`;

const RightTopBottomDiv = styled.div`
    height : 85%;
    border : 1px solid black;
`;

const BottomBottomRightDiv = styled.div`
    border : 1px solid black;
    width : 30%;
`;

const BottomBottomLeftDiv = styled.div`
    width : 70%;
    text-align: right;
    font-size : 2rem;
`;

const RightBottomDiv = styled.div`
    height : 20%;
    border : 1px solid black;
`;

const LeftBottomTwoDiv = styled.div`
    height : 80%;
    display : flex;
`

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 20px;
    text-align: center;
`;

// td style
const OrderCell = styled.td`
    color: #000000;
    font-size: 20px;
    text-align: center;
`;

// tr style
const OrderRow = styled.tr`
    background-color: ${props => props.checked ? '#E4E6E7' : '#F2F8F9'};
    &:focus {
        background: #FF0000;
    }
`;

const ResultRow = styled.tr`
    background-color : #474D4E;
`
// table style
const TableStyle = styled.table`
    min-width: 700px;
    width: 100%;
`;

const Button = styled.button`
    width : 50%;
    height : 4em;
    background-color: #474D4E;
    color : #ffffff;
    border : 1px solid white;
    cursor : pointer;
`

const InfoContent = styled.div`
    padding : 2rem 0rem;
    text-align:center;
    font-size:20px;
    border : 1px solid black;
`

const NumberDiv = styled.div`
    border : 1px solid black;
    background-color : #F2F8F9;
    height : 2.7rem;
    margin-left : 15%;
    margin-right : 10%;
    margin-top : 2%;
    width : 70%;
    margin-bottom : 0.4rem;
`;

const LeftBottomBottomDiv = styled.div`
    margin-top : 10%;
    text-align : center;
    top : 50%;
    left : 50%;
`

const StaffSelector = styled.select`
    height : 2rem;
    width : 6.2rem;
    background-color : #F2F0F0;
    font-size : 1.3rem;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.5rem; 
    margin-right : 2rem;
    text-align : center;
`;

const ChangeButton = styled.button`
    background-color : #474D4E;
    color : white;
    height : 3.3rem;
    font-size:1.3rem;
    cursor : pointer;
`

const BottomButton = styled.button`
    background-color : #474D4E;
    color : white;
    height : 95%;
    width : 13.6%;
    font-size:1.3rem;
    cursor : pointer;
    margin : 0.2rem;
    border-radius : 15px;
`

const CategoryButton = styled.button`
    background-color : #474D4E;
    border-radius : 15px;
    color : #FFFFFF;
    height : 5.3rem;
    width : 13.9%;
    margin : 0.1rem;
    text-align : center;
    font-size : 1.3rem;
    cursor : pointer;
    &:focus {
        background: #8DDEE9;
    }
`

const UnderTableDiv = styled.div`
    width : 100%;
    height : 15%;
    margin-top : 0.1vh;
    padding : 0px;
`

const SalePage = () => {

    let params = useLocation();
    const [index, setIndex] = useState(-1);
    const [menus, setMenus] = useState([]); //axios를 통해 메뉴가져옴.
    const [categoryMenus, setCategoryMenus] = useState([]); //전체 메뉴중 선택된 카테고리의 메뉴. 카테고리 바뀔때마다 불러옴.
    const [category, setCategory] = useState(''); //선택된 카테고리

    const [newOrders, setNewOrders] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [seatNum, setSeatNum] = useState(params.state[0].seatNum)
    const [orderId, setOrderId] = useState('');
    const [click, setClick] = useState(0);
    const [changeQuantity, setChangeQuantity] = useState('');


    //
    const [discountMessage, setDiscountMessage] = useState('');


    // 오더 states
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setToltalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [nottotalPrice, setNottotalPrice] = useState(0);

    const [calculNum, setCalculNum] = useState(0);
    const [orderSelection, setOrderSelection] = useState(-1);


    // 결제 states

    const [payedPrice, setPayedPrice] = useState(0);


    // 결제내역/ 담당자 정보 구분
    const [leftBot, setLeftBot] = useState(true);

    //담당자
    const [selectEmployee, setSelectEmployee] = useState('-1');
    //선택된 담당자
    const [employeeName, setEmployeeName] = useState(window.localStorage.getItem('userName'))
    const [employeeId, setEmployeeId] = useState(-1);
    const [employeeList, setEmployeeList] = useState([]);

    const onChangeEmployee = (e) => {
        setSelectEmployee(e.target.value);
        console.log("employeeSelect", e.target.value);
    };

    const changeEmployee = () => {
        console.log("직원", employeeList);
        if (selectEmployee >= '0') {
            setEmployeeId(employeeList[selectEmployee].personName !== window.localStorage.getItem('userName') ? employeeList[selectEmployee].EmployeeId : -1);
            setEmployeeName(employeeList[selectEmployee].personName);
        }
    };

    let navigation = useNavigate();

    const getMenus = async () => {
        let managerId = localStorage.getItem('managerId')
        await axios.post('http://localhost:8080/menu/getAll', managerId, {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then(async (res) => {
            let CurrentTableInfo;
            let employeeInfo;
            console.log("zz", params.state[0].seatNum - 100);
            employeeInfo = await getEmployeeList();
            if (params.state[0].seatNum < 100) {
                CurrentTableInfo = await getCurrentTableInfo();
                if (CurrentTableInfo.data.orderId >= 0) {
                    console.log("currentTable", CurrentTableInfo.data);
                    const currentOrderList = makeOrderStyle(CurrentTableInfo.data.orderDetailSummaries);
                    const currentTotalAmount = CurrentTableInfo.data.orderDetailSummaries.reduce((ac, arr) => { return ac + arr.quantity }, 0);
                    setCurrentOrders(currentOrderList);
                    setToltalPrice(CurrentTableInfo.data.totalPrice);
                    setTotalAmount(currentTotalAmount);
                    setOrderId(CurrentTableInfo.data.orderId);
                }
            } else {
                let temp = await getCurrentTakeOutInfo();
                CurrentTableInfo = temp.data[params.state[0].seatNum - 100];
                console.log("Test", CurrentTableInfo);
                if (params.state[0].seatNum - 100 < temp.data.length) {
                    console.log("zz", temp.data.length);
                    if (CurrentTableInfo.orderId >= 0) {
                        console.log("currentTable", CurrentTableInfo);
                        const currentOrderList = makeOrderStyle(CurrentTableInfo.orderDetailSummaries);
                        const currentTotalAmount = CurrentTableInfo.orderDetailSummaries.reduce((ac, arr) => { return ac + arr.quantity }, 0);
                        setCurrentOrders(currentOrderList);
                        setToltalPrice(CurrentTableInfo.totalPrice);
                        setTotalAmount(currentTotalAmount);
                        setOrderId(CurrentTableInfo.orderId);
                    }
                }
            }
            setMenus(() => res.data);
            setEmployeeList(employeeInfo.data);
        }).catch(e => {
            console.log(e);
        })
    };

    const getCurrentTableInfo = async () => {
        let managerId = localStorage.getItem('managerId')
        return axios.post(`http://localhost:8080/order/getOneTableInfo/${managerId}/${params.state[0].seatNum + 1}`, {
            headers: {
                "Content-Type": `application/json`,
            }
        })
    };

    const getCurrentTakeOutInfo = async () => {
        let managerId = localStorage.getItem('managerId')
        return axios.post(`http://localhost:8080/order/getTakeoutOrder/${managerId}`, {
            headers: {
                "Content-Type": `application/json`,
            }
        })
    };


    const getCategoryMenus = (category) => {
        console.log(menus);
        setCategoryMenus(menus.filter((menu) => (menu.menuCategory === category)));
    };

    const getIndex = (index) => {
        setIndex(index);
        console.log(typeof categoryMenus[index]);
        if (categoryMenus[index])
            updateNewOrders(categoryMenus[index]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        console.log('get menu useeffect');
        await getMenus();
        console.log('직원', employeeList);
        console.log(menus);
        setCategory('세트메뉴')
        document.getElementById('세트메뉴').focus();
    }, []);

    useEffect(() => {
        console.log('change categoryMenus useeffect');
        getCategoryMenus(category);
        //makeCategoryMenusFull();
        console.log(categoryMenus);
    }, [category]);

    useEffect(() => {
        setNottotalPrice(totalPrice);
    }, [totalPrice]);

    const onClickCategoryButton = (e) => {
        console.log(e.target.name);
        setCategory(e.target.name);
        getCategoryMenus(e.target.name);
    }

    const updateNewOrders = (selected) => {
        const index = newOrders.findIndex((key) => key.name === selected.menuName);
        // console.log("new", newOrders)
        // console.log("find", index);
        // console.log("current", currentOrders)

        if (index >= 0) {
            let temp = newOrders.filter(arr => arr.name !== selected.menuName);
            const data = {
                name: selected.menuName,
                price: selected.price,
                quantity: newOrders[index].quantity + 1,
                discount: newOrders[index].discount,
                totalprice: newOrders[index].totalprice + selected.price,
                message: newOrders[index].message,
            }
            setNewOrders([...temp.slice(0, index), data, ...temp.slice(index, temp.length)]);
        } else {
            setNewOrders((prev) => [...prev, {
                name: selected.menuName,
                price: selected.price,
                quantity: 1,
                discount: 0,
                totalprice: selected.price,
                message: '',
            }])
        }

        const index2 = currentOrders.findIndex((key) => key.name === selected.menuName);
        if (index2 >= 0) {
            let temp = currentOrders.filter(arr => arr.name !== selected.menuName);
            console.log(temp);
            console.log("current order ", currentOrders[index2])
            let data = {
                name: selected.menuName,
                price: selected.price,
                quantity: currentOrders[index2].quantity + 1,
                discount: currentOrders[index2].discount,
                totalprice: currentOrders[index2].totalprice + selected.price,
                message: currentOrders[index2].message,
            }
            setCurrentOrders([...temp.slice(0, index2), data, ...temp.slice(index2, temp.length)]);
        } else {
            setCurrentOrders((prev) => [...prev, {
                name: selected.menuName,
                price: selected.price,
                quantity: 1,
                discount: 0,
                totalprice: selected.price,
                message: '',
            }])
        }
        setToltalPrice((prev) => prev + selected.price);
        setTotalAmount((prev) => prev + 1);
        setTotalDiscount((prev) => prev + 0);
        console.log("NEW ORDER CHANGE", newOrders);
    };

    useEffect(() => {
        console.log("change check")
    }, [newOrders, currentOrders])
    //
    const orderInfoClickHandler = (index, e) => {
        e.preventDefault();
        console.log(index);
        document.getElementById("order" + String(index)).focus();
        setOrderSelection(index);
    }

    const minus = (a, b) => a - b;

    const makeOrderHandler = async (e) => {
        e.preventDefault();
        let deleteflag = currentOrders.reduce((ac, arr) => { return arr.quantity === 0 ? ac + 1 : ac + 0 }, 0)
        if (deleteflag === currentOrders.length) {
            await orderDeleteHandler();
        } else {
            if (orderId !== '') {
                await updateTableOrder();
            } else {
                await makeOrder();
            }
        }
        navigation('/CurrentSeatInfo');
    }


    const makeOrder = async () => {
        let managerId = window.localStorage.getItem('managerId');
        const orderDetails = makeOrdetailMap(newOrders);
        const data = {
            totalPrice: totalPrice,
            startTime: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0, 16),
            orderType: "TABLE_ORDER",
            seatNumber: seatNum + 1,
            isSeated: "True",
            managerId: managerId,
            employeeId: employeeId,
            orderDetails: orderDetails,
        };
        console.log(data);
        await axios.post('http://localhost:8080/order/addTableOrder', JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e));
    }

    const makeOrdetailMap = (order) => {
        let orderdetails = [];
        order.forEach(function (item, index) {
            let temp = {};
            temp[item.name] = item.quantity;
            console.log("temp", temp)
            orderdetails.push(temp);
        })
        console.log("오더디테일 만들기", orderdetails)
        return orderdetails;
    };

    const makeOrderStyle = (summary) => {
        let order = [];
        summary.forEach(function (item, index) {
            let temp = {};
            temp["name"] = item.menu.menuName;
            temp["price"] = item.menu.price;
            temp["quantity"] = item.quantity;
            temp["totalprice"] = item.menu.price * item.quantity;
            temp["message"] = '';
            temp["discount"] = 0;
            console.log("변경체크", temp);
            order.push(temp);
        })
        console.log("오더 만들기", order);
        return order;
    }


    const changeSelectionOrderQuantity = (i, count) => {
        const index = newOrders.findIndex((key) => key.name === currentOrders[i].name);
        if (index >= 0 && newOrders[index].quantity >= 0) {
            let temp = newOrders.filter(arr => arr.name !== currentOrders[index].name);
            const data = {
                name: currentOrders[i].name,
                price: currentOrders[i].price,
                quantity: newOrders[index].quantity + count,
                discount: newOrders[index].discount,
                totalprice: count * currentOrders[i].price + newOrders[index].totalprice,
                message: newOrders[i].message === '취소' ? '' : newOrders[i].message,
            }
            if (data.quantity <= 0) {
                data.message = '취소';
                data.quantity = 0;
                data.discount = 0;
                data.totalprice = 0;
            }
            setNewOrders([...temp.slice(0, index), data, ...temp.slice(index, temp.length)]);
        }
        const index2 = currentOrders.findIndex((key) => key.name === currentOrders[i].name);
        if (index2 >= 0 && currentOrders[index2].quantity >= 0) {
            let temp = currentOrders.filter(arr => arr.name !== currentOrders[index2].name);
            console.log(temp);
            console.log("current order ", currentOrders[index])
            let data = {
                name: currentOrders[i].name,
                price: currentOrders[i].price,
                quantity: currentOrders[i].quantity + count,
                discount: currentOrders[i].discount,
                totalprice: count * currentOrders[i].price + currentOrders[i].totalprice,
                message: currentOrders[i].message === '취소' ? '' : currentOrders[i].message,
            }
            if (data.quantity <= 0) {
                data.message = '취소';
                data.quantity = 0;
                data.discount = 0;
                data.totalprice = 0;
            }
            setCurrentOrders([...temp.slice(0, index2), data, ...temp.slice(index2, temp.length)]);
        }
        if (count + currentOrders[index2].quantity >= 0) {
            setToltalPrice((prev) => count * currentOrders[i].price + prev);
            setTotalAmount((prev) => prev + count);
            setTotalDiscount((prev) => prev + 0);
        }
    }

    const getEventHandler = async () => {

    }


    const takeOutOrderHandler = async () => {
        let deleteflag = currentOrders.reduce((ac, arr) => { return arr.quantity === 0 ? ac + 1 : ac + 0 }, 0)
        if (deleteflag === currentOrders.length) {
            await orderDeleteHandler();
        } else {
            if (orderId !== '') {
                await updateTakeOutOrder();
            } else {
                await makeTakeOutOrder();
            }
        }
        navigation('/CurrentSeatInfo');
    }

    const makeTakeOutOrder = async () => {
        let managerId = window.localStorage.getItem('managerId');
        const orderDetails = makeOrdetailMap(newOrders);
        const data = {
            totalPrice: totalPrice,
            startTime: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0, 16),
            orderType: "TAKEOUT_ORDER",
            takeoutTickNumber: seatNum + 1,
            managerId: managerId,
            employeeId: employeeId,
            orderDetails: orderDetails,
        };
        console.log(data);
        await axios.post('http://localhost:8080/order/addTakeoutOrder', JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e));
    }

    const updateTableOrder = async () => {
        let managerId = window.localStorage.getItem('managerId');
        const orderDetails = makeOrdetailMap(currentOrders);
        const data = {
            totalPrice: totalPrice,
            orderId: orderId,
            startTime: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0, 16),
            orderType: "TABLE_ORDER",
            seatNumber: seatNum + 1,
            isSeated: "True",
            managerId: managerId,
            employeeId: employeeId,
            orderDetails: orderDetails,
        };
        console.log(data);
        await axios.put('http://localhost:8080/order/updateTableOrder', JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e));
    }

    const updateTakeOutOrder = () => {
        let managerId = window.localStorage.getItem('managerId');
        const orderDetails = makeOrdetailMap(currentOrders);
        const data = {
            totalPrice: totalPrice,
            orderId: orderId,
            startTime: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0, 16),
            orderType: "TAKEOUT_ORDER",
            seatNumber: seatNum + 1,
            isSeated: "True",
            managerId: managerId,
            employeeId: employeeId,
            orderDetails: orderDetails,
        };
        console.log(data);
        axios.put('http://localhost:8080/order/updateTakeoutOrder', JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((res) => {
            console.log(res);
            navigation('/CurrentSeatInfo');
        }).catch(e => console.log(e));

    }

    const orderDeleteHandler = async () => {
        let managerId = window.localStorage.getItem('managerId');
        const data = JSON.stringify({
            orderId: orderId,
            managerId: managerId,
            employeeId : employeeId,
        });
        const url = seatNum < 100 ? 'http://localhost:8080/order/deleteTableOrder' : 'http://localhost:8080/order/deleteTakeoutOrder';
        await axios.delete(url, {
            data: data,
            headers: {
                "Content-Type": `application/json; charset=UTF-8`,
            }
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e));
    }

    const orderFinishButtonHandler = () => {
        let managerId = window.localStorage.getItem('managerId');
        if (params.state[0].seatNum >= 100 && (totalPrice+totalDiscount !== 0)) {
            alert("결제를 먼제 진행해주세요!");
            return;
        }
        const data = JSON.stringify({
            orderId: orderId,
            branchId: managerId,
            finishTime: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0, 16)
        });
        axios.post('http://localhost:8080/order/finishAlarm', data, {
            headers: {
                "Content-Type": `application/json; charset=UTF-8`,
            }
        }).then((res) => {
            console.log(res);
            alert("음식완성알림성공");
            if (params.state[0].seatNum >= 100) {
                navigation('/CurrentSeatInfo');
            }
        }).catch(e => console.log(e));
    }

    const getEmployeeList = async () => {
        let managerId = window.localStorage.getItem('managerId');
        return axios.post('http://localhost:8080/getComingEmployee', managerId, { headers: { "Content-Type": "text/plain" } }
        )
    }

    const allCancleHandler = (e) => {
        e.preventDefault();
        for (var i in currentOrders) {
            var row = currentOrders[i];
            row.quantity = 0;
            row.discount = 0;
            row.totalprice = 0;
            row.message = '취소';
        }
        setCurrentOrders(currentOrders)
        setToltalPrice(0);
        setTotalAmount(0);
        setTotalDiscount(0);
    }

    // const selectCancleHander = (e) =>{
    //     e.preventDefault();
    //     if(orderSelection >= 0){
    //         const temp = newOrders.filter((arr,index) => index!==orderSelection);
    //         const temp2 = currentOrders.filter((arr,index) => index!==orderSelection);
    //         const cancleAmount = currentOrders.filter((arr,index) => index===orderSelection).reduce((ac, arr)=>{return ac + arr.quantity},0);
    //         const canclePriceSum = currentOrders.filter((arr,index) => index===orderSelection).reduce((ac, arr)=>{return ac + arr.quantity*arr.price},0);

    //         console.log("test",canclePriceSum);
    //         setNewOrders(temp);
    //         setCurrentOrders(temp2);
    //         setOrderSelection(-1);
    //         setToltalPrice((prev)=>prev-canclePriceSum);
    //         setTotalAmount((prev)=>prev - cancleAmount);
    //     }
    // }
    const selectCancleHander = (e) => {
        e.preventDefault();
        if (orderSelection >= 0) {
            let index = orderSelection;
            let temp = currentOrders.filter(arr => arr.name !== currentOrders[index].name);
            const cancleAmount = currentOrders.filter((arr, i) => i === orderSelection).reduce((ac, arr) => { return ac + arr.quantity }, 0);
            const canclePriceSum = currentOrders.filter((arr, i) => i === orderSelection).reduce((ac, arr) => { return ac + arr.quantity * arr.price }, 0);
            let data = {
                name: currentOrders[index].name,
                price: currentOrders[index].price,
                quantity: 0,
                discount: 0,
                totalprice: 0,
                message: '취소',
            }
            setCurrentOrders([...temp.slice(0, index), data, ...temp.slice(index, temp.length)]);
            console.log("test", canclePriceSum);
            setNewOrders([...temp.slice(0, index), data, ...temp.slice(index, temp.length)]);
            setOrderSelection(-1);
            setToltalPrice((prev) => prev - canclePriceSum);
            setTotalAmount((prev) => prev - cancleAmount);
        } else {
            alert("취소할 주문메뉴를 선택해주세요!");
        }
    }


    const plusButtonHandler = (index, e) => {
        e.preventDefault();
        if (currentOrders.length > index && index >= 0) { changeSelectionOrderQuantity(index, 1); }
    }

    const minusButtonHandler = (index, e) => {
        e.preventDefault();
        if (currentOrders.length > index && index >= 0) { changeSelectionOrderQuantity(index, -1); }
    }

    const quantityChangeButtonHandler = (e) => {
        e.preventDefault();
        if (currentOrders.length > index && orderSelection >= 0 && +changeQuantity > 0) {
            changeSelectionOrderQuantity(orderSelection, +changeQuantity - currentOrders[orderSelection].quantity);
        }
        setCalculNum(0);
        setChangeQuantity('');
    }

    const downSelectionHandler = (e) => {
        e.preventDefault();
        let next = orderSelection + 1 !== currentOrders.length ? orderSelection + 1 : 0;
        setOrderSelection(next);
    }

    const upSelectionHandler = (e) => {
        e.preventDefault();
        let next = orderSelection - 1 >= 0 ? orderSelection - 1 : currentOrders.length - 1;
        setOrderSelection(next);
    }

    const backClickHandler = (e) => {
        e.preventDefault();
        navigation('/CurrentSeatInfo');
    }

    const changeDiv = (e) => {
        e.preventDefault();
        navigation('/sale/cashPay');
    }

    const btnClick = (i) => {
        console.log(i);
        setClick(i);
    }

    const calcPayedPrice = (i) => {
        console.log(i);
        setPayedPrice(i);
    }

    useEffect(() => { }, [changeQuantity])

    const updateDiscount = (finalPrice, previousPrice, message) => {
        setToltalPrice(finalPrice);
        setDiscountMessage(message);
        setTotalDiscount(previousPrice);
    };

    return (
        <>

            {click === 3 && <Header text={"판매"} restaurantName={localStorage.getItem('storeName')} none={true}/>}
            {!(click === 3) && <Header text={"판매"} restaurantName={localStorage.getItem('storeName')} />}
            <Div>

                <LeftDiv>
                    <LeftTopDiv>
                        <TableContainer component={Paper} margin='10px' style={{ height: '90%', overflow: 'hidden', }}>
                            <TableStyle>
                                <TableHead>
                                    <OrderRow>
                                        <ColumnCell>번호</ColumnCell>
                                        <ColumnCell>메뉴명</ColumnCell>
                                        <ColumnCell>단가</ColumnCell>
                                        <ColumnCell>수량</ColumnCell>
                                        <ColumnCell>할인</ColumnCell>
                                        <ColumnCell>금액</ColumnCell>
                                        <ColumnCell>비고</ColumnCell>
                                    </OrderRow>
                                </TableHead>
                                <TableBody>
                                    {currentOrders.length > 0 && currentOrders.map((cell, index) => (
                                        index - orderSelection > -6 ?
                                            <OrderRow id={"order" + String(index)} onClick={(e) => { orderInfoClickHandler(index, e) }} checked={index === orderSelection ? true : false}>
                                                <OrderCell component="th" scope="cell">{index + 1}</OrderCell>
                                                <OrderCell>{cell.name}</OrderCell>
                                                <OrderCell>{cell.price.toLocaleString()}</OrderCell>
                                                <OrderCell>{cell.quantity}</OrderCell>
                                                <OrderCell>{cell.discount.toLocaleString()}</OrderCell>
                                                <OrderCell>{cell.totalprice.toLocaleString()}</OrderCell>
                                                <OrderCell>{cell.message}</OrderCell>
                                            </OrderRow>
                                            : null
                                    ))}
                                </TableBody>
                            </TableStyle>
                        </TableContainer>
                        <UnderTableDiv>
                            <TableStyle>
                                <TableHead>
                                    <ResultRow>
                                        <th style={{ width: '43%', color: 'white' }}>합계</th>
                                        <th style={{ width: '10%', color: 'white' }}>{totalAmount.toLocaleString()}</th>
                                        <th style={{ width: '10%', color: 'white' }}>{totalDiscount.toLocaleString()}</th>
                                        <th style={{ width: '16%', color: 'white' }}>{totalPrice.toLocaleString()}</th>
                                        <th style={{ width: '16%', color: 'white' }}>{discountMessage}</th>
                                    </ResultRow>
                                </TableHead>
                            </TableStyle>
                        </UnderTableDiv>
                    </LeftTopDiv>

                    <LeftBottomDiv>
                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton name={'전체\n취소'} size={'5rem'} size2={'5rem'} radius={'30px'} onClick={allCancleHandler} />
                                <CircledRectButton name={'선택\n취소'} size={'5rem'} size2={'5rem'} radius={'30px'} onClick={selectCancleHander} />
                                <CircledRectButton name={'할인\n적용'} size={'5rem'} size2={'5rem'} radius={'30px'} onClick={(e) => { btnClick(4) }} />
                                <CircledRectButton name={'수량\n변경'} size={'5rem'} size2={'5rem'} radius={'30px'} onClick={quantityChangeButtonHandler} />
                            </LeftBottomTopDiv>
                            <Button onClick={() => setLeftBot(true)}>결제 내역</Button>
                            <Button onClick={() => setLeftBot(false)}>담당자 정보</Button>

                            {leftBot && (
                                <>
                                    <InfoContent>
                                        <b>Payment Requirement</b>
                                    </InfoContent>
                                    <InfoSpace name={'총 금 액'} value={(totalPrice + totalDiscount).toLocaleString()} color={'white'} />
                                    <InfoSpace name={'할인금액'} value={totalDiscount.toLocaleString()} color={'white'} />
                                    <InfoSpace name={'받을금액'} value={nottotalPrice.toLocaleString()} color={'yellow'} />
                                    <InfoSpace name={'받은금액'} value={payedPrice.toLocaleString()} color={'white'} />
                                    <InfoSpace name={'거스름돈'} value={totalPrice === payedPrice ? '0' : minus(payedPrice, nottotalPrice) > 0 ? minus(payedPrice, nottotalPrice).toLocaleString() : '0'} color={'yellow'} />
                                </>
                            )}

                            {!leftBot && (
                                <>
                                    <InfoContent>
                                        <b>Information about the person<br />in charge</b>
                                    </InfoContent>
                                    <InfoSpace name={'담당자직급'} value={employeeId === -1 ? "관리자" : "직원"} color={'white'} />
                                    <InfoSpace name={'직 원 명'} value={employeeName} color={'white'} />

                                    <LeftBottomBottomDiv>
                                        <StaffSelector onChange={onChangeEmployee}>
                                            {employeeList && employeeList.map((arr, i) =>
                                                <>
                                                    <option value={i} key={i + arr.personName}>{arr.personName}</option>
                                                </>
                                            )}
                                        </StaffSelector>
                                        <ChangeButton onClick={changeEmployee}>담당자 변경</ChangeButton>
                                    </LeftBottomBottomDiv>
                                </>
                            )}

                        </LeftBottomInDiv>

                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={1} onClick={(e) => { minusButtonHandler(orderSelection, e) }}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={2} onClick={(e) => { plusButtonHandler(orderSelection, e) }}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={3} onClick={upSelectionHandler}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={4} onClick={downSelectionHandler}></CircledRectButton>
                            </LeftBottomTopDiv>

                            <LeftBottomTwoDiv>
                                <BottomBottomLeftDiv>
                                    <NumberDiv>{calculNum}&nbsp;</NumberDiv>
                                    <Calculator num={'2.6em'} num2={'5.3em'} quantity={calculNum} changeQuantity={setCalculNum}
                                        quantity2={(click !== 0) ? payedPrice : changeQuantity} changeQuantity2={(click !== 0) ? setPayedPrice : setChangeQuantity} />
                                </BottomBottomLeftDiv>
                                <BottomBottomRightDiv>

                                    <CircledRectButton name={'포장'} size={'6rem'} size2={'4.2rem'} radius={'20px'} onClick={takeOutOrderHandler} />
                                    <CircledRectButton name={'이벤트'} size={'6rem'} size2={'4.2rem'} radius={'20px'} onClick={(e) => { btnClick(5) }} />
                                    <CircledRectButton name={''} size={'6rem'} size2={'4.2rem'} radius={'20px'} />
                                    <CircledRectButton name={''} size={'6rem'} size2={'4.2rem'} radius={'20px'} />
                                    <CircledRectButton name={'기타'} size={'6rem'} size2={'4.2rem'} radius={'20px'} />
                                </BottomBottomRightDiv>
                            </LeftBottomTwoDiv>

                        </LeftBottomInDiv>
                    </LeftBottomDiv>
                </LeftDiv>

                <RightDiv>
                    {(click === 0) && <SaleDefaultMenuPage onClickCategoryButton={onClickCategoryButton} btnClick={btnClick}
                        categoryMenus={categoryMenus} getIndex={getIndex} makeOrderHandler={makeOrderHandler} backClickHandler={backClickHandler}
                        changeDiv={changeDiv} orderFinishButtonHandler={orderFinishButtonHandler} />}
                    {(click === 1) && <CashPay eId={employeeId} payedPrice={payedPrice} orderId={orderId} employee={employeeId} totalPrice={totalPrice} setpayPrice={calcPayedPrice} setClick={setClick} />}
                    {(click === 2) && <CardPay eId={employeeId} payedPrice={payedPrice} orderId={orderId} employee={employeeId} totalPrice={totalPrice} setpayPrice={calcPayedPrice} setClick={setClick} />}
                    {(click === 3) &&  <MultiPay eId={employeeId} orderId={orderId} payedPrice={payedPrice} notTotalPrice={setNottotalPrice} employee={employeeId} totalPrice={totalPrice} setpayPrice={calcPayedPrice} setClick={setClick} />}
                    {(click === 4) && <DisCount totalPrice={totalPrice} setpayPrice={calcPayedPrice} setClick={setClick} updateDiscount={updateDiscount} totalDiscount={totalDiscount} />}
                    {(click === 5) && <Event totalPrice={totalPrice} setClick={setClick} updateDiscount={updateDiscount} totalDiscount={totalDiscount} />}
                    {(click === 6) && <Receipt orderId={orderId} totalPrice={totalPrice} setClick={setClick} />}


                </RightDiv>

            </Div>
        </>
    );
};

export default SalePage;
