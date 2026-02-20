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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Return Requests</h2>

      {returns.length === 0 ? (
        <p>No return requests</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Refund Method</th>
              <th>Status</th>
              <th>Requested At</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r) => (
              <tr key={r.id}>
                <td>{r.order?.id}</td>
                <td>{r.refundMethod}</td>
                <td>{r.status}</td>
                <td>{new Date(r.requestedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}