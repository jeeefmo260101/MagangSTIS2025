import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://script.google.com/macros/s/AKfycbxIZeNMeD4-603yM_HnvcSRyx9ZExQ1egSGIxZWSBC0zlX6m1KS31R5NL7WE1jMRbN9gQ/exec")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error("Error fetching data:", err));
    };

    fetchData(); // Fetch awal
    const interval = setInterval(fetchData, 5000); // Fetch tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Magang</h1>
      <h3>Ringkasan</h3>
      <pre>{JSON.stringify(data.summary, null, 2)}</pre>
    </div>
  );
}

export default App;
