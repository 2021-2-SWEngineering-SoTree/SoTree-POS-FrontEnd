import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

let renderLabel=function(entry){
  console.log("SDAFDS");
  console.log(entry);
  return entry.name;
}

const COLORS = ["#DA6969", "#DA9E69", "#DAD669", "#BFDA69","#87DA69","#69DA9A","#69DADA","#699ADA","#7469DA","#9E69DA","#D669DA","#DA698F",
"#DA6969"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CircleChart =({chartData, width, height, cx, cy, r, value, legend})=> {
  return (
    <div>
    <PieChart width={width} height={height}>
      <Pie style={{fontSize:'1rem'}}
        data={chartData}
        cx={cx}
        cy={cy}
        labelLine={false}
        outerRadius={r}
        fill="#8884d8"
        dataKey={value}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      {legend==1 && <Legend wrapperStyle={{bottom :'29%', left:'5%'}}/>}
      {legend==2 && <Legend width={600} wrapperStyle={{bottom :'16%', left:'-9%'}}/>}
      {legend==3 && <Legend width={500} wrapperStyle={{bottom :'16%', left:'5%', fontSize:'1rem'}}/>}
    </PieChart>
    
    </div>
  );
}

export default CircleChart;