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

//dateStr='202111' -> ?????? ??? return
const getWeekCount =(dateStr)=>{
    var year  = Number(dateStr.substring(0, 4));
    var month = Number(dateStr.substring(4, 6));
     
    var nowDate =new Date(year, month-1, 1);
 
    var lastDate =new Date(year, month, 0).getDate();
    var monthSWeek = nowDate.getDay();
 
    var weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;
 
    return weekSeq;
}

const getWeekNo= (v_date_str) => {
    var date = new Date();
    if(v_date_str){
     date = new Date(v_date_str);
    }
    return Math.ceil(date.getDate() / 7);
}

const SalesTemplate = () => {

    const managerId = window.localStorage.getItem('managerId');
    const nowYear=new Date().getFullYear(); //?????? ???
    const nowMonth = new Date().getMonth()+1;//?????? ???
    const nowDay = new Date().getDate(); //?????? ???

    const [select,setSelect]=useState(0); //?????? 5

    //????????????
    const [year,setYear]=useState();
    const [monthData,setMonthData]=useState([]);
    const [monthCardSum,setMonthCardSum]=useState(0);
    const [monthCashSum,setMonthCashSum]=useState(0);
    const [yearCardSum,setYearCardSum]=useState(0);
    const [yearCashSum,setYearCashSum]=useState(0);

    //????????????
    const [month,setMonth]=useState(); //?????? 
    const [monthWeekData, setMonthWeekData]=useState([]);
    const [weekCardSum,setWeekCardSum]=useState(0);
    const [weekCashSum,setWeekCashSum]=useState(0);

    //??????
    const [dayData,setDayData]=useState([]);
    const [monthDayData,setMonthDayData]=useState([]);
    const [monthKindData,setMonthKindData]=useState([]);
    const [dayYear,setDayYear]=useState();
    const [dayMonth,setDayMonth]=useState();
    const [dayMonthWhole,setDayMonthWhole]=useState();
    const [monthDayCard,setMonthDayCard]=useState(0);
    const [monthDayCash,setMonthDayCash]=useState(0);

    //????????????
    const [startDate,setStartDate]=useState(); 
    const [endDate,setEndDate]=useState();
    const [eachData,setEachData]=useState([]); //?????? dateSaleSummary
    const [timeData,setTimeData]=useState([]); //????????? hourSummary
    const [allData,setAllData]=useState([]); //????????????sumSummary
    const [allAllData,setAllAllData]=useState([]); //?????? ??????
    const [orderData,setOrderData]=useState([]); //???????????? ????????????
    const [allOrderData,setAllOrderData]=useState([]);//???????????? ????????????

    //????????????
    const [daySum,setDaySum]=useState([]);//????????? ?????? ?????????
    const [topMenu,setTopMenu]=useState([]);//top5
    const [daySeven,setDaySeven]=useState([]);//????????? ?????? ?????????
    const [allSum,setAllSum]=useState([]); //??? ??????
    const [todayOrderType, setTodayOrderType] = useState([]); // ?????? ?????????, ?????? ??????
    
    const [circle,setCircle]=useState([]);
    const [bar,setBar]=useState([]);
    const [bars,setBars]=useState([]);
    const [line,setLine]=useState([]);
    const [lines,setLines]=useState([]);
    const [lineMax,setLineMax]=useState(0);

    useEffect(()=>{
    },[allSum]);

    useEffect(()=>{ //??????????????? ????????? ????????? ??????
        const CircleData=[];
        
        daySum.map((v,i)=>{
            let day='';
            if(v.dateRange==1) day='?????????';
            else if(v.dateRange==2) day='?????????';
            else if(v.dateRange==3) day='?????????';
            else if(v.dateRange==4) day='?????????';
            else if(v.dateRange==5) day='?????????';
            else if(v.dateRange==6) day='?????????';
            else if(v.dateRange==7) day='?????????';
            CircleData.push({
                name:day,
                value:+v.totalSale
            })
            }
        );
        setCircle(CircleData);

    },[daySum]);

    //?????? ??????
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        setMonthWeekData([]);
        if(month!=''){
            let selectedMonth=month;
            if(month<10) selectedMonth='0'+selectedMonth;
            const data={
                branchId : managerId,
                start : nowYear+'-'+selectedMonth+'-00',
                end : nowYear+'-'+selectedMonth+'-32',
            }
            await axios.post('http://localhost:8080/payment/getALLSortedBYWEEK',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                setMonthWeekData(res.data);
            }).catch(e=>{
                console.log(e);
            })
        }
    },[month])

    useEffect(()=>{
        if(monthWeekData.length==0){
            setLineMax(0);
        }
        else{
            let length = monthWeekData.length;
            //????????? ???????????? ???????????? ?????? ?????? ??? ??????.
            //setWeekCardSum(monthWeekData[length-1].cardTotalSale);
            //setWeekCashSum(monthWeekData[length-1].cashTotalSale);
            setLineMax(-1);
        }
        const len = getWeekCount(nowYear+''+month);
        const LineData=[];
        for(let i=1;i<=len;i++){
            LineData.push({
                name:i+'???',
                ??????:0
            })
        }

        //let weekSum=0;
        //for(let i=1;i<month;i++){
        //    weekSum+=getWeekCount(nowYear+''+('0'+i).slice(-2));
        //    if(i!=1 &&( new Date(nowYear+'-'+('0'+i).slice(-2)+'-01').getDay()!=0)) weekSum--;
        //}
        //console.log(weekSum);
        //monthWeekData.map((v,i)=>{
        //    const sales=v.totalSale;
        //    if(sales>lineMax) setLineMax(sales);
        //    console.log(v,i);
        //    LineData[+v.weeks-weekSum+1].??????+=sales;
        //});

        monthWeekData.map((v,i)=>{
            LineData[i].??????+=v.totalSale;
        })
        setLine(LineData);

    },[monthWeekData]);

    useEffect(()=>{
        if(daySeven.length!=0){
            const BarData=[];
            
            for(let i=6;i>=0;i--){
                let now = new Date();
                let year,month,day;
                let date = new Date(now.setDate(now.getDate()-i));
                year=date.getFullYear();
                month=date.getMonth()+1;
                day=date.getDate();
                BarData.push({
                    name:year+'-'+('0'+month).slice(-2)+'-'+('0'+day).slice(-2),
                    ??????7?????????:0
                })
            }
            daySeven.map((v,i)=>{
                for(let i=0;i<BarData.length;i++){
                    let day = BarData[i].name.slice(-2);
                    if(+day==(+v.date)){
                        BarData[i].??????7?????????+=v.totalSale;
                    }
                }
            })
            setBar(BarData);
        }
    },[daySeven]);
    
    //?????????????????? ?????? ????????????????????? data???????????????  
    useEffect(()=>{
        const LineData=[
            {
                name:'1???', ?????? :0
            },
            {
                name:'2???', ?????? :0
            },
            {
                name:'3???', ?????? :0
            },
            {
                name:'4???', ?????? :0
            },
            {
                name:'5???', ?????? :0
            },
            {
                name:'6???', ?????? :0
            },
            {
                name:'7???', ?????? :0
            },
            {
                name:'8???', ?????? :0
            },
            {
                name:'9???', ?????? :0
            },
            {
                name:'10???', ?????? :0
            },
            {
                name:'11???', ?????? :0
            },
            {
                name:'12???', ?????? :0
            },
        ];
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
                setMonthCardSum(v.cardTotalSale); //????????? ????????????
                setMonthCashSum(v.cashTotalSale); //????????? ????????????
            }
            LineData[month-1].??????+=v.totalSale;
        });
        setLine(LineData);

        //?????? ??????, ????????????
        setYearCardSum(monthData.reduce(
            (accumulator, currentValue) => accumulator + (+currentValue.cardTotalSale)
            ,0
        ));
        setYearCashSum(monthData.reduce(
            (accumulator, currentValue) => accumulator + (+currentValue.cashTotalSale)
            ,0
        ));
    },[monthData]);

    //?????? => ?????? ??? ?????? => ??????&?????? ????????? ??????
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        
        let startData=[];
        const data={
            branchId : managerId,
            start : nowYear+'-01-00',
            end : nowYear+'-12-32'
        }
        await axios.post('http://localhost:8080/payment/getALLSortedByMonth',data,{
        headers : {
        "Content-Type" : "application/json",
        }}).then((res)=>{
            startData=res.data;
        }).catch(e=>{
            console.log(e);
        })

        startData.map((v,i)=>{
            let month;
            month=v.months;
            if(month==nowMonth) {
                setMonthCardSum(v.cardTotalSale); //????????? ????????????
                setMonthCashSum(v.cashTotalSale); //????????? ????????????
            }
        });
        
        
        //???????????????
        let selectedMonth=nowMonth;
        if(nowMonth<10) selectedMonth='0'+selectedMonth;
        const date={
            branchId : managerId,
            start : nowYear+'-'+selectedMonth+'-00',
            end : nowYear+'-'+selectedMonth+'-32',
        }
        let dateStr = nowYear+'-'+selectedMonth+'-'+('0'+new Date().getDate()).slice(-2);
        let week = getWeekNo(dateStr);
        await axios.post('http://localhost:8080/payment/getALLSortedBYWEEK',date,{
        headers : {
        "Content-Type" : "application/json",
        }}).then((res)=>{
            console.log(res.data);
            setWeekCardSum(res.data[week-1].cardTotalSale);
            setWeekCashSum(res.data[week-1].cashTotalSale);
        }).catch(e=>{
        })
        
    },[])

    // ?????? ?????? ??????->data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        
        if(year!=''){
            const data={
                branchId : managerId,
                start : year+'-01-00',
                end : year+'-12-32'
            }
            await axios.post('http://localhost:8080/payment/getALLSortedByMonth',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                setMonthData(res.data);
            }).catch(e=>{
                console.log(e);
            })
        }
    },[year])

    //?????? ?????? ??? data ??????. ????????? ?????? ?????? ?????? ??????.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        if(select==3){
        const data=[
            {
                name:'?????????', ?????? :0
            },
            {
                name:'?????????', ?????? :0
            },
            {
                name:'?????????', ?????? :0
            },
            {
                name:'?????????', ?????? :0
            },
            {
                name:'?????????', ?????? :0
            },
            {
                name:'?????????', ?????? :0
            },
            {
                name:'?????????', ?????? :0
            },
        ];

        dayData.map((v,i)=>{
            data[v.dateRange-1].??????+=v.totalSale;
        })

        setLine(data);
        
        const circle=data.filter((v)=>v.??????!=0);
        setCircle(circle);
        }

        const date={
            branchId:managerId,
            start:nowYear+'-'+('0'+dayMonth).slice(-2)+'-00',
            end:nowYear+'-'+('0'+dayMonth).slice(-2)+'-32'
        }
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

    //?????? ?????? ????????? ?????????
    //?????? ???????????? ?????????????????? monthdaydata ?????? ??? ??? ??? ?????? ????????????
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        const lastday = new Date(dayYear,dayMonth,0).getDate();

        if(lastday>=0){
        const whole = Array(lastday);
        for(let i=1;i<=lastday;i++){
            whole[i-1]={
                day:i,
                ??????:0
            }
        }
        monthDayData.map((v,i)=>{
            whole[v.dateRange-1].??????=v.totalSale;
        });

        const firstday = new Date(dayYear,dayMonth,1).getDate();
        
        //setDayMonthWhole
        const newArr = [];
        // for(let i=1;i<=firstday;i++){
        //     newArr.push({day:0,??????:0});
        // }
        setDayMonthWhole(newArr.concat(whole));
       
        }
    },[monthDayData]);

    useEffect(()=>{
    },[dayMonthWhole]);
    
    //?????? ?????? ?????? ?????????, new data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        setDayMonthWhole([]);
        setMonthDayCard(0);
        setMonthDayCash(0);
        let month=('0'+dayMonth).slice(-2)
        let nextmonth;
        if(month=='12') nextmonth='13';
        else nextmonth=('0'+(+dayMonth+1)).slice(-2)
        const data={
            branchId : managerId,
            start : dayYear+`-${month}-00`,
            end : dayYear+`-${nextmonth}`
        }
        await axios.post('http://localhost:8080/payment/getDaySaleInfo',data,{
        headers : {
        "Content-Type" : "application/json",
        }}).then((res)=>{
            setDayData(res.data.dayOfWeekSaleSummary);
            setMonthDayData(res.data.daySaleSummary);
            setMonthKindData(res.data.orderTypeSummary);
        }).catch(e=>{
           console.log(e);
        })
    },[dayYear,dayMonth]);

    useEffect(()=>{
    },[monthKindData]);

    useEffect(()=>{
    },[line]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        //graphData ?????????.
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
            setLines([]);
            setMonth(nowMonth);
        }
        if(select==1) {
            setLines([]);
            setYear(nowYear); //?????? ????????? ?????????.
        }
        if(select==3) {
            setLines([]);
            setDayYear(nowYear);
            setDayMonth(nowMonth);
        }
        if(select==4){
            const date={
                branchId:managerId,
                start:'2010-01-00',
                end:nowYear+1+'-01-01'
            }
            await axios.post('http://localhost:8080/payment/getSaleInfoBetween',date,{
                headers : {
                "Content-Type" : "application/json",
                }}).then((res)=>{
                    setAllAllData(res.data.sumSummary);
                    setAllOrderData(res.data.orderTypeSumSummary);
                }).catch(e=>{
                    console.log(e);
                })
        }
    },[select]);

    useEffect(()=>{
    },[allOrderData]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        if(select===0){
            const data={
                branchId : managerId,
                start : nowYear+'-01-00',
                end : nowYear+'-12-32'
            }
            await axios.post('http://localhost:8080/payment/getTodaySummarySale',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
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



    //?????? ??????
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        if(startDate!=undefined && endDate!=undefined){
            const data={
                branchId : managerId,
                start : startDate,
                end : endDate+' 24:01'
            }
            await axios.post('http://localhost:8080/payment/getSaleInfoBetween',data,{
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                setEachData(res.data.dateSaleSummary);
                setTimeData(res.data.hourSummary);
                setAllData(res.data.sumSummary);
                setOrderData(res.data.orderTypeSumSummary); //???????????????
            }).catch(e=>{
                console.log(e);
            })

        }

    },[startDate,endDate])

    useEffect(()=>{
    },[orderData]);

    useEffect(()=>{
        const data=[];
        eachData.map((v,i)=>{
            data.push({
                name :v.dateRange,
                ?????? :v.totalSale
            })
        })

        setBars(data);
    },[eachData]);

    useEffect(()=>{
        const data=[
            {
                name:'0~2???',
                ??????:0,
            },
            {
                name:'3~5???',
                ??????:0,
            },
            {
                name:'6~8???',
                ??????:0,
            },
            {
                name:'9~11???',
                ??????:0,
            },
            {
                name:'12~14???',
                ??????:0,
            },
            {
                name:'15~17???',
                ??????:0,
            },
            {
                name:'18~20???',
                ??????:0,
            },
            {
                name:'21~23???',
                ??????:0,
            },
        ]

        timeData.map((v,i)=>{
            let index=Math.floor(v.hour/3);
            data[index].??????+=v.totalSale;
        });

        setLines(data);
    },[timeData]);
    
    return (
        <>
        <Header text ={"?????? ??????"} restaurantName = {localStorage.getItem('storeName')}/>
        <Div>
            <LeftDiv>
                <LeftTopDiv>
                    <DateButton onClick={()=>setSelect(0)} name={'????????????'}/>
                    <DateButton onClick={()=>setSelect(1)} name={'??????'}/>
                    <DateButton onClick={()=>setSelect(2)} name={'??????'}/>
                    <DateButton onClick={()=>setSelect(3)} name={'??????'}/>
                    <DateButton onClick={()=>setSelect(4)} name={'????????????'}/>
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
                                <TextDiv>???</TextDiv>
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
                                <TextDiv>???</TextDiv>
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
                                <TextDiv>???</TextDiv>
                                
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
                                <TextDiv>???</TextDiv>
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
                                <SaleInfoItem price={allSum.todayCardTotalSale+allSum.todayCashTotalSale} colors={"#8DDEE9"} criterion ={"??????"} count ={allSum.todayCount}/>
                                <SaleInfoItem price={allSum.weekSale} colors={"orange"} criterion ={"??????"} count ={allSum.weekCount}/>
                                <SaleInfoItem price={allSum.monthSale} colors={"blue"} criterion ={"??????"} count ={allSum.monthCount}/>
                                <SaleInfoItem price={allSum.yearSale} colors={"purple"} criterion ={"??????"} count ={allSum.yearCount}/>

                            </SaleDiv>

                            <br/>
                            <TableContainer style={{float:'right', width: '40vw', height : '15vh', overflow: 'hidden', marginTop:'1%'}}>
                                        <TableStyle>
                                            <div style={{marginTop:'-4vh', fontWeight:'bold', fontSize:'2.3vh', marginBottom : '1vh'}}>[ ?????? ?????? ?????? ?????? ]</div>
                                            <div style={{display:'flex'}}>
                                            <TableHead>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'15vw', height:'4.5vh'}} >?????? ??????(???)</ColumnCell>
                                                    <Cell style={{height:'4.5vh',width:'7vw'}}>{allSum && allSum.todayCashTotalSale==null?0:allSum.todayCashTotalSale.toLocaleString()}</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'50vw', height:'4.5vh'}}>?????? ??????(???)</ColumnCell>
                                                    <Cell style={{height:'4.5vh',width:'40vw'}}>{todayOrderType.length>0 ?  todayOrderType[0].tableTotalSale==null?0:todayOrderType[0].tableTotalSale.toLocaleString()+"\n("
                                                    + (100 -Math.floor(+todayOrderType[0].takeOutTotalCount*100/(+todayOrderType[0].tableTotalCount + +todayOrderType[0].takeOutTotalCount)))+"%)" : 0}</Cell>
                                                </OrderRow>
                                            </TableHead>
                                            <TableHead>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'15vw', height:'4.5vh'}}>?????? ??????(???)</ColumnCell>
                                                    <Cell style={{height:'4.5vh',width:'7vw'}}>{allSum && allSum.todayCardTotalSale==null?0:allSum.todayCardTotalSale.toLocaleString()}</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell style={{width:'50vw',height:'4.5vh'}}>?????? ??????(???)</ColumnCell>
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
                                            <ColumnCell>???</ColumnCell>
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
                                            <ColumnCell style={{width:'6%'}}>??????</ColumnCell>
                                            {line.length>0 && line.map((cell, index) => 
                                                <OrderCell style={{width:'7.5%', fontSize:'1rem'}}>{cell.??????.toLocaleString()}</OrderCell>
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
                                            <ColumnCell style={{width:'10%'}}>???</ColumnCell>
                                            {line.length>0 && line.map((cell, index) => 
                                                <ColumnCell style={{width:'15%'}}>{index+1}</ColumnCell>
                                            )}
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody style={{height:'5vh'}}> 
                                        <OrderRow style={{height : '3.8vh'}}>
                                            <ColumnCell style={{width:'10%'}}>??????</ColumnCell>
                                            {line.length>0 && line.map((cell, index) => 
                                                <OrderCell style={{width:'15%'}}>{cell.??????.toLocaleString()}</OrderCell>
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
                                        <ColumnCell style={{minWidth:'5rem'}}>???</ColumnCell>
                                    {dayMonthWhole && dayMonthWhole.length>0 && dayMonthWhole.map((cell, index) => (
                                        
                                            <ColumnCell style={{minWidth:'6rem'}} component="th" scope="cell">{index+1}</ColumnCell>
                                        
                                    ))}
                                    </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    <OrderRow style={{height : '3.8vh'}}>
                                    <ColumnCell style={{minWidth:'5rem'}}>??????(???)</ColumnCell>
                                    {dayMonthWhole && dayMonthWhole.length>0 && dayMonthWhole.map((cell, index) => (
                                        
                                            <OrderCell style={{minWidth:'6rem', fontSize:'1rem'}} scope="cell">{cell.??????.toLocaleString()}</OrderCell>
                                        
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
                                   <Title>????????? ??????????????????</Title>
                                   </center>
                                   </>
                               )
                           }
                           {(select==4 && startDate!=undefined && endDate!=undefined) && (
                               <>
                               <Title>?????? ??????</Title>
                               <GraphDiv style={{marginTop:'12%', minWidth:'10rem'}}>
                                    <BChart2 barData={bars} legend={'3%'} sp={true} bottomLabel={"??????"}/>
                                </GraphDiv>
                               </>
                           )}
                        </GraphTop>
                        
                        {(select!==4) &&
                            <>
                            <GraphBottom>
                                <GraphDiv>
                                    {select!==0 && <BChart legend={'35%'} barData={line} max={lineMax} bottomLabel={"??????"}/>}
                                    {select===0 && <BChart legend={'35%'} barData={bar} bottomLabel={"??????7?????????"}/>}
                                </GraphDiv>
                            </GraphBottom>
                            </>
                        }
                        
                        {(select==4 && startDate!=undefined && endDate!=undefined) &&
                            <>
                            <RightTopDiv style={{ marginTop:'-1%', height : '100%', border:'none'}}>
                            <Title style={{marginTop:'5%'}}>???????????? ??????</Title>
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
                    <Title>?????? ????????????</Title>
                    <GraphDiv>
                    <CircleChart legend={2} value={'??????'} chartData={circle} width={500} height={500} cx={260} cy={240} r={150}/>
                    </GraphDiv>
                    </>
                    )}
                    {select==2 && (
                    <>
                    <Title>?????? ??? ??????</Title>
                    <TableContainer margin='10px' style={{height : '87%', marginTop:'-4%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(weekCardSum || weekCashSum) && (weekCardSum+weekCashSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????????(???)</ColumnCell>
                                                <Cell>{(weekCardSum || weekCashSum) && ((weekCardSum+weekCashSum)*0.1).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(weekCardSum || weekCashSum) && ((weekCardSum+weekCashSum)*0.9).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{weekCardSum && weekCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{weekCardSum && weekCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                    </TableContainer>
                    </>
                    )}

                    {select==1 &&(
                        <>
                        <Title>?????? ??? ??????</Title>
                        <TableContainer  margin='10px' style={{height : '87%',marginTop:'-4%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(monthCashSum || monthCardSum) && (monthCashSum+monthCardSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????????(???)</ColumnCell>
                                                <Cell>{(monthCashSum || monthCardSum) && ((monthCashSum+monthCardSum)*0.1).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(monthCashSum || monthCardSum) && ((monthCashSum+monthCardSum)*0.9).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{monthCardSum && monthCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{monthCashSum && monthCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                 
                        </TableContainer>
                        </>
                    )}
                    {select===0 && (
                    <>
                    <Title>?????? ???????????? TOP 5</Title>
                    <TableContainer  margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>??????</ColumnCell>
                                            <ColumnCell>?????????</ColumnCell>
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
                    <Title>?????? ?????? ??????</Title>
                    <TableContainer  margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                    <TableStyle>
                                            
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{allData.length!==0 ? (allData[0].totalSale === null ? 0 : allData[0].totalSale.toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????????(10%)(???)</ColumnCell>
                                                <Cell>{allData.length!==0 ? (allData[0].totalSale === null ? 0 : (allData[0].totalSale*0.1).toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{allData.length!==0 ? (allData[0].totalSale === null ? 0 : (allData[0].totalSale*0.9).toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{orderData.length!==0 ? (orderData[0].takeOutTotalSale==null?0:orderData[0].takeOutTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>???????????? ??????(???)</ColumnCell>
                                                <Cell>{orderData.length!==0 ? (orderData[0].tableTotalSale==null?0:orderData[0].tableTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{allData.length!==0 ? (allData[0].cardTotalSale === null ? 0: allData[0].cardTotalSale.toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{allData.length!==0 ? (allData[0].cashTotalSale === null ? 0 : allData[0].cashTotalSale.toLocaleString()) : 0}</Cell>
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
                    <Title>?????? ??????</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                    <TableStyle>
                                        <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(monthDayCard || monthDayCash) && (monthDayCard+monthDayCash).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????????(???)</ColumnCell>
                                                <Cell>{(monthDayCard || monthDayCash) && ((monthDayCard+monthDayCash)*0.1).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(monthDayCard || monthDayCash) && ((monthDayCard+monthDayCash)*0.9).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{monthDayCard && monthDayCard.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{monthDayCash && monthDayCash.toLocaleString()}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                        </TableContainer>
                        
                    </>
                    )}
                    {(select==4)&&(
                    <>
                    <Title>?????? ??????</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{allAllData.length!==0 ? (allAllData[0].totalSale === null ? 0 : allAllData[0].totalSale.toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????????(10%)(???)</ColumnCell>
                                                <Cell>{allAllData.length!==0 ? (allAllData[0].totalSale === null ? 0 : (allAllData[0].totalSale*0.1).toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{allAllData.length!==0 ? (allAllData[0].totalSale === null ? 0 :(allAllData[0].totalSale*0.9).toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{allOrderData.length!==0 ? (allOrderData[0].takeOutTotalSale==null?0:allOrderData[0].takeOutTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>???????????? ??????(???)</ColumnCell>
                                                <Cell>{allOrderData.length!==0 ? (allOrderData[0].tableTotalSale==null?0:allOrderData[0].tableTotalSale.toLocaleString()): 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{allAllData.length!==0 ? (allAllData[0].cardTotalSale === null ? 0 : allAllData[0].cardTotalSale.toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'4.2vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{allAllData.length!==0 ? (allAllData[0].cashTotalSale === null ? 0 : allAllData[0].cashTotalSale.toLocaleString()) : 0}</Cell>
                                            </OrderRow>
                                            
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                    </TableContainer>
                    </>
                    )}
                    {select==1 &&(
                        <>
                        <Title>??? ??????</Title>
                        <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(yearCardSum || yearCashSum) && (yearCardSum+yearCashSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????????(???)</ColumnCell>
                                                <Cell>{(yearCardSum || yearCashSum) &&((yearCardSum+yearCashSum)*0.1).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(yearCardSum || yearCashSum) &&((yearCardSum+yearCashSum)*0.9).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{yearCardSum && yearCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{yearCashSum && yearCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>               
                        </TableContainer>
                        </>
                    )}
                    {select==2 &&(
                        <>
                        <Title>?????? ??? ??????</Title>
                        <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                    <TableStyle>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(monthCashSum || monthCardSum) && (monthCashSum+monthCardSum).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????????(???)</ColumnCell>
                                                <Cell>{(monthCashSum || monthCardSum) && ((monthCashSum+monthCardSum)*0.1).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>??? ??????(???)</ColumnCell>
                                                <Cell>{(monthCashSum || monthCardSum) && ((monthCashSum+monthCardSum)*0.9).toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{monthCardSum && monthCardSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                            <OrderRow style={{height:'6vh'}}>
                                                <ColumnCell style={{width:'36%'}}>?????? ??????(???)</ColumnCell>
                                                <Cell>{monthCashSum && monthCashSum.toLocaleString()}</Cell>
                                            </OrderRow>
                                        <TableBody>

                                        </TableBody>
                                    </TableStyle>                
                        </TableContainer>
                        </>
                    )}
                    {select==0 && (
                    <>
                    <Title>????????? ??????</Title>
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
