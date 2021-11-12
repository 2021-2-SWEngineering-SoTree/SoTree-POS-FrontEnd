import React from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import Table from '../../../Components/Table/Table'
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";


const PageWrapper = styled.div`
    justify-content : center;
    margin : 5rem;
    display : flex;
`;

const Form = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 1rem;
    }
    justify-content : left;
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
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

const InputLable = styled.label`
    font-size : 1.5rem;
    float: left;
`;

const Div = styled.div`
  max-width: 1980px;

  flex-wrap: nowrap;
  display: flex;
  gap: 1em;
  height: 600px;
  overflow: scroll;
`;

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 30px;
    text-align: center;
`;

// td style
const StockDetailCell = styled.td`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 30px;
    text-align: center;
`;

// tr style
const StockDetailRow = styled.tr`
    background-color: #FFFFFF
`;

// table style
const StockDetailTableStyle = styled.table`
    min-width: 700px;
    width: 100%;
`;

const CreateRowData = (date, name, prevAmount, updateAmount, afterAmount) => {
    return ({date, name, prevAmount, updateAmount, afterAmount });
}

const cells = [
    CreateRowData('2021-10-31 13:00', '이호준', '0',
        '+3', '3'),
    CreateRowData('2021-10-31 14:00', '서혜민', '3',
        '+1', '4'),
    CreateRowData('2021-10-31 15:00', '최지환', '5',
        '-2', '3'),
];

const StockDetail = () => {
    return (
        <>
            <Header text ={"재고 관리"} restaurantName = {"혜민이네 돈까스"}/>
            <PageWrapper>
                <Form>
                    <WrapperDiv>
                        <InputLable>재고 선택
                            <CategorySelector>
                                <option value="돼지고기" selected>돼지고기</option>
                                <option value="치즈" selected>치즈</option>
                                <option value="밀가루" selected>밀가루</option>
                            </CategorySelector>
                        </InputLable>
                    </WrapperDiv>
                    <Div>
                    <WrapperDiv>
                        <TableContainer component={Paper} margin='10px' style={{overflow: 'hidden',}}>
                            <StockDetailTableStyle>
                                <TableHead>
                                    <StockDetailRow>
                                        <ColumnCell>날짜</ColumnCell>
                                        <ColumnCell>담당</ColumnCell>
                                        <ColumnCell>이전 수량</ColumnCell>
                                        <ColumnCell>변경 수량</ColumnCell>
                                        <ColumnCell>변경 후 수량</ColumnCell>
                                    </StockDetailRow>
                                </TableHead>
                                <TableBody>
                                    {cells.map((cell) => (
                                        <StockDetailRow>
                                            <StockDetailCell component="th" scope="cell">{cell.date}</StockDetailCell>
                                            <StockDetailCell>{cell.name}</StockDetailCell>
                                            <StockDetailCell>{cell.prevAmount}</StockDetailCell>
                                            <StockDetailCell>{cell.updateAmount}</StockDetailCell>
                                            <StockDetailCell>{cell.afterAmount}</StockDetailCell>
                                        </StockDetailRow>
                                    ))}
                                </TableBody>
                            </StockDetailTableStyle>
                        </TableContainer>
                    </WrapperDiv>
                    </Div>
                </Form>
            </PageWrapper>
        </>
    );
};

export default StockDetail;