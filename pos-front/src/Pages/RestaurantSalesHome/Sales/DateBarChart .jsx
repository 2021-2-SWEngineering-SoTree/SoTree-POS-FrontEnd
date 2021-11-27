import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const BChart2=({barData,legend,sp})=> {

  //데이터 개수 따라서 width 조절
  let length = barData.length;
  length = (Math.floor(length/12)+1)*700;
  console.log(length);
  return (
    <div style={{width:'60%', marginTop:'-17%', overflow:'auto'}}>
    <BarChart 
      width={length}
      height={290}
      data={barData}
      margin={{
        right: 10,
        left: 20
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} />
      <YAxis/>
      <Tooltip />
      <Legend wrapperStyle={{bottom :legend, left:'5%'}}/>
      <Bar dataKey="매출" fill="#8884d8" barSize={25}/>
    </BarChart>
    </div>
  );
}

export default BChart2;