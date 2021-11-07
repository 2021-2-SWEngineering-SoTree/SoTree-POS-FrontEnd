import React from 'react'
import styled from 'styled-components'
import PlusMinusButton from '../../../Components/Button/PlusMinusButton';

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
`;

const Input = styled.input`
    height : 3rem;
    width : 25rem;
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
    width : 8rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 1rem;
`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const CheckButton = styled.button`
    width : 6rem;
    height : 3.5rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 2rem;
    margin-right : 1rem; 
    border-radius : 0.5rem;
    padding : 0;
`;

const CategorySelector = styled.select`
    height : 3.2rem;
    width : 26rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
`;

const StockSelector = styled.select`
    height : 3.2rem;
    width : 10rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 2rem;
`;

const Title = styled.h1`
    text-align:center;
`

const AddMenu = () =>{

    const handleClick = (e) =>{
        e.preventDefault();
        console.log("Click test : preventDefault");
    }

    return (
        <>
        <PageWrapper>
                <Title>메뉴 추가</Title>
                <Form>
                    <WrapperDiv>
                        <InputLable>메뉴명</InputLable>
                        <Input placeholder = {"메뉴명"} style={{flexGrow:3}}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>분류</InputLable>
                        <CategorySelector>
                            <option value="세트메뉴" selected>세트메뉴</option>
                            <option value="2-3인분메뉴" selected>2-3인분메뉴</option>
                            <option value="식사메뉴" selected>식사메뉴</option>
                            <option value="사이드메뉴" selected>사이드메뉴</option>
                            <option value="후식메뉴" selected>후식메뉴</option>
                            <option value="추가메뉴" selected>추가메뉴</option>
                            <option value="주류음료" selected>주류/음료</option>
                        </CategorySelector>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>가격</InputLable>
                        <Input placeholder = {"가격"}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>식재료</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <StockSelector>
                            </StockSelector>
                            <SmallInput placeholder = {"수량(인분)"}/>
                            <PlusMinusButton onClick={handleClick} name="+"/>
                            <PlusMinusButton onClick={handleClick} name="-"/>
                        </div>
                    </WrapperDiv>
                    <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
                        <CheckButton onClick = {handleClick}>추가</CheckButton>
                        <CheckButton>닫기</CheckButton>
                    </div>
                </Form>
            </PageWrapper>

        </>
    )
};

export default AddMenu;