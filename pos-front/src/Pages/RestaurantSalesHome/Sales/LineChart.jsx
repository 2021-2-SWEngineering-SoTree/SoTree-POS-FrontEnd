import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "월",
    "매출": 40000,
    amt: 2400
  },
  {
    name: "화",
    "매출": 50000,
    amt: 2210
  },
  {
    name: "수",
    "매출": 45000,
    amt: 2290
  },
  {
    name: "목",
    "매출": 35000,
    amt: 2000
  },
  {
    name: "금",
    "매출": 50000,
    amt: 2181
  },
  {
    name: "토",
    "매출": 80000,
    amt: 2500
  },
  {
    name: "일",
    "매출": 70000,
    amt: 2100
  }
];

const LChart=({lineData, min, max})=> {

  return (
    <LineChart
      width={900}
      height={500}
      data={lineData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 150
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis type="number" domain={[0, {max}]}/>
      <Tooltip />
      <Legend wrapperStyle={{bottom :'26%', left:'5%'}}/>
      <Line
        type="monotone"
        dataKey="매출"
        stroke="#8884d8"
        activeDot={{ r: 3 }}
      />
      </LineChart>
  );
}

export default LChart;