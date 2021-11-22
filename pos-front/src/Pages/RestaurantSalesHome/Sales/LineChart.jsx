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

export default function LChart() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis type="number" domain={[10000, 90000]}/>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="매출"
        stroke="#8884d8"
        activeDot={{ r: 3 }}
      />
      </LineChart>
  );
}