import React, { useEffect, useState } from 'react';
import { BsDisplay } from 'react-icons/bs';
import Header from '../../Components/Header';
import SeatTable from './Seat/SeatTable';
import Td from './Seat/Td';
import axios from 'axios';

const CurrentSeatInfoPage = () => {
    
    const [tableData, setTableData] = useState([]);

    let size = 16;


    const getCurrentTableInfo = async ()=>{
        let managerId = localStorage.getItem('managerId')
        await axios.post(`http://localhost:8080/order/getTableNumber/1/16`,{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            setTableData(()=>res.data);
            console.log('menu', res.data);
        }).catch(e=>{
            console.log(e);
        })
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        await getCurrentTableInfo();
    },[])
    return (
        <div>
            <Header text ={"판매"} restaurantName = {localStorage.getItem('storeName')}/>
            <div style= {{display : 'flex', width:'99%', margin:'0.5rem -0.5rem 0.5rem 0.5rem', height:'100%'}}>
                <div style={{width:'80%'}}>
                    <SeatTable size = {size} data={tableData}/>
                </div>
                <div style={{width:'20%', marginLeft:'0.3rem'}}>
                    <div style={{width:'102%'}}>
                        <div style={{fontWeight:'bold', textAlign:'center', backgroundColor:'#D7FAFF', marginBottom:'0.2rem',
                    border :'3px solid #000000'}}> 포 장 목 록</div>
                    </div>
                    <div style={{display : 'flex', flexDirection:'column'}}>
                        <table style={{display : 'flex', flexDirection:'column', borderCollapse : 'collapse', border : '5px solid #000000' }}>
                        {Array(4).fill().map((tr, i)=> 
                            <Td rowIndex={0} cellIndex={100+i} size={size/4} 
                                />)
                        }
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentSeatInfoPage;