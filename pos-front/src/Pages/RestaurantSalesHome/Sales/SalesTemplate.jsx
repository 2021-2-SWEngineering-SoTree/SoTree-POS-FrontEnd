import React,{useState, useEffect} from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import DateButton from '../../../Components/Button/DateButton';
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import LChart from './LineChart';
import SaleInfoItem from '../../../Components/Box/SaleInfoItem';
import BChart from './BarChart';
import CircleChart from '../MenuSales/CircleChart';
import axios from 'axios';

const Div = styled.div`
    display : flex;
`;

const LeftDiv = styled.div`
    width : 65%;
`;

const RightDiv = styled.div`
    width : 35%;
`;

const LeftTopDiv=styled.div`
    display : flex;
    margin : 1rem;
`;

const LeftBottomDiv=styled.div`
    height : 35vh;
`;

const RightTopDiv=styled.div`
    height : 40.7vh;
    border : 1px solid black;
    border-radius : 10px;
    margin : 1.5rem;
`;

const RightBottomDiv=styled.div`
    height : 40.7vh;
    border : 1px solid black;
    border-radius : 10px;
    margin : 1.5rem;
`;

const Title=styled.div`
    margin : 1rem;
    font-size : 2rem;
    font-weight : bold;
`;

const LeftTitle=styled.div`
    margin-left : 2rem;
    font-size : 1.5rem;
`;

const Selector = styled.select`
    height : 2.4rem;
    width : 5rem;
    background-color : #F2F0F0;
    font-size : 1rem;
    border-radius : 4px;
    line-height : 2rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-left : 0.5rem;
`;

const LeftBotBotDiv = styled.div`
    border-radius : 10px;
    border : 1px solid black;
    margin: 1%;
    height : 75vh;
`;

const Criteria = styled.div`
    width : 100%;
    height : 4vh;
    margin-top : 1%;
`

const GraphTemp=styled.div`

`
const GraphTop = styled.div`
    width : 100%;
    height : 30vh;
    margin-top: 0.3rem;
`

const GraphBottom = styled.div`
    width : 100%;
    margin-top: 0.3rem;
`

const GraphDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 70%;
    margin-top :1%;
`;

const TextDiv = styled.div`
    height : 2rem;
    font-size : 1rem;
    line-height : 2.5rem;
    margin-right : 0.5rem;
    font-weight : bold;
`;

const TableStyle = styled.table`
    width: 80%;
    margin : 0 auto;
    margin-top : 5%;
`;

const OrderCell = styled.td`
    color: #000000;
    font-size: 20px;
    text-align: center;
`;

const OrderRow = styled.tr`
    background-color: ${props => props.checked ? '#E4E6E7': '#F2F8F9'};
    &:focus {
        background: #FF0000;
    }
`;

const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 20px;
    text-align: center;
`;

const Cell=styled.td`
    font-size: 20px;
    text-align: center;
`

const SaleDiv = styled.div`
    width : 98%;
    display : flex;
    flex-direction : row;
    margin-left : 1%;
`;

const SaleInfoDiv = styled.div`
    width : 100%;
    height : 10vh;
`;

//dateStr='202111' -> 주차 수 return
const getWeekCount =(dateStr)=>{
    var year  = Number(dateStr.substring(0, 4));
    var month = Number(dateStr.substring(4, 6));
     
    var nowDate =new Date(year, month-1, 1);
 
    var lastDate =new Date(year, month, 0).getDate();
    var monthSWeek = nowDate.getDay();
 
    var weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;
 
    return weekSeq;
}

const SalesTemplate = () => {

    const managerId = window.localStorage.getItem('managerId');
    const nowYear=new Date().getFullYear(); //현재 년
    const nowMonth = new Date().getMonth()+1;//현재 월
    const nowDay = new Date().getDate(); //현재 일

    const [select,setSelect]=useState(0); //버튼 5

    //월별통계
    const [year,setYear]=useState();
    const [monthData,setMonthData]=useState([]);
    const [monthCardSum,setMonthCardSum]=useState(0);
    const [monthCashSum,setMonthCashSum]=useState(0);
    const [yearCardSum,setYearCardSum]=useState(0);
    const [yearCashSum,setYearCashSum]=useState(0);

    //주별통계
    const [month,setMonth]=useState(); //주별 
    const [monthWeekData, setMonthWeekData]=useState([]);
    const [weekCardSum,setWeekCardSum]=useState(0);
    const [weekCashSum,setWeekCashSum]=useState(0);

    //일별
    const [dayData,setDayData]=useState([]);
    const [monthDayData,setMonthDayData]=useState([]);
    const [monthKindData,setMonthKindData]=useState([]);
    const [dayYear,setDayYear]=useState();
    const [dayMonth,setDayMonth]=useState();
    const [dayMonthWhole,setDayMonthWhole]=useState();

    const [startDate,setStartDate]=useState(); //직접입력
    const [endDate,setEndDate]=useState();

    //오늘요약
    const [daySum,setDaySum]=useState([]);//오른쪽 아래 그래프
    const [topMenu,setTopMenu]=useState([]);//top5
    const [daySeven,setDaySeven]=useState([]);//일주일 매출 그래프
    const [allSum,setAllSum]=useState([]); //맨 위표
    
    const [circle,setCircle]=useState([]);
    const [bar,setBar]=useState([]);
    const [line,setLine]=useState([]);
    const [lineMax,setLineMax]=useState(0);

    useEffect(()=>{ //원그래프에 들어갈 데이터 처리
        const CircleData=[];
        
        daySum.map((v,i)=>{
            let day='';
            if(v.dateRange==1) day='일요일';
            else if(v.dateRange==2) day='월요일';
            else if(v.dateRange==3) day='화요일';
            else if(v.dateRange==4) day='수요일';
            else if(v.dateRange==5) day='목요일';
            else if(v.dateRange==6) day='금요일';
            else if(v.dateRange==7) day='토요일';
            CircleData.push({
                name:day,
                value:+v.totalSale
            })
            }
        );

        console.log(CircleData);
        setCircle(CircleData);

    },[daySum]);

    //주별 통계
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        setMonthWeekData([]);
        console.log(month);
        if(month!=''){
            let selectedMonth=month;
            if(month<10) selectedMonth='0'+selectedMonth;
            const data={
                branchId : managerId,
                start : nowYear+'-'+selectedMonth+'-01',
                end : nowYear+'-'+selectedMonth+'-32',
            }
            console.log(data);
            await axios.post('http://localhost:8080/payment/getALLSortedBYWEEK',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                console.log(res.data);
                setMonthWeekData(res.data);
            }).catch(e=>{
                console.log(e);
            })
        }
    },[month])

    useEffect(()=>{
        console.log(monthWeekData);
        if(monthWeekData.length==0){
            setLineMax(0);
        }
        else{
            let length = monthWeekData.length;
            console.log(length);
            //배열의 마지막에 위치한게 가장 최근 주 정보.
            setWeekCardSum(monthWeekData[length-1].cardTotalSale);
            setWeekCashSum(monthWeekData[length-1].cashTotalSale);
            setLineMax(-1);
        }
        console.log("바뀜");
        const len = getWeekCount(nowYear+''+month);
        console.log(len);
        const LineData=[];
        for(let i=1;i<=len;i++){
            LineData.push({
                name:i+'주',
                매출:0
            })
        }
        console.log(LineData);

        let weekSum=0;
        for(let i=1;i<month;i++){
            weekSum+=getWeekCount(nowYear+''+('0'+i).slice(-2));
            if(i!=1 &&( new Date(nowYear+'-'+('0'+i).slice(-2)+'-01').getDay()!=0)) weekSum--;
        }
        console.log(weekSum);
        monthWeekData.map((v,i)=>{
            const sales=v.totalSale;
            if(sales>lineMax) setLineMax(sales);
            console.log(v,i);
            LineData[+v.weeks-weekSum+1].매출+=sales;
        });

        console.log(LineData);
        setLine(LineData);

    },[monthWeekData]);

    useEffect(()=>{
        const BarData=[
            {
                name:'일요일', 매출 :0
            },
            {
                name:'월요일', 매출 :0
            },
            {
                name:'화요일', 매출 :0
            },
            {
                name:'수요일', 매출 :0
            },
            {
                name:'목요일', 매출 :0
            },
            {
                name:'금요일', 매출 :0
            },
            {
                name:'토요일', 매출 :0
            },
        ];

        
        let start=daySeven[0];
        let index=-1;
        for(let i=1;i<daySeven.length;i++){
            if(daySeven[i]>start) start=daySeven[i];
            else{
                index=i;
                break;
            }
        }

        daySeven.map((v,i)=>{
            let day;
            let month=new Date().getMonth()+1;
            if(i<index) month--;
            const format = nowYear+'-'+month+'-';
            //new Date('2021-11-24').getDay()
            if((new Date(format+v.date).getDay())==0) day=0;
            else if((new Date(format+v.date).getDay())==1) day=1;
            else if((new Date(format+v.date).getDay())==2) day=2;
            else if((new Date(format+v.date).getDay())==3) day=3;
            else if((new Date(format+v.date).getDay())==4) day=4;
            else if((new Date(format+v.date).getDay())==5) day=5;
            else if((new Date(format+v.date).getDay())==6) day=6;

            BarData[day].매출+=v.totalSale
            }
        );

        console.log(BarData);
        setBar(BarData);

    },[daySeven]);
    
    //월별통계에서 연도 다르게할떄마다 data달라지므로  
    useEffect(()=>{
        console.log("바뀜");
        const LineData=[
            {
                name:'1월', 매출 :0
            },
            {
                name:'2월', 매출 :0
            },
            {
                name:'3월', 매출 :0
            },
            {
                name:'4월', 매출 :0
            },
            {
                name:'5월', 매출 :0
            },
            {
                name:'6월', 매출 :0
            },
            {
                name:'7월', 매출 :0
            },
            {
                name:'8월', 매출 :0
            },
            {
                name:'9월', 매출 :0
            },
            {
                name:'10월', 매출 :0
            },
            {
                name:'11월', 매출 :0
            },
            {
                name:'12월', 매출 :0
            },
        ];
        console.log(monthData);
        if(monthData.length==0){
            setLineMax(0);
        }
        else{
            setLineMax(-1);
        }
        monthData.map((v,i)=>{
            let month;
            month=v.months;
            let sales = v.totalSale;
            if(sales>lineMax) setLineMax(sales);
            if(month==nowMonth && year==nowYear) {
                console.log(v);
                setMonthCardSum(v.cardTotalSale); //이번달 카드매출
                setMonthCashSum(v.cashTotalSale); //이번달 현금매출
            }
            LineData[month-1].매출+=v.totalSale;
        });
        console.log(LineData);
        setLine(LineData);

        //연도 카드, 현금매출
        setYearCardSum(monthData.reduce(
            (accumulator, currentValue) => accumulator + (+currentValue.cardTotalSale)
            ,0
        ));
        setYearCashSum(monthData.reduce(
            (accumulator, currentValue) => accumulator + (+currentValue.cashTotalSale)
            ,0
        ));
    },[monthData]);

    //초기 => 이번 달 매출 => 월별&주별 페이지 사용
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{

        let startData=[];
        const data={
            branchId : managerId,
            start : nowYear+'-01-00',
            end : nowYear+'-12-32'
        }
        console.log(data);
        await axios.post('http://localhost:8080/payment/getALLSortedByMonth',data,{
        headers : {
        "Content-Type" : "application/json",
        }}).then((res)=>{
            startData=res.data;
            console.log(startData);
        }).catch(e=>{
            console.log(e);
        })

        startData.map((v,i)=>{
            let month;
            month=v.months;
            if(month==nowMonth) {
                console.log(v);
                setMonthCardSum(v.cardTotalSale); //이번달 카드매출
                setMonthCashSum(v.cashTotalSale); //이번달 현금매출
            }
        });
    },[])

    // 월별 통계 연도->data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        console.log('year',year);
        
        if(year!=''){
            const data={
                branchId : managerId,
                start : year+'-01-00',
                end : year+'-12-32'
            }
            console.log(data);
            await axios.post('http://localhost:8080/payment/getALLSortedByMonth',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                setMonthData(res.data);
                console.log(res.data);
            }).catch(e=>{
                console.log(e);
            })
        }
    },[year])

    //날짜 변경 시 data 변경. 그래프 한달 요일 누적 매출.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        console.log(dayData);
        const data=[
            {
                name:'일요일', 매출 :0
            },
            {
                name:'월요일', 매출 :0
            },
            {
                name:'화요일', 매출 :0
            },
            {
                name:'수요일', 매출 :0
            },
            {
                name:'목요일', 매출 :0
            },
            {
                name:'금요일', 매출 :0
            },
            {
                name:'토요일', 매출 :0
            },
        ];

        dayData.map((v,i)=>{
            console.log(v.dateRange);
            data[v.dateRange-1].매출+=v.totalSale;
        })
        console.log(data);
        setLine(data);
        
        const circle=data.filter((v)=>v.매출!=0);
        console.log(circle);
        setCircle(circle);
    },[dayData]);

    //월별 전체 일일별 데이터
    useEffect(async()=>{
        

    },[monthDayData]);

    //일일 선택 날짜 변경시, new data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        console.log(dayYear,dayMonth);
        let month=('0'+dayMonth).slice(-2)
        let nextmonth;
        if(month=='12') nextmonth='01';
        else nextmonth=('0'+(+dayMonth+1)).slice(-2)
        const data={
            branchId : managerId,
            start : dayYear+`-${month}-00`,
            end : dayYear+`-${nextmonth}`
        }
        console.log(data);
        await axios.post('http://localhost:8080/payment/getDaySaleInfo',data,{
        headers : {
        "Content-Type" : "application/json",
        }}).then((res)=>{
            console.log(res.data);
            setDayData(res.data.dayOfWeekSaleSummary);
            setMonthDayData(res.data.daySaleSummary);
            setMonthKindData(res.data.orderTypeSummary);
        }).catch(e=>{
           console.log(e);
        })
    },[dayYear,dayMonth]);

    useEffect(()=>{
        console.log("line 바뀜");
        console.log(line);
    },[line]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        console.log(select);
        console.log(allSum);
        //graphData 초기화.
        setCircle([]);
        setBar([]);
        setLine([]);
        setYear('');
        setMonth('');
        setDayYear();
        setDayMonth();
        if(select==2) setMonth(nowMonth);
        if(select==1) setYear(nowYear); //현재 연도로 초기화.
        if(select==3) {
            setDayYear(nowYear);
            setDayMonth(nowMonth);
        }
    },[select]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        if(select===0){
            const data={
                branchId : managerId,
                start : nowYear+'-01-00',
                end : nowYear+'-12-32'
            }
            console.log(data);
            await axios.post('http://localhost:8080/payment/getTodaySummarySale',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                console.log(res.data);
                setDaySum(res.data.DaySummary);
                setTopMenu(res.data.TopFiveMenu);
                setDaySeven(res.data.recentSevenDays);
                setAllSum(res.data.saleSummary);
            }).catch(e=>{
                console.log(e);
            })
        }
    },[select,year,month,startDate,endDate]);

    return (
        <>
        <Header text ={"매상 통계"} restaurantName = {localStorage.getItem('storeName')}/>
        <Div>
            <LeftDiv>
                <LeftTopDiv>
                    <DateButton onClick={()=>setSelect(0)} name={'오늘요약'}/>
                    <DateButton onClick={()=>setSelect(1)} name={'월별'}/>
                    <DateButton onClick={()=>setSelect(2)} name={'주별'}/>
                    <DateButton onClick={()=>setSelect(3)} name={'일별'}/>
                    <DateButton onClick={()=>setSelect(4)} name={'직접입력'}/>
                </LeftTopDiv>
                <LeftBotBotDiv>
                    <Criteria>
                        
                        <div style={{display : 'flex', flexDirection : 'row', justifyContent:'center'}}>
                           
                            {(select===1) && (
                                <>
                                <Selector value={year} onChange={(e)=>{setYear(e.target.value)}} style={{marginTop:'0.2%',width:'5rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                    <option value={nowYear-2}>{nowYear-2}</option>
                                    <option value={nowYear-1}>{nowYear-1}</option>
                                    <option value={nowYear}>{nowYear}</option>
                                </Selector>
                                <TextDiv>년</TextDiv>
                                </>
                            )}
                            {(select===2) && (
                                <>
                                <Selector value={month} onChange={(e)=>setMonth(e.target.value)} style={{marginTop:'0.2%',width:'4rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </Selector>
                                <TextDiv>월</TextDiv>
                                </>
                            )}
                            {(select===3) && (
                                <>
                                <Selector value={dayYear} onChange={(e)=>{setDayYear(e.target.value)}} style={{marginTop:'0.2%',width:'5rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                    <option value={nowYear-2}>{nowYear-2}</option>
                                    <option value={nowYear-1}>{nowYear-1}</option>
                                    <option value={nowYear}>{nowYear}</option>
                                </Selector>
                                <TextDiv>년</TextDiv>
                                
                                <Selector value={dayMonth} onChange={(e)=>{setDayMonth(e.target.value)}} style={{marginTop:'0.2%',width:'4rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                </Selector>
                                <TextDiv>월</TextDiv>
                                </>
                            )}
                            {(select===4) && (
                                <>
                                <br/>
                                <div style={{ display:'flex'}}>
                                <input type="date" value={startDate}/>
                                <TextDiv style={{marginLeft:'0.5rem', marginBottom:'0.5rem'}}> ~ </TextDiv>
                                <input type="date" value={endDate}/>
                                </div>
                                </>
                            )}
                        </div>                
                    </Criteria>

                    <GraphTemp>
                        <GraphTop>
                            {(select===0) && (
                            <>
                            <SaleDiv>
                                <SaleInfoItem price={allSum.todayCardTotalSale+allSum.todayCashTotalSale} colors={"#8DDEE9"} criterion ={"오늘"} count ={allSum.todayCount}/>
                                <SaleInfoItem price={allSum.weekSale} colors={"orange"} criterion ={"주간"} count ={allSum.weekCount}/>
                                <SaleInfoItem price={allSum.monthSale} colors={"blue"} criterion ={"월간"} count ={allSum.monthCount}/>
                                <SaleInfoItem price={allSum.yearSale} colors={"purple"} criterion ={"올해"} count ={allSum.yearCount}/>

                            </SaleDiv>
                           </>
                           )}
                            {(select===1) && (
                            <>
                            <TableContainer margin='10px' style={{marginTop : '-3%', height : '85%',overflow: 'hidden',}}>
                                <TableStyle>
                                    <TableHead style={{height:'5vh'}}>
                                        <OrderRow>
                                            <ColumnCell>월</ColumnCell>
                                            <ColumnCell>1</ColumnCell>
                                            <ColumnCell>2</ColumnCell>
                                            <ColumnCell>3</ColumnCell>
                                            <ColumnCell>4</ColumnCell>
                                            <ColumnCell>5</ColumnCell>
                                            <ColumnCell>6</ColumnCell>
                                            <ColumnCell>7</ColumnCell>
                                            <ColumnCell>8</ColumnCell>
                                            <ColumnCell>9</ColumnCell>
                                            <ColumnCell>10</ColumnCell>
                                            <ColumnCell>11</ColumnCell>
                                            <ColumnCell>12</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody style={{height:'5vh'}}> 
                                        <OrderRow style={{height : '3.8vh'}}>
                                            <ColumnCell style={{width:'6%'}}>매출</ColumnCell>
                                            {line.length>0 && line.map((cell, index) => 
                                                <OrderCell style={{width:'6.5%'}}>{cell.매출}</OrderCell>
                                            )}
                                        </OrderRow>
                    
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                           </>
                           )}
                           {(select===2) && (
                            <>
                            <TableContainer margin='10px' style={{marginTop : '-3%', height : '85%',overflow: 'hidden',}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell style={{width:'10%'}}>주</ColumnCell>
                                            {line.length>0 && line.map((cell, index) => 
                                                <ColumnCell style={{width:'15%'}}>{index+1}</ColumnCell>
                                            )}
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody style={{height:'5vh'}}> 
                                        <OrderRow style={{height : '3.8vh'}}>
                                            <ColumnCell style={{width:'10%'}}>매출</ColumnCell>
                                            {line.length>0 && line.map((cell, index) => 
                                                <OrderCell style={{width:'15%'}}>{cell.매출}</OrderCell>
                                            )}
                                        </OrderRow>
                    
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                           </>
                           )}
                           {(select===3) && (
                            <>
                            <TableContainer margin='10px' style={{marginTop : '-3%', height : '85%',overflow: 'hidden',}}>
                                <TableStyle style={{width:'90%'}}>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell style={{width:'7%'}}>요일</ColumnCell>
                                            <ColumnCell style={{width:'3rem'}}>일</ColumnCell>
                                            <ColumnCell style={{width:'3rem'}}>월</ColumnCell>
                                            <ColumnCell style={{width:'3rem'}}>화</ColumnCell>
                                            <ColumnCell style={{width:'3rem'}}>수</ColumnCell>
                                            <ColumnCell style={{width:'3rem'}}>목</ColumnCell>
                                            <ColumnCell style={{width:'3rem'}}>금</ColumnCell>
                                            <ColumnCell style={{width:'3rem'}}>토</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody style={{height:'5vh'}}> 
                                        <OrderRow style={{height : '3.8vh'}}>
                                            <ColumnCell style={{width:'7%'}}>매출(원)</ColumnCell>
                                            {line.length>0 && line.map((cell, index) =>
                                                <OrderCell style={{width:'12%'}}>{cell.매출}</OrderCell>
                                            )}
                                        </OrderRow>
                    
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                           </>
                           )}
                        </GraphTop>
                        
                        {(select!==4) &&
                            <>
                            <GraphBottom>
                                <GraphDiv>
                                    {select!==0 && <LChart lineData={line} max={lineMax}/>}
                                    {select===0 && <BChart barData={bar}/>}
                                </GraphDiv>
                            </GraphBottom>
                            </>
                        }
                        
                        {select===4 &&
                            <>
                            <RightTopDiv style={{height : '100%', border:'none'}}>
                            <Title>요일별 매출</Title>
                            <TableContainer  margin='10px' style={{height : '50%', overflow: 'hidden', marginTop:'-4%'}}>
                                        <TableStyle>
                                            <TableHead>
                                                <OrderRow>
                                                    <ColumnCell> 기간 총 매출</ColumnCell>
                                                    <Cell>12345</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell> 부가세</ColumnCell>
                                                    <Cell>12345</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell> 기간 순 매출</ColumnCell>
                                                    <Cell>12345</Cell>
                                                </OrderRow>
                                            </TableHead>
                                            <TableBody>

                                            </TableBody>
                                        </TableStyle>                
                            </TableContainer>
                            </RightTopDiv>
                            </>
                        }
                    </GraphTemp>
                </LeftBotBotDiv>
                
            </LeftDiv>
            <RightDiv>
                {select!==4 && (
                <RightTopDiv>
                    {select==3 && (
                    <>
                    <Title>기간 누적매출</Title>
                    <GraphDiv>
                    <CircleChart  value={'매출'} chartData={circle} width={500} height={500} cx={260} cy={240} r={150}/>
                    </GraphDiv>
                    </>
                    )}
                    {select==2 && (
                    <>
                    <Title>이번 주 정보</Title>
                    <TableContainer margin='10px' style={{height : '87%', marginTop:'0%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{weekCardSum+weekCashSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{weekCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{weekCashSum}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                    </TableContainer>
                    </>
                    )}

                    {select==1 &&(
                        <>
                        <Title>이번 달 정보</Title>
                        <TableContainer  margin='10px' style={{height : '87%',marginTop:'0%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{monthCashSum+monthCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{monthCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{monthCashSum}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                 
                        </TableContainer>
                        </>
                    )}
                    {select===0 && (
                    <>
                    <Title>주간 인기메뉴 TOP 5</Title>
                    <TableContainer  margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>메뉴</ColumnCell>
                                            <ColumnCell>판매량</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    {topMenu.length>0 && topMenu.map((cell, index) => (
                                        <OrderRow style={{height : '3.8vh'}}>
                                            <OrderCell component="th" scope="cell">{index+1}</OrderCell>
                                            <OrderCell>{cell.menuName}</OrderCell>
                                            <OrderCell>{cell.quantity}</OrderCell>
                                        </OrderRow>
                                    ))}
                                    </TableBody>
                                </TableStyle>                
                    </TableContainer>
                    </>
                    )}
                </RightTopDiv>
                )}
                {select===4 && (<div style={{height:'11%'}}/>)}
                <RightBottomDiv>
                    {(select==3)&&(
                    <>
                    <Title>요일 누적 매출</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'0%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출</ColumnCell>
                                                <Cell></Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출</ColumnCell>
                                                <Cell></Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출</ColumnCell>
                                                <Cell></Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                        </TableContainer>
                        
                    </>
                    )}
                    {(select==4)&&(
                    <>
                    <Title>요일 누적 매출</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'0%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출</ColumnCell>
                                                <Cell>{monthCashSum+monthCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출</ColumnCell>
                                                <Cell>{monthCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출</ColumnCell>
                                                <Cell>{monthCashSum}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                        </TableContainer>
                    </>
                    )}
                    {select==1 &&(
                        <>
                        <Title>연 매출</Title>
                        <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'0%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출</ColumnCell>
                                                <Cell>{yearCardSum+yearCashSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출</ColumnCell>
                                                <Cell>{yearCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출</ColumnCell>
                                                <Cell>{yearCashSum}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>               
                        </TableContainer>
                        </>
                    )}
                    {select==2 &&(
                        <>
                        <Title>이번 달 매출</Title>
                        <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'0%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출</ColumnCell>
                                                <Cell>{monthCashSum+monthCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출</ColumnCell>
                                                <Cell>{monthCardSum}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출</ColumnCell>
                                                <Cell>{monthCashSum}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                        </TableContainer>
                        </>
                    )}
                    {select==0 && (
                    <>
                    <Title>요일별 매출</Title>
                    <GraphDiv>
                    <CircleChart  value={'value'} chartData={circle} width={800} height={800} cx={400} cy={'50%'} r={150}/>
                    </GraphDiv>
                    </>
                    )}
                </RightBottomDiv>
            </RightDiv>
        </Div>
        </>
    );
};

export default SalesTemplate