import React,{useState,useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SaleTable from '../../Components/Table/SaleTable';

const TopDiv = styled.div`
    display : flex;
    height : 5vh;
    margin-left :10%
`;

const LeftDiv = styled.div`
height : 100%;
width : 80%;
justify-content: center;
text-align:center;
`;

const RightDiv = styled.div`
    height : 100%;
    width : 20%;
    display : flex;
    justify-content : flex-end;
`;

const BottomDiv = styled.div`
    height : 65vh;
    margin-left:10%;
`

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

const TextDiv = styled.div`
    height : 2rem;
    font-size : 1.5rem;
    line-height : 2.5rem;
    margin-right : 0.5rem;
    font-weight : bold;
`;

const getWeekCount =(dateStr)=>{
    var year  = Number(dateStr.substring(0, 4));
    var month = Number(dateStr.substring(4, 6));  
    var nowDate =new Date(year, month-1, 1);
    var lastDate =new Date(year, month, 0).getDate();
    var monthSWeek = nowDate.getDay();
    var weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;
    return weekSeq;
}

const WorkSchedulePage = () => {

    const nowYear=new Date().getFullYear(); //현재 년
    const nowMonth = new Date().getMonth()+1;//현재 월
    const [list, setList]=useState([]);
    const [year,setYear]=useState(nowYear);
    const [month, setMonth]=useState(nowMonth);
    const [data,setData]=useState([]);
    const [num,setNum]=useState();
    const managerId = window.localStorage.getItem('managerId');
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        setData([]);
        setList([]);
        await axios.post('http://localhost:8080/commute/findCommuteByEmployee',managerId,{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            console.log(res.data);
            setList(res.data);
        }).catch(e=>{
            console.log(e);
        })

        setNum(getWeekCount(year+''+month));
    },[month]);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=>{
        const lastday = new Date(year,month,0).getDate(); //해당 월의 최대일
        console.log(lastday);
        const whole = Array(lastday);

        let month2 = ('0'+month).slice(-2);
        for(let i=1;i<=lastday;i++){
            let day = ('0'+i).slice(-2);
            whole[i-1]={
                day:year+'-'+month2+'-'+day,
                L:[],
                D:[],
                F:[]
            }
        }

        for (let name in list) {
            let menu = list[name];
            console.log(name,menu);
            console.log(typeof name);
            console.log(typeof menu);
        }

        for(let i=1;i<=lastday;i++){
            let day = new Date(year+'-'+month+'-'+i).getDay();
            for(let name in list){
                let work=list[name];
                let char = work[day];
                if(char=='L'){
                    whole[i-1].L.push(name);
                }
                else if(char=='D'){
                    whole[i-1].D.push(name);
                }
                else if(char=='F'){
                    whole[i-1].F.push(name);
                }
                
            }
        }
        console.log(whole);
        console.log(year,month);
        const firstday = new Date(year,month-1,1).getDay();
        console.log(firstday);//해당 월의 첫날의 요일
        const newArr=[];
        for(let i=1;i<=firstday;i++){
            newArr.push({day:0});
        }
        setData(newArr.concat(whole));

    },[list]);

    useEffect(()=>console.log(data),[data]);

    return(
        <>
        <TopDiv>
            <LeftDiv>
                <TextDiv>{year}년 {month}월 근무표</TextDiv>
            </LeftDiv>
            <RightDiv>
                
                <TextDiv>월:</TextDiv>
                <Selector value={month} onChange={(e)=>setMonth(+e.target.value)} style={{marginTop:'1.5%',width:'4rem', height :'2rem'}}>
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
            </RightDiv>
        </TopDiv>
        <BottomDiv>
            < SaleTable week={num} arr={data} width={'100%'} height={'100%'}/>
        </BottomDiv>
        </>
    )
}

export default WorkSchedulePage;