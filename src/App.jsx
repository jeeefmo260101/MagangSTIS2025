import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch("https://script.google.com/macros/s/AKfycbxIZeNMeD4-603yM_HnvcSRyx9ZExQ1egSGIxZWSBC0zlX6m1KS31R5NL7WE1jMRbN9gQ/exec")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData(); // load pertama
    const interval = setInterval(fetchData, 5000); // update setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {data ? (
        <>
          <h1>Jumlah Peserta: {data.summary.jumlahPeserta}</h1>
          <h2>Tugas Selesai: {data.summary.tugasSelesai}</h2>
          <h2>Tugas Berjalan: {data.summary.tugasBerjalan}</h2>
          <h2>Pendamping: {data.summary.jumlahPendamping}</h2>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
