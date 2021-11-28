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
    width : 80%;
    height : 80%;
    margin : 0 auto;
`

const TopContent = styled.div`
    height : 55%;
    width : 100%;
    align-items : center;
    justify-content : center;    
`;

const BottomContent = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    margin-top : 3vh;
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
const TextDiv = styled.h2`
    width : 100%;
`;

const CreateRowData = (number, list) => {
    return [number, list];
}

const Event = ({updateDiscount, totalPrice, setClick,totalDiscount}) => {

    const [events, setEvents] = useState([]);
    const [discountPrice, setDiscountPrice] = useState(totalPrice);
    const [eventId, setEventId] = useState(-1);
    const [selectIndex, setSelectIndex] = useState('');
    const columnName = ['번호', '이벤트 이름', '할인가격','최소 충족 금액'];

    const [totalprice,setTotalprice]=useState(totalPrice);

    const discountHandler = () =>{
        if(totalDiscount!==0){
            alert("먼저 적용된 할인을 취소해주세요");
        }else{
            if(selectIndex===''){
                alert("적용할 할인을 선택해주세요");
            }else{
                if(events[selectIndex].criticalPoint > totalPrice+totalDiscount){
                    alert("최소 충족 금액을 만족해야합니다!")
                }else{
                    let prviousPrice = totalPrice;
                    let discount_price = events[selectIndex].eventDiscountRate !== null ? Math.floor(totalPrice * (1-events[selectIndex].eventDiscountRate)) : totalPrice - events[selectIndex].eventDiscountValue;
                    let message = events[selectIndex].eventDiscountRate !== null ? '%할인적용' : '고정할인적용';
                    if(discount_price < 0){
                        alert("할인금액은 총 금액을 초과할 수 없습니다.");
                    }else{
                        updateDiscount(discount_price, prviousPrice-discount_price, message);
                        setSelectIndex('');
                        setClick(0);
                    }
                }
            }
        }  
    }

    const discountRollBackHandler = () =>{
        if(totalDiscount===0){
            updateDiscount(totalPrice,0,'');
        }else{
            updateDiscount(totalPrice+totalDiscount,0,'');
        }
    }

    const eventCancel=()=>{
        // 이벤트 아이디로 선택된 value 값 취소 시키는 초기화 시키는 과정.
        discountRollBackHandler();
        setSelectIndex('');
        
    }

    const eventApply=()=>{
        // 이벤트 아이디로 선택된 이벤트 값 가져오기.
        // EventTable 에서 eventId 변경되서 가져옴.
        if(selectIndex>='0'){
            discountHandler();
        }else{
            alert("적용할 이벤트를 선택하세요!");
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        let managerId = window.localStorage.getItem('managerId');
        await axios.post(`http://localhost:8080/event/getAllEvent/${managerId}`,{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            setEvents(res.data);
            console.log("가져온 Event 값 :",res.data);
        }).catch(e=>{
            console.log(e);
        })
    },[])

    const [display,setDisplay]=useState(0);

    const indexHandler = (index) =>{
        setSelectIndex(index);
        console.log("index Check", index);
    }

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
                            <div>
                                <EventTable columnName={columnName} cells={events} setEventId={setEventId} eventApply={eventApply} selectIndex={indexHandler} />
                            </div>
                        </TopContent>
                        <BottomContent>
                            <BottomRightBtn onClick={eventApply}>이벤트 적용</BottomRightBtn>
                            <BottomRightBtn onClick={eventCancel}>이벤트 적용 취소</BottomRightBtn>
                        </BottomContent>
                    </Content>
                </Center>
            </Templet>}
        </>
    )
};

export default Event;