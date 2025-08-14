"use client";
import { useState } from "react";

type PairDetail = { barcode: string; pairs: number };

export default function InventoryPairs() {
  const [barcodes, setBarcodes] = useState<number[]>([]);
  const [result, setResult] = useState<{ totalPairs: number; details: PairDetail[] }>({ totalPairs: 0, details: [] });

  // Fungsi untuk generate barcode random
  const generateBarcodes = () => {
    const newBarcodes = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 41) + 10 // angka antara 10–50
    );
    setBarcodes(newBarcodes);
    calculatePairs(newBarcodes);
  };

  // Fungsi menghitung pairs
  const calculatePairs = (arr: number[]) => {
    const counts: { [barcode: number]: number } = {};
    arr.forEach((barcode) => {
      counts[barcode] = (counts[barcode] || 0) + 1;
    });

    let total = 0;
    const details = [];

    for (const [barcode, count] of Object.entries(counts)) {
      const pairs = Math.floor(count / 2);
      if (pairs > 0) {
        details.push({ barcode, pairs });
        total += pairs;
      }
    }

    setResult({ totalPairs: total, details });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Inventory Matching</h1>
      <button onClick={generateBarcodes} style={{ padding: "8px 12px" }}>
        Generate Random Barcodes
      </button>

      {barcodes.length > 0 && (
        <>
          <h3 style={{ marginTop: "20px" }}>
            Barcodes: {barcodes.join(", ")}
          </h3>
          <h3>Total Pairs: {result.totalPairs}</h3>
          <ul>
            {result.details.map((item, index) => (
              <li key={index}>
                Barcode {item.barcode} → {item.pairs} pasangan
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
