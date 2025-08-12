import { useState, useEffect } from "react";
import "./App.css"; // kalau mau styling tambahan

export default function App() {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [showNotif, setShowNotif] = useState(false);

  // URL JSON Google Sheet (pastikan publik)
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1Z3Cx8hJdhY7CEd_xT7kSCXZu1MbwsqJGigGRMuPRuvw/gviz/tq?tqx=out:json";

  const fetchData = async () => {
    try {
      const res = await fetch(SHEET_URL + "&cacheBuster=" + Date.now()); // cegah cache
      const text = await res.text();

      // Parsing format JSON dari Google Sheet
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const headers = json.table.cols.map((col) => col.label);
      const rows = json.table.rows.map((row) =>
        row.c.map((cell) => (cell ? cell.v : ""))
      );

      setData([headers, ...rows]);
      setLastUpdate(new Date());
      triggerNotif();
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const triggerNotif = () => {
  alert("Notifikasi berhasil dipicu!");
};
