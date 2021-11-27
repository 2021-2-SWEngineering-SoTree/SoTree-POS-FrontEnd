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
    font-size : 1.5rem;
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

const AddEvent = () =>{
    const [name, setName]=useState('');
    const [price, setPrice] = useState('');
    const [percent,setPercent]=useState('');
    
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
        setPrice(+e.target.value);
    }
   
    const success = (e)=>{
        alert('이벤트가 생성되었습니다');
        window.location.replace("/restaurantManagement/event")
    }

    const fail = () =>{
        alert('이벤트를 생성할 수 없습니다');
    }

    const nullCheck = ()=>{
        if(!name ||  (!percent&&!price)) return false;
        return true;
    }

    const addEvent = (e) =>{

        e.preventDefault();
        // let managerId = window.localStorage.getItem('managerId');
        // const data = JSON.stringify({
        //     menuName : name,
        //     price : price,
        //     percent : percent
        // });
        // console.log(data);
        // !nullCheck() ? fail() : axios.post('http://localhost:8080/menu/add', data, {
        //     headers : {
        //     'Content-Type' : 'application/json',
        // }}).then((res)=>{
        //     console.log(res);
        //     success();
        // }).catch(e=>console.log(e));
    };

    return (
        <>
        <PageWrapper>
                <Title>이벤트 생성</Title>
                <Form>
                    <WrapperDiv>
                        <InputLable>이벤트 명</InputLable>
                        <Input placeholder = {"이벤트 명"} style={{flexGrow:3}} onChange={onChangeName} value={name}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>할인 가격<span style={{marginLeft:'1rem', color:'red', fontSize:'1rem'}}>퍼센트나 가격 중 하나만 입력해주세요</span></InputLable>
                        <InWrapperDiv>
                        <SmallInput placeholder = {"퍼센트(%)"} onChange={onChangePrice} value={price}/>
                        <SmallInput placeholder = {"가격(원)"} onChange={onChangePrice} value={percent}/>
                        </InWrapperDiv>
                    </WrapperDiv>

                    <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em', marginBottom : '1em', marginTop :'3rem'}}>
                        <CheckButton onClick = {addEvent}>생성</CheckButton>
                        <CheckButton>닫기</CheckButton>
                    </div>
                </Form>
            </PageWrapper>

        </>
    )
};

export default AddEvent;
