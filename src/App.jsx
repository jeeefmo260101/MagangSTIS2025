
import React, {useEffect, useState, useMemo} from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import SheetTable from './components/SheetTable';
import TasksChart from './components/TasksChart';

const API_URL = "https://script.google.com/macros/s/AKfycbyftMUemEWWzu2e1Z1tSJxXClAE7hw59nXSbpjFip96b9NTj1tKgibjFidXedXDx-WlNA/exec";

export default function App() {
  const [data, setData] = useState({} );
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted = true;
    async function load(){
      setLoading(true);
      try{
        const res = await fetch(API_URL, {cache:'no-store'});
        if(!res.ok) throw new Error('HTTP '+res.status);
        const json = await res.json();
        const payload = (json && json.status==='success') ? json.data : json;
        if(mounted){ setData(payload || {}); const keys = Object.keys(payload||{}); setSelected(keys[0]||null); }
      }catch(err){ console.error(err); if(mounted) setError(String(err)); }finally{ if(mounted) setLoading(false); }
    }
    load();
    return ()=> mounted=false;
  },[]);

  const sheetNames = useMemo(()=> Object.keys(data||{}), [data]);

  const totalPeserta = (data['Daftar Peserta']||[]).length || 'N/A';
  const tugas = data['Pembagian Tugas'] || [];
  const cntSelesai = tugas.filter(t => String(Object.values(t).join(' ').toLowerCase()).includes('selesai')).length;
  const cntBerjalan = tugas.filter(t => String(Object.values(t).join(' ').toLowerCase()).includes('berjalan') || String(Object.values(t).join(' ').toLowerCase()).includes('ongoing')).length;
  const totalPendamping = (data['Daftar Pendamping']||[]).length || 'N/A';

  return (
    <div className='min-h-screen flex'>
      <Sidebar sheets={sheetNames} selected={selected} onSelect={setSelected} />
      <main className='flex-1 p-6'>
        <header className='mb-6'>
          <h1 className='text-2xl font-bold'>Dashboard Magang STIS 2025 - BPS Provinsi Sumatera Utara</h1>
        </header>

        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          <StatCard title='Total Peserta' value={totalPeserta} />
          <StatCard title='Tugas Selesai' value={cntSelesai} color='green' />
          <StatCard title='Tugas Berjalan' value={cntBerjalan} color='yellow' />
          <StatCard title='Jumlah Pendamping' value={totalPendamping} />
        </section>

        <section className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
          <div className='lg:col-span-2 bg-white p-4 rounded shadow'>
            {loading ? <div className='h-40 skeleton rounded'/> : selected ? <SheetTable data={data[selected]||[]} title={selected} /> : <div>Tidak ada sheet</div>}
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <h3 className='font-semibold mb-3'>Visualisasi Tugas</h3>
            <TasksChart selesai={cntSelesai} berjalan={cntBerjalan} total={tugas.length} loading={loading} />
          </div>
        </section>

        <section>
          <div className='text-sm text-gray-500'>Data otomatis diambil dari Google Sheets</div>
        </section>
      </main>
    </div>
  );
}
