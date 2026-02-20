import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const res = await api.get("/api/admin/returns");
      setReturns(res.data);
    } catch (err) {
      console.error("Failed to fetch returns", err);
    }
  };

  // 🔹 Split data
  const upiReturns = returns.filter(
    (r) => r.refundMethod?.toLowerCase() === "upi"
  );

  const bankReturns = returns.filter(
    (r) => r.refundMethod?.toLowerCase() === "bank"
  );

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h2>Return Requests</h2>

      {/* ================= UPI SECTION ================= */}
      <h3 style={{ marginTop: "30px" }}>UPI Refund Requests</h3>
      {upiReturns.length === 0 ? (
        <p>No UPI return requests</p>
      ) : (
        <Table data={upiReturns} showBank={false} />
      )}

      {/* ================= BANK SECTION ================= */}
      <h3 style={{ marginTop: "40px" }}>Bank Refund Requests</h3>
      {bankReturns.length === 0 ? (
        <p>No Bank return requests</p>
      ) : (
        <Table data={bankReturns} showBank={true} />
      )}
    </div>
  );
}

/* ---------- Reusable Table Component ---------- */
function Table({ data, showBank }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
        backgroundColor: "white",
        color: "black"
      }}
    >
      <thead>
        <tr>
          <th style={cellStyle}>Order ID</th>
          <th style={cellStyle}>Refund Method</th>

          {!showBank && <th style={cellStyle}>UPI ID</th>}

          {showBank && (
            <>
              <th style={cellStyle}>Account Name</th>
              <th style={cellStyle}>Account Number</th>
              <th style={cellStyle}>IFSC</th>
            </>
          )}

          <th style={cellStyle}>Status</th>
          <th style={cellStyle}>Requested At</th>
        </tr>
      </thead>

      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            <td style={cellStyle}>{r.order?.id}</td>
            <td style={cellStyle}>{r.refundMethod}</td>

            {!showBank && <td style={cellStyle}>{r.upiId}</td>}

            {showBank && (
              <>
                <td style={cellStyle}>{r.accountName}</td>
                <td style={cellStyle}>{r.accountNumber}</td>
                <td style={cellStyle}>{r.ifscCode}</td>
              </>
            )}

            <td style={cellStyle}>{r.status}</td>
            <td style={cellStyle}>
              {new Date(r.requestedAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px"
};