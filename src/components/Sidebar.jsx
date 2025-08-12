import React from 'react';
export default function Sidebar({sheets, selected, onSelect}){
  return (
    <aside className='w-72 bg-gray-800 text-gray-200 flex flex-col'>
      <div className='p-6 border-b border-gray-700'>
        <h2 className='text-lg font-semibold'>Dashboard Magang STIS 2025</h2>
        <div className='text-sm mt-1'>BPS Provinsi Sumatera Utara</div>
      </div>
      <nav className='flex-1 overflow-auto p-4 space-y-2'>
        <button onClick={()=>onSelect(Object.keys(sheets||[])[0])} className={`w-full text-left px-4 py-2 rounded ${selected ? '' : 'bg-blue-600 text-white'}`}>Dasbor Utama</button>
        {sheets && sheets.length>0 ? sheets.map((s,i)=>(
          <button key={i} onClick={()=>onSelect(s)} className={`w-full text-left px-4 py-2 rounded ${selected===s ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}>
            {s}
          </button>
        )) : <div className='text-sm text-gray-400'>Tidak ada sheet</div>}
      </nav>
      <div className='p-4 border-t border-gray-700 text-xs leading-tight'>
        <div>@2025 Tim Pengembangan Kompetensi dan Hukum</div>
        <div>BPS Provinsi Sumatera Utara</div>
      </div>
    </aside>
  );
}
