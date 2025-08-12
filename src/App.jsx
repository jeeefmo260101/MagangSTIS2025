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

    // Fetch pertama
    fetchData();

    // Polling setiap 5 detik
    const interval = setInterval(fetchData, 5000);

    // Cleanup interval saat komponen unmount
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data.summary, null, 2)}</pre>
    </div>
  );
}

export default App;
