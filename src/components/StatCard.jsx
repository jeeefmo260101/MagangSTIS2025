import React, {useEffect, useState} from 'react';
export default function StatCard({title, value, color}){
  const [display, setDisplay] = useState(typeof value === 'number' ? 0 : value);
  useEffect(()=>{
    if(typeof value === 'number'){
      let start=0;
      const end=value;
      const step = Math.max(1, Math.floor(end/40));
      const id = setInterval(()=>{
        start += step;
        if(start>=end){ start=end; clearInterval(id); }
        setDisplay(start);
      }, 16);
      return ()=>clearInterval(id);
    } else {
      setDisplay(value);
    }
  },[value]);
  const colorClass = color==='green' ? 'text-green-600' : color==='yellow' ? 'text-yellow-600' : 'text-gray-800';
  return (
    <div className='p-4 bg-white rounded shadow'>
      <div className='text-sm text-gray-500'>{title}</div>
      <div className={`text-3xl font-bold mt-2 counter ${colorClass}`}>{display}</div>
    </div>
  );
}
