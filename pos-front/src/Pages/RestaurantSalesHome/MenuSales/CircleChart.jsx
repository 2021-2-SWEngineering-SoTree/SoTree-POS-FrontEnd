import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend,Tooltip } from "recharts";

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

const CustomTooltip = ({ active, payload, label }) => {
	if (active) {
    let key='메뉴';
    if(payload[0].name.includes('요일')) key='요일';
		return (
      
			<div style={{borderRadius:'10px', border:'1px double black', backgroundColor:'white'}}>
        
				<p className="label">&nbsp;&nbsp;{`${key} : ${payload[0].name}`}&nbsp;&nbsp;</p>
				<p className="intro">&nbsp;&nbsp;{`매출 : ${payload[0].value.toLocaleString()}원`}&nbsp;&nbsp;</p>
			</div>
		);
	}

	return null;
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
      <Tooltip content={<CustomTooltip />}/>
      {legend==1 && <Legend wrapperStyle={{bottom :'29%', left:'5%'}}/>}
      {legend==2 && <Legend width={600} wrapperStyle={{bottom :'16%', left:'-9%'}}/>}
      {legend==3 && <Legend width={500} wrapperStyle={{bottom :'16%', left:'5%', fontSize:'1rem'}}/>}
    </PieChart>
    
    </div>
  );
}

export default CircleChart;