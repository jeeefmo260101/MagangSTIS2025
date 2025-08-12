import React, {useState, useMemo} from 'react';
export default function SheetTable({data, title}){
  const [q,setQ] = useState('');
  const keys = data[0] ? Object.keys(data[0]) : [];
  const filtered = useMemo(()=>{
    const qq = q.trim().toLowerCase();
    if(!qq) return data;
    return data.filter(r => Object.values(r).some(v => String(v||'').toLowerCase().includes(qq)));
  },[q,data]);
  return (
    <div>
      <div className='flex items-center justify-between mb-3'>
        <div>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <div className='text-sm text-gray-500'>{filtered.length} item</div>
        </div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Cari...' className='p-2 border rounded w-full max-w-md' />
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white rounded'>
          <thead className='bg-gray-50'>
            <tr>
              {keys.map((k,i)=>(<th key={i} className='px-4 py-2 text-left text-sm text-gray-600'>{k}</th>))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row,idx)=>(
              <tr key={idx} className={idx%2?'bg-gray-50':''}>
                {keys.map((k,j)=>(<td key={j} className='px-4 py-3 align-top'>{String(row[k] ?? '')}</td>))}
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={keys.length||1} className='p-4 text-gray-500'>Tidak ada data</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
