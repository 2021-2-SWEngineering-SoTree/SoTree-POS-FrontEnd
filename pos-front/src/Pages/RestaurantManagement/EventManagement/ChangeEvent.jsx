import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';

const PageWrapper = styled.div`
    margin : 2rem;
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 2rem;
    }
    justify-content : center;
    margin-bottom : 0.2rem;
    display : flex;
    flex-direction : column;
`;

const InWrapperDiv = styled.div`
    justify-content : center;
    margin-bottom : 0.2rem;
    display : flex;
    margin-top:0.5rem;
`;

const InputLable = styled.label`
    margin-top : 1.5rem;
    font-size : 1.5rem;
    margin-right : 1.5rem;
`;

const Input = styled.input`
    height : 3rem;
    width : 23rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
`;

const SmallInput = styled.input`
    height : 3rem;
    width : 10rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
    & + & {
        margin-left : 1rem;
    }
`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
    //overflow-y:scroll; 식재료 많아지면 스크롤바
    height : 23rem;
`;

const CheckButton = styled.button`
    width : 5rem;
    height : 2.7rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 0.5rem;
    margin-right : 0.3rem; 
    border-radius : 0.5rem;
    padding : 0;
    & + & {
        margin-left : 1rem;
    }
`;

const Title = styled.h1`
    text-align:center;
    margin-top:-2rem;
`

const RowDiv = styled.div`
    display : flex;
    flexDirection : row;
`;

const ChangeEvent = ({event, index}) =>{
    const [name, setName]=useState('');
    const [price, setPrice] = useState('');
    const [percent,setPercent]=useState('');
    const [selection, setSelection] = useState(true);
    const [criticalPoint, setCriticalPoint] = useState('');
    
    const checkNull = () =>{
        
    }

    //이름 입력
    const onChangeName = (e)=>{
        setName(e.target.value);
    }

    //가격 입력
    const onChangePrice = (e)=>{
        setPrice(+e.target.value);
    }

    //퍼센트 입력
    const onChangePercent = (e)=>{
        setPercent(e.target.value);
    }
   
    const success = (e)=>{
        alert('이벤트가 수정되었습니다');
        window.location.replace("/restaurantManagement/event")
    }

    const fail = () =>{
        alert('이벤트를 수정할 수 없습니다');
    }

    const nullCheck = ()=>{
        if(!name ||  (!percent&&!price)) return false;
        return true;
    }

    const updateEvent = (e) =>{

        e.preventDefault();
        var input;
        let managerId = window.localStorage.getItem('managerId');
        const data = JSON.stringify({
            managerId : managerId,
            eventName : name,
            eventDiscountRate : percent,
            criticalPoint : criticalPoint,
            id : event[index].id,
        });
        const data2 = JSON.stringify({
            managerId : managerId,
            eventName : name,
            eventDiscountValue : +price,
            criticalPoint : criticalPoint,
            id : event[index].id,
        });
        input = selection ? data : data2; 
        console.log(input);
        !nullCheck() ? fail() : axios.put('http://localhost:8080/event/updateEvent', input, {
            headers : {
            'Content-Type' : 'application/json',
        }}).then((res)=>{
            console.log(res);
            success();
        }).catch(e=>console.log(e));
    };



    useEffect(()=>{
        if(index>='0'){
            event[index].eventDiscountValue === null ? setPercent(event[index].eventDiscountRate) : setPrice(event[index].eventDiscountValue);
            console.log("event check", event);
            setName(event[index].eventName);
            event[index].eventDiscountValue === null ? setSelection(true) : setSelection(false);
            setCriticalPoint(event[index].criticalPoint)
        }
        
    },[index])

    return (
        <>
        <PageWrapper>
                <Title>이벤트 수정</Title>
                <Form>
                    <WrapperDiv>
                        <InputLable>이벤트 명</InputLable>
                        <Input placeholder = {"이벤트 명"} style={{flexGrow:3}} onChange={onChangeName} value={name}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable style={{marginTop:'-2vh', marginBottom:'1vh'}}>할인 정책선택</InputLable>
                        <div style={{display : 'flex', flexDirection:'row', }}>
                            <input type='radio' name="eventType" id="percent" onClick={()=>setSelection(true)} checked={selection === true} style={{marginTop:'0.6vh'}}/>
                                <label htmlFor="percent">비율할인</label>
                            <input type="radio"  name="eventType" id="fixed" onClick={()=>setSelection(false)} checked={selection === false} style={{marginTop:'0.6vh'}}/>
                                <label htmlFor="fixed">고정금액할인</label>
                        </div>
                        {selection ? 
                            <>
                                <RowDiv>
                                    <InputLable>할인 비율 %&nbsp;&nbsp;&nbsp;&nbsp;</InputLable>
                                    <SmallInput placeholder = {"0~1사이값으로 표현"} onChange={onChangePercent} value={percent} type='text' />
                                </RowDiv>
                            </>
                            :
                            <>
                                <RowDiv>
                                    <InputLable>고정 할인액&nbsp;&nbsp;&nbsp;&nbsp;</InputLable>
                                    <SmallInput placeholder = {"가격(원)"} onChange={onChangePrice} value={price} type='text'/>
                                </RowDiv>
                            </>
                        }
                        <RowDiv>
                            <InputLable>최소 충족 금액</InputLable>
                            <SmallInput placeholder = {"원"} onChange={(e)=>setCriticalPoint(e.target.value)} value={criticalPoint}/>
                        </RowDiv>
                    </WrapperDiv>

                    <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em', marginBottom : '1em', marginTop :'2vh'}}>
                        <CheckButton onClick = {updateEvent}>수정</CheckButton>
                        <CheckButton>닫기</CheckButton>
                    </div>
                </Form>
            </PageWrapper>

        </>
    )
};

export default ChangeEvent;
