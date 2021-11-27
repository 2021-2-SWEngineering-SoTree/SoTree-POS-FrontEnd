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

const data = [
  {
    name: "월요일",
    매출: 2400,
  },
  {
    name: "화요일",
    매출: 1398,
  },
  {
    name: "수요일",
    매출: 3908,
  },
  {
    name: "목요일",
    매출: 4800,
  },
  {
    name: "금요일",
    매출: 3800,
  },
  {
    name: "토요일",
    매출: 4300,
  },
  {
    name: "일요일",
    매출: 4300,
  }
];

const BChart=({barData,legend,sp})=> {
  return (
    <BarChart
      width={800}
      height={500}
      data={barData}
      margin={{
        top: 20,
        right: 10,
        left: 10,
        bottom: 200
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend wrapperStyle={{bottom :legend, left:'5%'}}/>
      <Bar dataKey="매출" fill="#8884d8" />
    </BarChart>
  );
}

export default BChart;