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
    amt: 2400
  },
  {
    name: "화요일",
    매출: 1398,
    amt: 2210
  },
  {
    name: "수요일",
    매출: 3908,
    amt: 2000
  },
  {
    name: "목요일",
    매출: 4800,
    amt: 2181
  },
  {
    name: "금요일",
    매출: 3800,
    amt: 2500
  },
  {
    name: "토요일",
    매출: 4300,
    amt: 2100
  },
  {
    name: "일요일",
    매출: 4300,
    amt: 2100
  }
];

export default function BChart() {
  return (
    <BarChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 20,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="매출" fill="#8884d8" />
    </BarChart>
  );
}
