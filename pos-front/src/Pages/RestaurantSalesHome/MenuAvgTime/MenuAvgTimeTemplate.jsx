import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../Components/Header';
import styled from "styled-components";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import axios from "axios";

const CategoryButton = styled.button`
    background-color : #474D4E;
    border-radius : 15px;
    color : #FFFFFF;
    height : 4.3rem;
    width : 13.0%;
    margin : 0.1rem;
    text-align : center;
    font-size : 1.1rem;
    cursor : pointer;
    &:focus {
        background: #8DDEE9;
    }
`
const Div = styled.div`
    max-width: 1980px;
    padding: 20px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height: 680px;
`;

const ButtonDiv = styled.div`
    max-width: 1980px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height: 4.3rem;
`;

const LeftSideDiv = styled.div`
    margin: 0 auto;
    padding: 60px;
    width: 45%;
    float: left;
`;

const RightSideDiv = styled.div`
    margin: 0 auto;
    padding: 60px;
    width: 45%;
    float: right;
`;

const LargeTitle = styled.h2`
    font-size: 40px;
`;

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 25px;
    text-align: center;
`;

// td style
const AverageCell = styled.td`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 20px;
    text-align: center;
`;

// tr style
const AverageRow = styled.tr`
    background-color: #FFFFFF;
    height : 4vh;
    &:focus {
        background-color : #FF0000;
    }
`;

const NotExistDataDiv = styled.div`
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 200px;
`;

// table style
const AverageTableStyle = styled.table`
    min-width: 580px;
    width: 100%;
`;

const createLeftRowData = (number, menu, avgTime) => {
    return [number, menu, avgTime];
}


const MenuAvgTimeTemplate = () => {

    const [leftCell, setLeftCell] = useState([]);
    const [rightCell, setRightCell] = useState([]);

    const leftColumnName = ['??????', '??????', '?????? ?????? ??????(???)'];
    const rightColumnName = ['??????', '????????????(L)', '????????????(D)', '???????????? ??????(F)'];

    const [selectedCategory, setSelectedCategory] = useState("??????");

    const getMenuOfCategory = async () => {
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            branchId: managerId,
            category: selectedCategory,
        }
        try {
            // ???????????? ???????????? ?????? ?????? ??????. await ??????
            await axios.post('http://localhost:8080/menu/getMeanTimeByCategory', JSON.stringify(data), {
                headers: {
                    "Content-Type": `application/json`,
                }
            }).then((res) => {
                console.log(res.data);
                let leftCells = [ ];
                let i = 0;
                for(let key in res.data) {
                    i += 1;
                    let menu = "";
                    if(res.data[key] == -1){
                        continue;
                    }else{
                        menu = res.data[key];
                    }
                    leftCells.push(
                        createLeftRowData(i, key, menu)
                    )
                }
                setLeftCell(leftCells);
                console.log(leftCells);
            })
        } catch (e) {
            console.error(e.message);
        }
    }

    const getCustomerAvgTime = async() => {
        let managerId = window.localStorage.getItem('managerId');
        try {
            // ???????????? ???????????? ?????? ?????? ??????. await ??????
            await axios.post('http://localhost:8080/payment/getCustomerAvgTime', managerId, {
                headers: {
                    "Content-Type": `application/json`,
                }
            }).then((res) => {
                console.log(res.data);
                const data = res.data;
                let rightCells = [
                    ['??????', data['allDay'][0] !== undefined ? data['allDay'][0].lunchAvg.toFixed(2) :0, data['allDay'][0] !== undefined ? data['allDay'][0].dinnerAvg.toFixed(2):0, -data['allDay'][0] !== undefined ? data['allDay'][0].totalAvg.toFixed(2) :0],
                    ['??????', data['weekday'][0] !== undefined ? data['weekday'][0].lunchAvgWeekday.toFixed(2) :0, data['weekday'][0] !== undefined ?  data['weekday'][0].dinnerAvgWeekday.toFixed(2) :0, data['weekday'][0] !== undefined ? data['weekday'][0].totalAvgWeekday.toFixed(2) :0],
                    ['??????', data['weekend'][0] !== undefined  ? data['weekend'][0].lunchAvgWeekend.toFixed(2) :0, data['weekend'][0] !== undefined ? data['weekend'][0].dinnerAvgWeekend.toFixed(2) :0, data['weekend'][0] !== undefined ?  data['weekend'][0].totalAvgWeekend.toFixed(2) :0],
                    ['?????????', data['dayLunch'][6] !== undefined ?   data['dayLunch'][6].timestampdiff.toFixed(2):0, data['dayDinner'][6] !== undefined ?  data['dayDinner'][6].timestampdiff.toFixed(2):0,   data['dayAllTime'][6] !== undefined ? data['dayAllTime'][6].timestampdiff.toFixed(2) :0],
                    ['?????????', data['dayLunch'][1] !== undefined ?   data['dayLunch'][1].timestampdiff.toFixed(2):0, data['dayDinner'][1] !== undefined ?  data['dayDinner'][1].timestampdiff.toFixed(2):0,   data['dayAllTime'][1] !== undefined ? data['dayAllTime'][1].timestampdiff.toFixed(2) :0],
                    ['?????????', data['dayLunch'][0] !== undefined ?   data['dayLunch'][0].timestampdiff.toFixed(2):0, data['dayDinner'][0] !== undefined ?  data['dayDinner'][0].timestampdiff.toFixed(2):0,   data['dayAllTime'][0] !== undefined ? data['dayAllTime'][0].timestampdiff.toFixed(2) :0],
                    ['?????????', data['dayLunch'][2] !== undefined ?   data['dayLunch'][2].timestampdiff.toFixed(2):0, data['dayDinner'][2] !== undefined ?  data['dayDinner'][2].timestampdiff.toFixed(2):0,   data['dayAllTime'][2] !== undefined ? data['dayAllTime'][2].timestampdiff.toFixed(2) :0],
                    ['?????????', data['dayLunch'][3] !== undefined ?   data['dayLunch'][3].timestampdiff.toFixed(2):0, data['dayDinner'][3] !== undefined ?  data['dayDinner'][3].timestampdiff.toFixed(2):0,   data['dayAllTime'][3] !== undefined ? data['dayAllTime'][3].timestampdiff.toFixed(2) :0],
                    ['?????????', data['dayLunch'][4] !== undefined ?   data['dayLunch'][4].timestampdiff.toFixed(2):0, data['dayDinner'][4] !== undefined ?  data['dayDinner'][4].timestampdiff.toFixed(2):0,   data['dayAllTime'][4] !== undefined ? data['dayAllTime'][4].timestampdiff.toFixed(2) :0],
                    ['?????????', data['dayLunch'][5] !== undefined ?   data['dayLunch'][5].timestampdiff.toFixed(2):0, data['dayDinner'][5] !== undefined ?  data['dayDinner'][5].timestampdiff.toFixed(2):0,   data['dayAllTime'][5] !== undefined ? data['dayAllTime'][5].timestampdiff.toFixed(2) :0],
                ];
                console.log(rightCells);
                setRightCell(rightCells);
                setSelectedCategory('????????????');
                document.getElementById('????????????').focus();
            })
        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect( async () => {
        await getCustomerAvgTime();
    }, [])

    useEffect(async ()=>{
        console.log("useEffect ??????");
        await getMenuOfCategory();
    }, [selectedCategory])


    const categoryButtonHandler = (e) => {
        console.log(e.target.name);
        setSelectedCategory(e.target.name);
        document.getElementById(e.target.name).focus();
    }

    const showRow = (cells, ele) => {
        return (
            Array(cells.length).fill(undefined, undefined, undefined).map((obj, j)=>
                <AverageCell key={j}>
                    {cells[j]}
                </AverageCell>
            )
        )
    }

    useEffect(()=>{console.log(rightCell);},[rightCell, leftCell])
    let ref = useRef();
    return (
        <>
            <div>
            <Header text ={"????????? ?????? ?????? ??????"} restaurantName = {localStorage.getItem('storeName')}/>
            </div>
            <Div>
            <LeftSideDiv>
                <LargeTitle>+ ????????? ?????? ?????? ??????</LargeTitle>
                <ButtonDiv>
                    <CategoryButton id = '????????????' name={'????????????'} onClick={categoryButtonHandler} ref={ref}>??????<br/>??????</CategoryButton>
                    <CategoryButton id = '2~3????????????' name={'2~3????????????'} onClick={categoryButtonHandler} ref={ref}>2~3??????<br/>??????</CategoryButton>
                    <CategoryButton id = '????????????' name={'????????????'} onClick={categoryButtonHandler} ref={ref}>??????<br/>??????</CategoryButton>
                    <CategoryButton id = '???????????????' name={'???????????????'} onClick={categoryButtonHandler} ref={ref}>?????????<br/>??????</CategoryButton>
                    <CategoryButton id = '????????????' name={'????????????'} onClick={categoryButtonHandler} ref={ref}>??????<br/>??????</CategoryButton>
                    <CategoryButton id = '????????????' name={'????????????'} onClick={categoryButtonHandler} ref={ref}>??????<br/>??????</CategoryButton>
                    <CategoryButton id = '??????/??????' name={'??????/??????'} onClick={categoryButtonHandler} ref={ref}>??????/<br/>??????</CategoryButton>
                </ButtonDiv>
                {leftCell.length ===0 ? <NotExistDataDiv>????????? ???????????? ????????????.</NotExistDataDiv> :
                <TableContainer component={Paper} style={{marginTop: '30px'}}>
                    <AverageTableStyle>
                        <TableHead>
                            <AverageRow>
                                {Array(leftColumnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                    <ColumnCell key={i}>{leftColumnName[i]}</ColumnCell>)}
                            </AverageRow>
                        </TableHead>
                        <TableBody >
                            {leftCell.map((td, i)=>
                                <AverageRow key={i}>
                                    {showRow(leftCell[i], i)}
                                </AverageRow>)
                            }
                        </TableBody>
                    </AverageTableStyle>
                </TableContainer>}
            </LeftSideDiv>
            <RightSideDiv>
                <LargeTitle>+ ?????? ?????? ?????? ??????</LargeTitle>
                <div style={{float: 'right'}}>??????: ???</div>
                {rightCell.length ===0 ? <NotExistDataDiv>????????? ????????? ???????????? ???????????? ????????????.<br/>?????? ???????????????.</NotExistDataDiv> :
                    <TableContainer component={Paper} style={{marginTop: '30px'}}>
                        <AverageTableStyle>
                            <TableHead>
                                <AverageRow>
                                    {Array(rightColumnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                        <ColumnCell key={i}>{rightColumnName[i]}</ColumnCell>)}
                                </AverageRow>
                            </TableHead>
                            <TableBody >
                                {rightCell.map((td, i)=>
                                    <AverageRow key={i}>
                                        {showRow(rightCell[i], i)}
                                    </AverageRow>)
                                }
                            </TableBody>
                        </AverageTableStyle>
                    </TableContainer>}
            </RightSideDiv>
            </Div>
        </>
    );
};

export default MenuAvgTimeTemplate;