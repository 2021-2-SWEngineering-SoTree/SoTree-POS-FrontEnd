import { Navigate, useLocation, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import Header from "../../Components/Header";
import styled from 'styled-components';
import Calculator from "../../Components/Calculator/Calculator";
import CircledRectButton from "../../Components/Button/CircledRectButton";
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import InfoSpace from "../../Components/InfoSpace";
import { BsFillCreditCard2BackFill,  } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineInput } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import SmallTable from "../../Components/Table/SmallTable";
import {CardPay, MultiPay, CashPay} from './Pay';
import SaleDefaultMenuPage from "./RightDivComponents/SaleDefaultMenuPage";

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
    background-color: ${props => props.checked ? '#E4E6E7': '#F2F8F9'};
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
    height : 12%;
`

const SalePage = () => {
    
    let params = useLocation();
    const [index, setIndex]=useState(-1);
    const [menus, setMenus] = useState([]); //axios를 통해 메뉴가져옴.
    const [categoryMenus,setCategoryMenus] = useState([]); //전체 메뉴중 선택된 카테고리의 메뉴. 카테고리 바뀔때마다 불러옴.
    const [category, setCategory] = useState(''); //선택된 카테고리

    const [newOrders, setNewOrders] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [seatNum, setSeatNum] = useState(params.state[0].seatNum)
    
    const [click,setClick]=useState(0);


    // {name : '왕돈까스',
    // price : 12000,
    // quantity : 1,
    // discount : 0,
    // totalprice : 12000,
    // message : '',},
    // {name : '치즈돈까스',
    // price : 12000,
    // quantity : 1,
    // discount : 0,
    // totalprice : 12000,
    // message : '',}

    // 오더 states
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setToltalPrce] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0)

    const [calculNum, setCalculNum] = useState(0);
    const [orderSelection, setOrderSelection] = useState(-1);


    // 결제 states

    const [payedPrice, setPayedPrice] = useState(0);


    // 결제내역/ 담당자 정보 구분
    const [leftBot,setLeftBot]=useState(true);

    let navigation = useNavigate();

    const getMenus = async ()=>{
        let managerId = localStorage.getItem('managerId')
        await axios.post('http://localhost:8080/menu/getAll',managerId,{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            setMenus(()=>res.data);
            console.log('menu', menus);
        }).catch(e=>{
            console.log(e);
        })
    };

    const getCategoryMenus = (category) =>{
        console.log(menus);
        setCategoryMenus(menus.filter((menu)=>(menu.menuCategory===category)));
    };
    
    const getIndex=(index)=>{
        setIndex(index);
        console.log(typeof categoryMenus[index]);
        if(categoryMenus[index])
            updateNewOrders(categoryMenus[index]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        console.log('get menu useeffect');
        await getMenus();
        console.log(menus);
        setCategory('세트메뉴')
        document.getElementById('세트메뉴').focus();
    },[]);

    useEffect(()=>{
        console.log('change categoryMenus useeffect');
        getCategoryMenus(category);
        //makeCategoryMenusFull();
        console.log(categoryMenus);
    },[category]);


    const onClickCategoryButton = (e) =>{
        console.log(e.target.name);
        setCategory(e.target.name);
        getCategoryMenus(e.target.name);
    }

    const updateNewOrders = (selected) => {
        const index = newOrders.findIndex((key)=> key.name === selected.menuName);
        // console.log("new", newOrders)
        // console.log("find", index);
        // console.log("current", currentOrders)

        if(index>=0){
            let temp = newOrders.filter(arr => arr.name !== selected.menuName);
            const data = {
                name : selected.menuName,
                price : selected.price,
                quantity : newOrders[index].quantity+1,
                discount : newOrders[index].discount,
                totalprice : newOrders[index].totalprice+selected.price,
                message : newOrders[index].message,
            }
            setNewOrders([...temp.slice(0,index), data, ...temp.slice(index, temp.length)]);
        }else{
            setNewOrders((prev)=>[...prev, {
                name : selected.menuName,
                price : selected.price,
                quantity : 1,
                discount : 0,
                totalprice : selected.price,
                message : '',  
            }])
        }

        const index2 = currentOrders.findIndex((key)=> key.name === selected.menuName);
        if(index2>=0){
            let temp = currentOrders.filter(arr => arr.name !== selected.menuName);
            console.log(temp);
            console.log("current order ", currentOrders[index2])
            let data = {
                name : selected.menuName,
                price : selected.price,
                quantity : currentOrders[index2].quantity + 1,
                discount : currentOrders[index2].discount,
                totalprice : currentOrders[index2].totalprice + selected.price,
                message : currentOrders[index2].message,
            }
            setCurrentOrders([...temp.slice(0,index2), data, ...temp.slice(index2, temp.length)]);
        }else{
            setCurrentOrders((prev)=>[...prev, {
                name : selected.menuName,
                price : selected.price,
                quantity : 1,
                discount : 0,
                totalprice : selected.price,
                message : '',  
            }])
        }
        setToltalPrce((prev)=> prev + selected.price);
        setTotalAmount((prev)=> prev + 1);
        setTotalDiscount((prev) => prev + 0);
    };

    useEffect(()=>{
        console.log("change check")
    },[newOrders,currentOrders])
//
    const orderInfoClickHandler = (index, e) =>{
        e.preventDefault();
        console.log(index);
        document.getElementById("order"+String(index)).focus();
        setOrderSelection(index);
    }

    const allCancleHandler = (e)=>{
        e.preventDefault();
        setNewOrders([]);
        setCurrentOrders([]);
    }

    const selectCancleHander = (e) =>{
        e.preventDefault();
        if(orderSelection >= 0){
            const temp = newOrders.filter((arr,index) => index!==orderSelection);
            const temp2 = currentOrders.filter((arr,index) => index!==orderSelection);
            setNewOrders(temp);
            setCurrentOrders(temp2);
            setOrderSelection(-1);
        }
    }

    const minus = (a,b) => a-b;

    const makeOrderHandler = (e) =>{
        e.preventDefault();
        makeOrder();
    }

    const makeOrder = () =>{
        let managerId = window.localStorage.getItem('managerId');
        const orderDetails = makeOrdetailMap();
        const data = {
            totalPrice : totalPrice,
            startTime : new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
            orderType : "TABLE_ORDER",
            seatNumber : seatNum,
            isSeated : "True",
            managerId: managerId,
            employeeId : 1,
            orderDetails : orderDetails,
        };
        console.log(data);
        axios.post('http://localhost:8080/order/addTableOrder', JSON.stringify(data), {
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            console.log(res);
            navigation('/CurrentSeatInfo');
        }).catch(e=>console.log(e));
    }

    const makeOrdetailMap = () =>{
        let orderdetails = [];
        newOrders.forEach(function(item, index){
            let temp = {};
            temp[item.name] = item.quantity;
            console.log("temp", temp)
            orderdetails.push(temp);
        })
        console.log("오더디테일 만들기", orderdetails)
        return orderdetails;
    };

    const plusButtonHandler = (index, e) =>{
        e.preventDefault();
        if(currentOrders.length>index && index >=0) {changeSelectionOrderQuantity(index, 1);}        
    }

    const minusButtonHandler = (index, e) =>{
        e.preventDefault();
        if(currentOrders.length>index && index >=0) {changeSelectionOrderQuantity(index, -1);}
    }

    const changeSelectionOrderQuantity = (i, count) =>{
        const index = newOrders.findIndex((key)=> key.name === currentOrders[i].name);
        if(index>=0){
            let temp = newOrders.filter(arr => arr.name !== currentOrders[i].name);
            const data = {
                name : currentOrders[i].name,
                price : currentOrders[i].price,
                quantity : newOrders[index].quantity + count,
                discount : newOrders[index].discount,
                totalprice : count * currentOrders[i].price + newOrders[index].totalprice,
                message : newOrders[index].message,
            }
            if(data.quantity <= 0 ){
                setNewOrders([...temp]);
            }else{
                setNewOrders([...temp.slice(0,index), data, ...temp.slice(index, temp.length)]);
            }
        }
        const index2 = currentOrders.findIndex((key)=> key.name === currentOrders[i].name);
        if(index2>=0){
            let temp = currentOrders.filter(arr => arr.name !== currentOrders[i].name);
            console.log(temp);
            console.log("current order ", currentOrders[index])
            let data = {
                name : currentOrders[i].name,
                price : currentOrders[i].price,
                quantity : currentOrders[i].quantity + count,
                discount : currentOrders[i].discount,
                totalprice : count * currentOrders[i].price + newOrders[index].totalprice,
                message : currentOrders[i].message,
            }
            if(data.quantity <= 0 ){
                setCurrentOrders([...temp]);
            }else{
                setCurrentOrders([...temp.slice(0,index2), data, ...temp.slice(index2, temp.length)]);
            }        
        }
        setToltalPrce((prev)=> count * currentOrders[i].price + prev);
        setTotalAmount((prev)=> prev + count);
        setTotalDiscount((prev) => prev + 0);
    }

    const downSelectionHandler = (e) =>{
        e.preventDefault();
        let next = orderSelection+1 !== currentOrders.length ? orderSelection+1 : 0;
        setOrderSelection(next);
    }
    
    const upSelectionHandler = (e) =>{
        e.preventDefault();
        let next = orderSelection-1 >= 0 ? orderSelection-1 : currentOrders.length-1;
        setOrderSelection(next);
    }

    const backClickHandler = (e)=>{
        e.preventDefault();
        navigation('/CurrentSeatInfo');
    }

    

    const makeTakeOutOrder = () =>{
        let managerId = window.localStorage.getItem('managerId');
        const orderDetails = makeOrdetailMap();
        const data = {
            totalPrice : totalPrice,
            startTime : new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
            orderType : "TAKEOUT_ORDER",
            takeoutTickNumber : seatNum,
            managerId: managerId,
            employeeId : 1,
            orderDetails : orderDetails,
        };
        console.log(data);
        axios.post('http://localhost:8080/order/addTakeoutOrder', JSON.stringify(data), {
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            console.log(res);
        }).catch(e=>console.log(e));
    }

    const changeDiv = (e)=>{
        e.preventDefault();
        navigation('/sale/cashPay');
    }

    const btnClick = (i)=>{
        console.log(i);
        setClick(i);
    }

    const RightComponent=(props)=>{
        const num = props.number;
        if(num===0){
            return <SaleDefaultMenuPage onClickCategoryButton={onClickCategoryButton} btnClick={btnClick}
            categoryMenus={categoryMenus} getIndex={getIndex} makeOrderHandler={makeOrderHandler} backClickHandler={backClickHandler}
            changeDiv={changeDiv}/>
        }
        else if(num===1) return <CashPay totalPrice={totalPrice} setpayedPrice={setpayedPrice} setClick={setClick}/>
        else if(num===2) return <CardPay totalPrice={totalPrice} setpayedPrice={setpayedPrice} setClick={setClick}/>
        else if(num===3) return <MultiPay totalPrice={totalPrice} setpayedPrice={setpayedPrice} setClick={setClick}/>
    }

    const setpayedPrice = (i)=>{
        setPayedPrice(i);
    }

    return (
        <>
            
            <Header text ={"판매"} restaurantName = {localStorage.getItem('storeName')}/>
            {/* <div style={{textAlign:'center'}}>
                <h2>
                    {parmas.state[0].seatNum}번자리가 선택되었습니다!!!.
                </h2>
                    {console.log(parmas)}
                <div>
                    {parmas.state[0].test}
                </div>
            </div> */}
            <Div>

                <LeftDiv>
                    <LeftTopDiv>
                        <TableContainer component={Paper} margin='10px' style={{height : '90%',overflow: 'hidden',}}>
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
                                    {currentOrders.length>0 && currentOrders.map((cell, index) => (
                                        <OrderRow  id = {"order"+String(index)} onClick={(e)=>{orderInfoClickHandler(index, e)}} checked={index===orderSelection ? true: false}>
                                            <OrderCell component="th" scope="cell">{index+1}</OrderCell>
                                            <OrderCell>{cell.name}</OrderCell>
                                            <OrderCell>{cell.price.toLocaleString()}</OrderCell>
                                            <OrderCell>{cell.quantity}</OrderCell>
                                            <OrderCell>{cell.discount}</OrderCell>
                                            <OrderCell>{cell.totalprice}</OrderCell>
                                            <OrderCell>{cell.message}</OrderCell>
                                            </OrderRow>
                                    ))}
                                </TableBody>
                            </TableStyle>                
                        </TableContainer>
                        <UnderTableDiv>
                            <TableStyle>
                                <TableHead>
                                    <ResultRow>
                                        <th style ={{width:'53%', color:'white'}}>합계</th>
                                        <th style ={{width:'10%', color:'white'}}>{totalAmount}</th>
                                        <th style ={{width:'10%', color:'white'}}>{totalDiscount}</th>
                                        <th style ={{width:'16%', color:'white'}}>{totalPrice}</th>
                                        <th></th>
                                    </ResultRow>
                                </TableHead>
                            </TableStyle>
                        </UnderTableDiv>
                    </LeftTopDiv>

                    <LeftBottomDiv>
                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton name={'전체\n취소'} size={'5rem'} size2={'5rem'} radius={'30px'} onClick={allCancleHandler}/>
                                <CircledRectButton name={'선택\n취소'} size={'5rem'} size2={'5rem'} radius={'30px'} onClick={selectCancleHander}/>
                                <CircledRectButton name={'할인\n적용'} size={'5rem'} size2={'5rem'} radius={'30px'}/>
                                <CircledRectButton name={'수량\n변경'} size={'5rem'} size2={'5rem'} radius={'30px'}/>
                            </LeftBottomTopDiv>
                            <Button onClick={()=>setLeftBot(true)}>결제 내역</Button>
                            <Button onClick={()=>setLeftBot(false)}>담당자 정보</Button>

                            {leftBot && (
                                <>
                                <InfoContent>
                                    <b>Payment Requirement</b>
                                </InfoContent>
                                <InfoSpace name={'총 금 액'} value={totalPrice} color={'white'}/>
                                <InfoSpace name={'할인금액'} value={totalDiscount} color={'white'}/>
                                <InfoSpace name={'받을금액'} value={minus(totalPrice,payedPrice)} color={'yellow'}/>
                                <InfoSpace name={'받은금액'} value={payedPrice} color={'white'}/>
                                <InfoSpace name={'거스름돈'} value={0} color={'yellow'}/> 
                                </>
                            )}

                            {!leftBot && (
                                <>
                                <InfoContent>
                                    <b>Information about the person<br/>in charge</b>
                                </InfoContent>
                                <InfoSpace name={'직원번호'} value={'직원번호'} color={'white'}/>
                                <InfoSpace name={'직 원 명'} value={'직원명'} color={'white'}/>
                                
                                <LeftBottomBottomDiv>
                                    <StaffSelector onChange={''}>
                                        <option value={''}>{''}</option> 
                                        <option value={'홍길동'}>{'홍길동'}</option> 
                                        <option value={'서혜민'}>{'서혜민'}</option> 
                                    </StaffSelector>
                                    <ChangeButton>담당자 변경</ChangeButton>
                                </LeftBottomBottomDiv>
                                </>
                            )}

                        </LeftBottomInDiv>
                            
                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={1} onClick={(e)=>{minusButtonHandler(orderSelection,e)}}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={2} onClick={(e)=>{plusButtonHandler(orderSelection,e)}}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={3} onClick={upSelectionHandler}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={4} onClick={downSelectionHandler}></CircledRectButton>
                            </LeftBottomTopDiv>
                            
                            <LeftBottomTwoDiv>
                                <BottomBottomLeftDiv>
                                    <NumberDiv>{calculNum}&nbsp;</NumberDiv>
                                    <Calculator num={'2.6em'} num2={'5.3em'} quantity={calculNum} changeQuantity={setCalculNum}/>
                                </BottomBottomLeftDiv>
                                <BottomBottomRightDiv>
                                    
                                    <CircledRectButton name={'포장'} size={'6rem'} size2={'4.2rem'}radius={'20px'} onClick={makeTakeOutOrder}/>
                                    <CircledRectButton name={'이벤트'} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                    <CircledRectButton name={''} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                    <CircledRectButton name={''} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                    <CircledRectButton name={'기타'} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                </BottomBottomRightDiv>
                            </LeftBottomTwoDiv>

                        </LeftBottomInDiv>
                    </LeftBottomDiv>
                </LeftDiv>

                <RightDiv>
                    <RightComponent number={click}/>
                    {/* <RightTopDiv>
                        <RightTopTopDiv>
                            <CategoryButton id = '세트메뉴' name={'세트메뉴'} onClick={onClickCategoryButton}>세트메뉴</CategoryButton>
                            <CategoryButton id = '2~3인분메뉴' name={'2~3인분메뉴'} onClick={onClickCategoryButton}>2~3인분메뉴</CategoryButton>
                            <CategoryButton id = '식사메뉴' name={'식사메뉴'} onClick={onClickCategoryButton}>식사메뉴</CategoryButton>
                            <CategoryButton id = '사이드메뉴' name={'사이드메뉴'} onClick={onClickCategoryButton}>사이드메뉴</CategoryButton>
                            <CategoryButton id = '후식메뉴' name={'후식메뉴'} onClick={onClickCategoryButton}>후식메뉴</CategoryButton>
                            <CategoryButton id = '추가메뉴' name={'추가메뉴'} onClick={onClickCategoryButton}>추가메뉴</CategoryButton>
                            <CategoryButton id = '주류/음료' name={'주류/음료'} onClick={onClickCategoryButton}>주류/음료</CategoryButton>
                        </RightTopTopDiv>
                        <RightTopBottomDiv>
                            <SmallTable menu={categoryMenus} getIndex={getIndex} width={'100%'} height={'100%'}/>
                        </RightTopBottomDiv>
                    </RightTopDiv>
                    <RightBottomDiv>
                        <BottomButton onClick={makeOrderHandler}><MdOutlineInput/>주문</BottomButton>
                        <BottomButton><BsFillCreditCard2BackFill/>현금</BottomButton>
                        <BottomButton><GiMoneyStack/>신용카드</BottomButton>
                        <BottomButton>복합결제</BottomButton>
                        <BottomButton onClick={backClickHandler}><IoMdArrowRoundBack/>돌아가기</BottomButton>
                        <BottomButton>영수증관리</BottomButton>
                        <BottomButton>음식완성알림</BottomButton>
                    </RightBottomDiv> */}
                </RightDiv>

            </Div>
        </>
    );
};

export default SalePage;
