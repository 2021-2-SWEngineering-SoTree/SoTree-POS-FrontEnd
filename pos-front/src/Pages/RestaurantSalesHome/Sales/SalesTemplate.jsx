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
import BChart2 from './DateBarChart ';
import CircleChart from '../MenuSales/CircleChart';
import axios from 'axios';
import SaleTable from '../../../Components/Table/SaleTable';

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
    overflow : auto;
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
    const [monthDayCard,setMonthDayCard]=useState(0);
    const [monthDayCash,setMonthDayCash]=useState(0);

    //직접입력
    const [startDate,setStartDate]=useState(); 
    const [endDate,setEndDate]=useState();
    const [eachData,setEachData]=useState([]); //일별 dateSaleSummary
    const [timeData,setTimeData]=useState([]); //시간별 hourSummary
    const [allData,setAllData]=useState([]); //기간누적sumSummary
    const [allAllData,setAllAllData]=useState([]); //전체 누적
    const [orderData,setOrderData]=useState([]); //기간누적 주문종류
    const [allOrderData,setAllOrderData]=useState([]);//전체누적 주문종류

    //오늘요약
    const [daySum,setDaySum]=useState([]);//오른쪽 아래 그래프
    const [topMenu,setTopMenu]=useState([]);//top5
    const [daySeven,setDaySeven]=useState([]);//일주일 매출 그래프
    const [allSum,setAllSum]=useState([]); //맨 위표
    const [todayOrderType, setTodayOrderType] = useState([]); // 오늘 테이블, 포장 주문
    
    const [circle,setCircle]=useState([]);
    const [bar,setBar]=useState([]);
    const [bars,setBars]=useState([]);
    const [line,setLine]=useState([]);
    const [lines,setLines]=useState([]);
    const [lineMax,setLineMax]=useState(0);

    useEffect(()=>{
        console.log("ALLSum",allSum);
    },[allSum]);

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
        console.log(daySeven);
        if(daySeven.length!=0){
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

        console.log(daySeven);
        let start=+daySeven[0].date;
        let index=-1;
        for(let i=1;i<daySeven.length;i++){
            if(+daySeven[i].date>start) start=daySeven[i].date;
            else{
                index=i;
                break;
            }
        }
        console.log(index);

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

            console.log(format+v.date,day);
            BarData[day].매출+=v.totalSale
            }
        );
        setBar(BarData);
        }
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
        if(select==3){
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
        }

        const date={
            branchId:managerId,
            start:nowYear+'-'+('0'+dayMonth).slice(-2)+'-00',
            end:nowYear+'-'+('0'+dayMonth).slice(-2)+'-32'
        }
        console.log(date);
        await axios.post('http://localhost:8080/payment/getSaleInfoBetween',date,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                const monthD =res.data.sumSummary;
                monthD[0].cardTotalSale!=null && setMonthDayCard(monthD[0].cardTotalSale);
                monthD[0].cashTotalSale!=null &&setMonthDayCash(monthD[0].cashTotalSale);
            }).catch(e=>{
                console.log(e);
        })

    },[dayData]);

    //월별 전체 일일별 데이터
    //월의 일수만큼 배열만들어서 monthdaydata 해당 일 수 의 매출 넣어주기
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        console.log(monthDayData);
        console.log(dayYear,dayMonth);
        const lastday = new Date(dayYear,dayMonth,0).getDate();
        console.log(lastday);

        if(lastday>=0){
        const whole = Array(lastday);
        for(let i=1;i<=lastday;i++){
            whole[i-1]={
                day:i,
                매출:0
            }
        }
        monthDayData.map((v,i)=>{
            whole[v.dateRange-1].매출=v.totalSale;
        });
        console.log(whole);//현재 달의 일수만큼 일별 매출 들어간 배열.

        const firstday = new Date(dayYear,dayMonth,1).getDate();
        console.log(firstday);//해당 월의 첫날의 요일
        
        //setDayMonthWhole
        const newArr = [];
        // for(let i=1;i<=firstday;i++){
        //     newArr.push({day:0,매출:0});
        // }
        setDayMonthWhole(newArr.concat(whole));
       
        }
    },[monthDayData]);

    useEffect(()=>{
        console.log(dayMonthWhole)
    },[dayMonthWhole]);
    
    //일일 선택 날짜 변경시, new data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        console.log(dayYear,dayMonth);
        setDayMonthWhole([]);
        setMonthDayCard(0);
        setMonthDayCash(0);
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
        console.log(monthKindData);
    },[monthKindData]);

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
        setLines([]);
        setYear('');
        setMonth('');
        setDayYear();
        setDayMonth();
        setStartDate();
        setEndDate();
        setAllData([]);
        setOrderData([]);
        if(select==2) {
            console.log(line);
            setLines([]);
            setMonth(nowMonth);
        }
        if(select==1) {
            console.log(line);
            setLines([]);
            setYear(nowYear); //현재 연도로 초기화.
        }
        if(select==3) {
            console.log(line);
            setLines([]);
            setDayYear(nowYear);
            setDayMonth(nowMonth);
        }
        if(select==4){
            const date={
                branchId:managerId,
                start:'2010-01-01',
                end:nowYear+1+'-01-01'
            }
            console.log(date);
            await axios.post('http://localhost:8080/payment/getSaleInfoBetween',date,{
                headers : {
                "Content-Type" : "application/json",
                }}).then((res)=>{
                    console.log(res.data);
                    setAllAllData(res.data.sumSummary);
                    setAllOrderData(res.data.orderTypeSumSummary);
                }).catch(e=>{
                    console.log(e);
                })
            console.log(date);
        }
    },[select]);

    useEffect(()=>{
        console.log(allOrderData,allOrderData.length);
    },[allOrderData]);

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
                setTodayOrderType(res.data.OrderTypeSummary);
            }).catch(e=>{
                console.log(e);
            })
        }
    },[select,year,month,startDate,endDate]);



    //직접 입력
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        console.log(startDate,endDate);
        if(startDate!=undefined && endDate!=undefined){
            const data={
                branchId : managerId,
                start : startDate,
                end : endDate
            }
            console.log(data);
            await axios.post('http://localhost:8080/payment/getSaleInfoBetween',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                console.log(res.data);
                console.log(res.data.orderTypeSumSummary);
                setEachData(res.data.dateSaleSummary);
                setTimeData(res.data.hourSummary);
                setAllData(res.data.sumSummary);
                setOrderData(res.data.orderTypeSumSummary); //주문종류별
            }).catch(e=>{
                console.log(e);
            })

        }

    },[startDate,endDate])

    useEffect(()=>{
        console.log(orderData)
    },[orderData]);

    useEffect(()=>{
        console.log(eachData);
        const data=[];
        eachData.map((v,i)=>{
            data.push({
                name :v.dateRange,
                매출 :v.totalSale
            })
        })

        console.log(data);
        setBars(data);
    },[eachData]);

    useEffect(()=>{
        console.log(timeData);
        const data=[
            {
                name:'0~2시',
                매출:0,
            },
            {
                name:'3~5시',
                매출:0,
            },
            {
                name:'6~8시',
                매출:0,
            },
            {
                name:'9~11시',
                매출:0,
            },
            {
                name:'12~14시',
                매출:0,
            },
            {
                name:'15~17시',
                매출:0,
            },
            {
                name:'18~20시',
                매출:0,
            },
            {
                name:'21~23시',
                매출:0,
            },
        ]

        timeData.map((v,i)=>{
            let index=Math.floor(v.hour/3);
            console.log(v,index);
            data[index].매출+=v.totalSale;
        });

        console.log(data);
        setLines(data);
    },[timeData]);
    
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
                                <input type="date" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}}/>
                                <TextDiv style={{marginLeft:'0.5rem', marginBottom:'0.5rem'}}> ~ </TextDiv>
                                <input type="date" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}/>
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

                            <br/>
                            <TableContainer style={{float:'right', width: '40vw', height : '15vh', overflow: 'hidden', marginTop:'1%'}}>
                                        <TableStyle>
                                            <div style={{display:'flex'}}>
                                            <TableHead>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'15vw', height:'4.5vh'}} >현금 매출(원)</ColumnCell>
                                                    <Cell style={{height:'4.5vh',width:'7vw'}}>{allSum && allSum.todayCashTotalSale==null?0:allSum.todayCashTotalSale.toLocaleString()}</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'50vw', height:'4.5vh'}}>매장 주문(원)</ColumnCell>
                                                    <Cell style={{height:'4.5vh',width:'40vw'}}>{todayOrderType.length>0 ?  todayOrderType[0].tableTotalSale==null?0:todayOrderType[0].tableTotalSale.toLocaleString()+"\n("
                                                    + (100 -Math.floor(+todayOrderType[0].takeOutTotalCount*100/(+todayOrderType[0].tableTotalCount + +todayOrderType[0].takeOutTotalCount)))+"%)" : 0}</Cell>
                                                </OrderRow>
                                            </TableHead>
                                            <TableHead>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'15vw', height:'4.5vh'}}>카드 매출(원)</ColumnCell>
                                                    <Cell style={{height:'4.5vh',width:'7vw'}}>{allSum && allSum.todayCardTotalSale==null?0:allSum.todayCardTotalSale.toLocaleString()}</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'50vw',height:'4.5vh'}}>포장 주문(원)</ColumnCell>
                                                    <Cell style={{height:'4.5vh',width:'40vw'}}>{todayOrderType.length>0 ? todayOrderType[0].takeOutTotalSale==null?0:todayOrderType[0].takeOutTotalSale.toLocaleString()+"\n("
                                                    + Math.floor(+todayOrderType[0].takeOutTotalCount*100/(+todayOrderType[0].tableTotalCount + +todayOrderType[0].takeOutTotalCount))+"%)" : 0}</Cell>
                                                </OrderRow>
                                            </TableHead>
                                            </div>
                                            
                                        </TableStyle>                
                            </TableContainer>
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
                                                <OrderCell style={{width:'6.5%'}}>{cell.매출.toLocaleString()}</OrderCell>
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
                                                <OrderCell style={{width:'15%'}}>{cell.매출.toLocaleString()}</OrderCell>
                                            )}
                                        </OrderRow>
                    
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                           </>
                           )}
                           {(select===3) && (
                            <>
                            <div>
                            <TableContainer margin='10px' style={{marginTop : '-1%', height : '50%',}}>
                                <TableStyle style={{width:'90%'}}>
                                    <TableHead>
                                    <OrderRow style={{height : '3.8vh'}}>
                                        <ColumnCell style={{minWidth:'5rem'}}>일</ColumnCell>
                                    {dayMonthWhole && dayMonthWhole.length>0 && dayMonthWhole.map((cell, index) => (
                                        
                                            <ColumnCell style={{minWidth:'6rem'}} component="th" scope="cell">{index+1}</ColumnCell>
                                        
                                    ))}
                                    </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    <OrderRow style={{height : '3.8vh'}}>
                                    <ColumnCell style={{minWidth:'5rem'}}>매출(원)</ColumnCell>
                                    {dayMonthWhole && dayMonthWhole.length>0 && dayMonthWhole.map((cell, index) => (
                                        
                                            <OrderCell style={{minWidth:'6rem'}} scope="cell">{cell.매출.toLocaleString()}</OrderCell>
                                        
                                    ))}
                                    </OrderRow>
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                            {/* {dayMonthWhole && <SaleTable arr={dayMonthWhole} width={'78rem'} height={'35rem'}/>} */}

                            </div>
                           </>
                           )}
                           {
                               (select==4 && (startDate==undefined || endDate==undefined)) && (
                                   <>
                                   <center>
                                   <Title>날짜를 입력해주세요</Title>
                                   </center>
                                   </>
                               )
                           }
                           {(select==4 && startDate!=undefined && endDate!=undefined) && (
                               <>
                               <Title>일별 매출</Title>
                               <GraphDiv style={{marginTop:'12%', minWidth:'10rem'}}>
                                    <BChart2 barData={bars} legend={'3%'} sp={true}/>
                                </GraphDiv>
                               </>
                           )}
                        </GraphTop>
                        
                        {(select!==4) &&
                            <>
                            <GraphBottom>
                                <GraphDiv>
                                    {select!==0 && <BChart legend={'35%'} barData={line} max={lineMax}/>}
                                    {select===0 && <BChart legend={'35%'} barData={bar}/>}
                                </GraphDiv>
                            </GraphBottom>
                            </>
                        }
                        
                        {(select==4 && startDate!=undefined && endDate!=undefined) &&
                            <>
                            <RightTopDiv style={{ marginTop:'-1%', height : '100%', border:'none'}}>
                            <Title style={{marginTop:'5%'}}>시간대별 매출</Title>
                            <GraphDiv>
                                {
                                    <LChart lineData={lines}/>
                                }
                            </GraphDiv>
                            </RightTopDiv>
                            </>
                        }
                    </GraphTemp>
                </LeftBotBotDiv>
                
            </LeftDiv>
            <RightDiv>
                    {select!==-1 && (
                    <RightTopDiv>
                    {select==3 && (
                    <>
                    <Title>기간 누적매출</Title>
                    <GraphDiv>
                    <CircleChart legend={2} value={'매출'} chartData={circle} width={500} height={500} cx={260} cy={240} r={150}/>
                    </GraphDiv>
                    </>
                    )}
                    {select==2 && (
                    <>
                    <Title>이번 주 정보</Title>
                    <TableContainer margin='10px' style={{height : '87%', marginTop:'-3%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{(weekCardSum+weekCashSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{weekCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{weekCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>순 매출(원)</ColumnCell>
                                                <Cell>{weekCashSum.toLocaleString()}</Cell>
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
                        <TableContainer  margin='10px' style={{height : '87%',marginTop:'-3%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{(monthCashSum+monthCardSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{monthCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{monthCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>순 매출(원)</ColumnCell>
                                                <Cell>{monthCashSum.toLocaleString()}</Cell>
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
                    {select==4 && (
                    <>
                    <Title>기간 누적 매출</Title>
                    <TableContainer  margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-6%'}}>
                    <TableStyle>
                                            
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{allData.length!=0 ? allData[0].totalSale.toLocaleString() : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>포장 매출(원)</ColumnCell>
                                                <Cell>{orderData.length!=0 ? (orderData[0].takeOutTotalSale==null?0:orderData[0].takeOutTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%', fontSize:'1rem'}}>매장식사 매출(원)</ColumnCell>
                                                <Cell>{orderData.length!=0 ? (orderData[0].tableTotalSale==null?0:orderData[0].tableTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{allData.length!=0 ? allData[0].cardTotalSale.toLocaleString() : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{allData.length!=0 ? allData[0].cashTotalSale.toLocaleString() : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>순 매출(원)</ColumnCell>
                                                <Cell>{allData.length!=0 ? (allData[0].totalSale*0.9).toLocaleString() : 0}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>               
                    </TableContainer>
                    </>
                    )}
                </RightTopDiv>
                )}
                <RightBottomDiv>
                    {(select==3)&&(
                    <>
                    <Title>누적 매출</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-3%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{(monthDayCard+monthDayCash).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{monthDayCard.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{monthDayCash.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>순 매출(원)</ColumnCell>
                                                <Cell>{((monthDayCard+monthDayCash)*0.9).toLocaleString()}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                        </TableContainer>
                        
                    </>
                    )}
                    {(select==4)&&(
                    <>
                    <Title>전체 매출</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-6%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{allAllData.length!=0 && allAllData[0].totalSale.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>포장 매출(원)</ColumnCell>
                                                <Cell>{allOrderData.length!=0 ? (allOrderData[0].takeOutTotalSale==null?0:allOrderData[0].takeOutTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%', fontSize:'1rem'}}>매장식사 매출(원)</ColumnCell>
                                                <Cell>{allOrderData.length!=0 ? (allOrderData[0].tableTotalSale==null?0:allOrderData[0].tableTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{allAllData.length!=0 && allAllData[0].cardTotalSale.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{allAllData.length!=0 && allAllData[0].cashTotalSale.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'5vh'}}>
                                                <ColumnCell style={{width:'36%'}}>순 매출(원)</ColumnCell>
                                                <Cell>{allAllData.length!=0 && (allAllData[0].totalSale*0.9).toLocaleString()}</Cell>
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
                        <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-3%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{(yearCardSum+yearCashSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{yearCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{yearCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>순 매출(원)</ColumnCell>
                                                <Cell>{((yearCardSum+yearCashSum)*0.9).toLocaleString()}</Cell>
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
                        <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-3%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>총 매출(원)</ColumnCell>
                                                <Cell>{(monthCashSum+monthCardSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>카드 매출(원)</ColumnCell>
                                                <Cell>{monthCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>현금 매출(원)</ColumnCell>
                                                <Cell>{monthCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'7vh'}}>
                                                <ColumnCell style={{width:'36%'}}>순 매출(원)</ColumnCell>
                                                <Cell>{((monthCashSum+monthCardSum)*0.9).toLocaleString()}</Cell>
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
                    {<CircleChart legend={1} value={'value'} chartData={circle} width={800} height={800} cx={400} cy={'50%'} r={150}/>}
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