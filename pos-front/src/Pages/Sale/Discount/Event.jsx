import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import axios from "axios";
import EventTable from "../../../Components/Table/EventTable";

const Templet = styled.div`
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
    margin-left : 0.5%;
    width : 99%;
    height : 94%;
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
    margin-left : -4%;
    
`;

const BottomContent = styled.div`
    height : auto;
    width : auto;
    padding-top: 2.0rem;
`;

const BottomInContent = styled.div`
    width : 73%;
    height : 60%;
    margin : 0 auto;
    margin-top : 9%;
`

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
const TextDiv = styled.h2`
    width : 100%;
`;

const CreateRowData = (number, list) => {
    return [number, list];
}

const Event = ({orderId, totalPrice, setClick}) => {

    const [discountPrice, setDiscountPrice] = useState(totalPrice);
    const [eventId, setEventId] = useState(-1);
    const columnName = ['번호', '이벤트 목록'];
    const Dummy = [
        CreateRowData(1, '더미 이벤트1'),
        CreateRowData(2, '더미2'),
        CreateRowData(3, '더미 이벤트3'),
        CreateRowData(4, '더미4'),
        CreateRowData(5, '5월 이벤트'),
        CreateRowData(6, '10월 이벤트'),
        CreateRowData(7, '더미 이벤트'),
        CreateRowData(8, '더미 이벤트'),
        CreateRowData(9, '더미 이벤트'),
        CreateRowData(10, '더미 이벤트'),

    ];


    const eventCancel=()=>{
        // 이벤트 아이디로 선택된 value 값 취소 시키는 초기화 시키는 과정.
        setDiscountPrice(0);
    }

    const eventApply=()=>{
        // 이벤트 아이디로 선택된 이벤트 값 가져오기.
        // EventTable 에서 eventId 변경되서 가져옴.
    }

    useEffect(()=>{

    },[]);

    const [display,setDisplay]=useState(0);

    return (
        <>
            {display===0 &&
            <Templet>
                <Header>&nbsp;이벤트
                    <ExitBtn onClick={()=>setClick(0)}>X</ExitBtn>
                </Header>
                <Center>
                    <Content>
                        <TextDiv style={{paddingTop:'5vh'}}>+ 진행중인 이벤트</TextDiv>
                        <TopContent style={{overflow: 'auto'}}>
                            <div >
                                <EventTable columnName={columnName} cells={Dummy} setEventId={setEventId} eventApply={eventApply}/>
                            </div>
                        </TopContent>
                        <BottomContent>
                            <BottomRightBtn onClick={eventCancel}>이벤트 적용<br/> 취소</BottomRightBtn>
                            <BottomRightBtn onClick={eventApply}>이벤트 적용<br/> 확인</BottomRightBtn>
                        </BottomContent>
                    </Content>
                </Center>
            </Templet>}
        </>
    )
};

export default Event;