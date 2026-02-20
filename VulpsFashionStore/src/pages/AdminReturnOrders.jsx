import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/admin/returns/${id}/approve`);
      fetchReturns();
    } catch (err) {
      console.error("Failed to approve return", err);
    }
  };

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h2>Return Requests</h2>

      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor: "white",
          color: "black"
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Order ID</th>
            <th style={cellStyle}>Refund Method</th>
            <th style={cellStyle}>UPI ID</th>
            <th style={cellStyle}>Account Name</th>
            <th style={cellStyle}>Account Number</th>
            <th style={cellStyle}>IFSC Code</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Requested At</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {returns.map((r, index) => (
            <motion.tr
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.01 }}
            >
              <td style={cellStyle}>{r.order?.id}</td>
              <td style={cellStyle}>{r.refundMethod}</td>
              <td style={cellStyle}>{r.upiId || "-"}</td>
              <td style={cellStyle}>{r.accountName || "-"}</td>
              <td style={cellStyle}>{r.accountNumber || "-"}</td>
              <td style={cellStyle}>{r.ifscCode || "-"}</td>

              <td style={cellStyle}>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    backgroundColor:
                      r.status === "RETURNED" ? "#28a745" : "#ffc107",
                    color: "white"
                  }}
                >
                  {r.status}
                </span>
              </td>

              <td style={cellStyle}>
                {new Date(r.requestedAt).toLocaleString()}
              </td>

              <td style={cellStyle}>
                {r.status !== "RETURNED" && (
                  <button
                    onClick={() => handleApprove(r.id)}
                    style={buttonStyle}
                  >
                    Mark as Returned
                  </button>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center"
};

const buttonStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer"
};