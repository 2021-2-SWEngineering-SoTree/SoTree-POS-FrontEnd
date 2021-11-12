import React, { useState } from 'react';
import { BsDisplay } from 'react-icons/bs';
import Header from '../../Components/Header';
import SeatTable from './Seat/SeatTable';
import Td from './Seat/Td';

const CurrentSeatInfoPage = () => {
    
    const [tableData, setTableData] = useState([
        [{},{},{},{}],[{},{},{},{}],[{},{},{},{}],[{},{},{},{}]
    ]);

    let size = 16;

    return (
        <div>
            <Header text ={"판매"} restaurantName = {"혜민이네 돈까스"}/>
            <div style= {{display : 'flex', width:'99%', margin:'0.5rem -0.5rem 0.5rem 0.5rem', height:'100%'}}>
                <div style={{width:'80%'}}>
                    <SeatTable size = {size}/>
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