import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
const COLORS = ['#10B981', '#F59E0B', '#9CA3AF'];
export default function TasksChart({selesai, berjalan, total, loading}){
  if(loading) return <div className='h-48 skeleton rounded'/>;
  const data = [
    { name: 'Selesai', value: selesai },
    { name: 'Berjalan', value: berjalan },
    { name: 'Lainnya', value: Math.max(0, total - selesai - berjalan) }
  ];
  return (
    <div style={{height: 220}}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={70} label>
            {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
