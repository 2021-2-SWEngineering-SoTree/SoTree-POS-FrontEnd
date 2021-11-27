import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import axios from "axios";
import EventTable from "../../../Components/Table/EventTable";

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
    width : 60%;
    height : 80%;
    margin : 0 auto;
`

const TopContent = styled.div`
    height : 55%;
    width : 100%;
    border-bottom : 1px solid black;
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

    const reIssueClickHandler = () =>{
        /*
        기기와 연돌할 것.
        */
        alert("번호와 함께 영수증이 재출력 되었습니다.");
    }

    useEffect(async ()=>{
        try {
            getReceipt().then(res =>{
                console.log(res);
            })
        } catch (e) {
            console.log(e.message);
        }
    },[]);

    const getReceipt = async () => {
            let managerId = window.localStorage.getItem('managerId');
            console.log("managerId", managerId);
            console.log("orderId", orderId);
            const data = {
                branchId: managerId,
                orderId: orderId,
            }
            // 데이터를 받아오는 동안 시간 소모. await 대기
            await axios.post('http://localhost:8080/order/getTakeOutTicketInfo',  JSON.stringify(data), {
                headers : {
                    "Content-Type" : `application/json`,
                }
            })
    }

    const [display,setDisplay]=useState(0);

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
                                <ReceiptTextArea value={"dummy"}/>
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