import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbxIZeNMeD4-603yM_HnvcSRyx9ZExQ1egSGIxZWSBC0zlX6m1KS31R5NL7WE1jMRbN9gQ/exec?t=${Date.now()}`
      );
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    fetchData(); // pertama kali ambil data
    const interval = setInterval(fetchData, 2000); // polling tiap 2 detik
    return () => clearInterval(interval); // bersihkan interval saat komponen di-unmount
  }, []);

  if (loading) return <p>Memuat data...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard Magang</h1>

      <h2>Summary</h2>
      <ul>
        <li>Jumlah Peserta: {data.summary.jumlahPeserta}</li>
        <li>Tugas Selesai: {data.summary.tugasSelesai}</li>
        <li>Tugas Berjalan: {data.summary.tugasBerjalan}</li>
        <li>Jumlah Pendamping: {data.summary.jumlahPendamping}</li>
      </ul>

      <h2>Daftar Peserta</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {Object.keys(data.peserta[0] || {}).map((head, i) => (
              <th key={i}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.peserta.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{String(val)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
