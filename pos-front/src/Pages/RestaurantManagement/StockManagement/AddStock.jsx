import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Calculator from "../../../Components/Calculator/Calculator"
import axios from 'axios';

const PageWrapper = styled.div`
  margin : 2rem;
`;

const WrapperDiv = styled.div`
  & + & {
    margin-top : 1rem;
  }
  justify-content : center;
  margin-bottom : 1rem;
  display : flex;
  flex-direction : column;
`;

const InputLable = styled.label`
  font-size : 1.5rem;
  float: left;
`;

const Input = styled.input`
  height : 3rem;
  width : 13rem;
  background-color : #F2F0F0;
  font-size : 1.5rem;
  border-radius : 10px;
  line-height : 2.5rem;
  padding-left : 0.5rem;
  padding-right : 0.5rem;
  margin-top : 0.7rem;
  margin-right : 0.5rem;
  margin-left : 1.0rem;
`;

const Form = styled.form`
  display : flex;
  justify-content : center;
  flex-direction : column;
`;

const CheckButton = styled.button`
  width : 4rem;
  height : 3.5rem;
  font-size : 1.2rem;
  background-color : #C4C4C4;
  margin-top : 2rem;
  margin-right : 1rem;
  border-radius : 0.5rem;
  padding : 0;
`;

const CategorySelector = styled.select`
  height : 3.2rem;
  width : 10rem;
  background-color : #F2F0F0;
  font-size : 1.5rem;
  border-radius : 10px;
  line-height : 2.5rem;
  padding-left : 0.5rem;
  padding-right : 0.5rem;
  margin-top : 0.7rem;
  margin-right : 2.0rem;
  margin-left: 1.0rem;
`;

const Title = styled.h1`
  text-align:center;
`

const AddStock = ({onClickAdd}) => {

    const [quantity , setQuantity] = useState('');
    const [stockName, setStockName] = useState('');

    const [cello, setCells] = useState([]);
    const [select, setSelect] = useState("");

    const handleClick = async (e) =>{
        e.preventDefault();
        if(window.confirm("정말로 추가하시겠습니까?")){
            await addStockHandler();
            alert("추가되었습니다.");
            onClickAdd();
            setQuantity('');
            setStockName('');
        }
        console.log("Click test : preventDefault");
    }

    const changeQuantity = (change) =>{
        setQuantity(change);
    }

    const addStockHandler = async () =>{
        // let managerId = window.localStorage.getItem('')
        const employeeIdInfo = select !== undefined ? select : null;
        console.log("EmployeeID : ", employeeIdInfo);
        const ingredients = [{
            quantityChanged : +quantity,
            employeeId : employeeIdInfo,
        }];
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            stockName : stockName,
            managerId : managerId,
            stockDetailList : ingredients,
        };
        console.log(data.stockDetailList);
        await axios.post('http://localhost:8080/stock/add', JSON.stringify(data), {
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            console.log(res);
            setQuantity('');
            setStockName('');
        }).catch(e=>console.log(e));
    };


    const handleChange = (e) => {
        setSelect(e.target.value);
        console.log(e.target.value);
    }

    useEffect(async () => {
        try {
            const getEmployee = []
            const res = await axios.get('http://localhost:8080/getAllPersonName')
            console.log('가져온 직원 값들', res.data);
            for (let i = 0 ; i < res.data.length; i++) {
                getEmployee.push(res.data[i]);
            }
            setCells(getEmployee);
            console.log(cello);
        } catch (e) {
            console.error(e.message);
        }
    }, []);

    useEffect(()=>{console.log(select)},[select])

    return (
        <>
            <PageWrapper>
                <Title>재고 추가</Title>
                <Form>
                    <WrapperDiv>
                        <InputLable>재고 이름
                            <Input type="text" placeholder = {"재고명"} style={{flexGrow:3}}
                                   onChange={(e)=>{setStockName(e.target.value)}} value={stockName} />
                        </InputLable>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;량
                            <Input type="text" placeholder = {"0"} style={{flexGrow:3}}
                                   onChange={(e)=> {setQuantity(e.target.value)}} value={quantity} />인분
                        </InputLable>
                    </WrapperDiv>
                    <WrapperDiv>
                        <Calculator num={"3.0rem"} num2={"6.0rem"} quantity={quantity} changeQuantity={changeQuantity}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>담당
                            <CategorySelector value={select} onChange={handleChange}>
                                {Array(cello.length).fill(undefined, undefined, undefined).map((index, i) =>
                                    <option key={i} value={cello[i].EmployeeId !== undefined ? cello[i].EmployeeId: cello[i].ManagerId}>{cello[i].personName}</option>)}
                            </CategorySelector>
                            <CheckButton onClick = {handleClick}>추가</CheckButton>
                            <CheckButton>닫기</CheckButton>
                        </InputLable>
                    </WrapperDiv>
                </Form>
            </PageWrapper>
        </>
    );
};

export default AddStock;