import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import axios from "axios";
import EventTable from "../../../Components/Table/EventTable";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {Container} from "@material-ui/core";

// td column style
const ColumnCell = styled.td`
    background-color: white;
    font-size: 20px;
    text-align: center;
`;

// tr style
const ReceiptRow = styled.tr`
    background-color: #FFFFFF;
    height : 4vh;
    &:focus {
        background-color : #FF0000;
    }
`;

// table style
const ReceiptTableStyle = styled.table`
    min-width: 400px;
    width: 100%;
`;

const ReceiptTemplate = styled.div`
    background-color:#474D4E;
    width : 100%;
    height : 100%;
`

const Header = styled.div`
    color : white;
    font-size : 1.5rem;
`;

const ExitBtn = styled.button`
    float : right;
    height : 100%;
    font-size : 1.3rem;
`

const Center = styled.div`
    background-color:#ffffff;
    width : 99%;
    height : 94%;    
    margin-left : 0.5%;
    display : flex;
    align-items : center;
`;

const Content = styled.div`
    width : 70%;
    height : 80%;
    margin : 0 auto;
`

const TopContent = styled.div`
    height : 55%;
    width : 100%;
    border-bottom : 1px solid white;
    align-items : center;
    justify-content : center;
    text-align: center;
`;

const BottomContent = styled.div`
    height : 25%;
    width : 100%;
    padding-top: 2.0rem;
    text-align: center;
`;

const BottomRightBtn = styled.button`
    height : 8vh;
    width : 20vh;
    border-radius : 12px;
    font-size : 1.5rem;
    background : #474D4E;
    color : white;
    margin-left : 3.5rem;
    margin-right : 3.5rem;
`

const ReceiptTextArea = styled.textarea`
    height : 20rem;
    width : 90%;
`;

const TextDiv = styled.h2`
    width : 100%;
`;


const Receipt = ({orderId, setClick}) => {

    const [paymentInfo, setPaymentInfo] = useState([]);
    const [commonInfo, setCommonInfo] = useState({});
    const [pay, setPay] = useState([]);

    const [display,setDisplay]=useState(0);

    useEffect(async ()=>{
        await getReceipt();

    },[]);

    const reIssueClickHandler = () =>{
        /*
        기기와 연돌할 것.
        */
        alert("번호와 함께 영수증이 재출력 되었습니다.");
    }

    const getReceipt = async () => {
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            branchId: managerId,
            orderId: orderId,
        }
        console.log(managerId);
        console.log(orderId);
        try {
            await axios.post('http://localhost:8080/payment/getReceipt', JSON.stringify(data), {
                headers: {
                    "Content-Type": `application/json`,
                }
            }).then(res => {
                console.log("가져온 Receipt 값: ", res.data);
                const result = res.data;
                const storeInfo = {
                    'StoreName': result[0].StoreName,
                    'Manager': result[0].Manager,
                    'PhoneNumber': result[0].StorePhoneNumber,
                    'Employee': result[0].Employee
                };

                const menuInfo = [['메뉴', '수량', '가격']];
                for (let i = 1 ; i < result.length; i++){
                    menuInfo.push([result[i].MenuName, result[i].Quantity, Number(result[i].Price).toLocaleString()]);
                }
                console.log(menuInfo);
                setPay(result[0]);
                setCommonInfo(storeInfo);
                setPaymentInfo(menuInfo);
            })
        } catch (e) {
            console.log(e.message);
        }
    }


    const showRow = (cells, ele) => {
        return (
            Array(cells.length).fill(undefined, undefined, undefined).map((obj, j)=>
                <ColumnCell key={cells+j}>
                    {cells[j]}
                </ColumnCell>)
        )
    }

    const minus = (a, b) =>{
        return +a - +b;
    }

    return (
        <>
            {display===0 &&
            <ReceiptTemplate>
                <Header>&nbsp;번호표/영수증 관리
                    <ExitBtn onClick={()=>setClick(0)}>X</ExitBtn>
                </Header>
                <Center>
                    <Content>
                        <TextDiv style={{paddingTop:'5vh'}}>+ 영수증 미리보기</TextDiv>
                        <TopContent style={{overflow: 'auto'}}>
                            <div >
                                <TableContainer component={Paper} margin='10px'>
                                    <ReceiptTableStyle>
                                        <TableHead>
                                            <ReceiptRow>
                                                <ColumnCell/><ColumnCell style={{fontSize: '25px', fontWeight:'bold'}}>가게 정보</ColumnCell><ColumnCell/>
                                            </ReceiptRow>
                                        </TableHead>
                                            <ReceiptRow >
                                                <ColumnCell>가게이름: </ColumnCell>
                                                <ColumnCell>{commonInfo && commonInfo['StoreName']}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>가게대표: </ColumnCell>
                                                <ColumnCell>{commonInfo && commonInfo['Manager']}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>전화번호: </ColumnCell>
                                                <ColumnCell>{commonInfo && commonInfo['PhoneNumber']}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>담당직원: </ColumnCell>
                                                <ColumnCell>{commonInfo && commonInfo['Employee'] !== 'null' ? commonInfo['Employee'] : window.localStorage.getItem('userName')}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>결제시간: </ColumnCell>
                                                <ColumnCell>{pay && pay.PayTime ? pay.PayTime : ' '}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>결제방법: </ColumnCell>
                                                <ColumnCell>{pay && pay.PayMethod ? pay.PayMethod : ' '}</ColumnCell>
                                            </ReceiptRow>
                                        <TableHead>
                                            <ReceiptRow>
                                                <ColumnCell/><ColumnCell style={{fontSize: '25px', fontWeight:'bold', textAlign:'left'}}>주문 내역</ColumnCell><ColumnCell/>
                                            </ReceiptRow>
                                        </TableHead>
                                        <TableBody >
                                            {Array(paymentInfo.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                                <ReceiptRow key={i}>
                                                    {showRow(paymentInfo[i], i)}
                                                </ReceiptRow>)}
                                            <ReceiptRow>
                                                {Array(3).fill(undefined, undefined, undefined).map((td, i)=>
                                                <ColumnCell><hr style={{color:'#999999', borderStyle: 'dotted'}}/></ColumnCell>)}
                                            </ReceiptRow>
                                            <ReceiptRow >
                                                <ColumnCell>공급가액 </ColumnCell>
                                                <ColumnCell> </ColumnCell>
                                                <ColumnCell>{pay && Number((+pay.OrderPrice)*0.9).toLocaleString()}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow >
                                                <ColumnCell>부가세 </ColumnCell>
                                                <ColumnCell> </ColumnCell>
                                                <ColumnCell>{pay && ((+pay.OrderPrice)*0.1).toLocaleString()}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                {Array(3).fill(undefined, undefined, undefined).map((td, i)=>
                                                <ColumnCell><hr style={{color:'#999999', borderStyle: 'dotted'}}/></ColumnCell>)}
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>합계: </ColumnCell>
                                                <ColumnCell> </ColumnCell>
                                                <ColumnCell>{pay !==undefined &&  Number(+pay.OrderPrice).toLocaleString()}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>할인가: </ColumnCell>
                                                <ColumnCell> </ColumnCell>
                                                <ColumnCell>{pay && Number((parseInt(pay.OrderPrice)-parseInt(pay.FinalPrice))).toLocaleString()}</ColumnCell>
                                            </ReceiptRow>
                                            <ReceiptRow>
                                                <ColumnCell>결제금액: </ColumnCell>
                                                <ColumnCell> </ColumnCell>
                                                <ColumnCell>{pay && Number(+pay.FinalPrice).toLocaleString()}</ColumnCell>
                                            </ReceiptRow>
                                        </TableBody>
                                    </ReceiptTableStyle>
                                </TableContainer>
                            </div>
                        </TopContent>
                        <BottomContent>
                            <BottomRightBtn onClick={reIssueClickHandler}>영수증<br/>재발행</BottomRightBtn>
                        </BottomContent>
                    </Content>
                </Center>
            </ReceiptTemplate>}
        </>
    )
};

export default Receipt;