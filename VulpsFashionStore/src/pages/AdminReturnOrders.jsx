import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const res = await api.get("/api/admin/returns");
      setReturns(res.data);
    } catch (err) {
      console.error("Failed to fetch returns", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={spinnerContainer}>
        <div style={spinner}></div>
        <p>Loading return requests...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: "20px", color: "black" }}
    >
      <h2>Return Requests</h2>

      <motion.table
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
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
            <th style={cellStyle}>Requested At</th>
          </tr>
        </thead>

        <tbody>
          {returns.map((r, index) => (
            <motion.tr
              key={r.id}
              initial={{ opacity: 0, y: 15 }}
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
                {new Date(r.requestedAt).toLocaleString()}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center"
};

/* Spinner Styles */
const spinnerContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
  color: "black"
};

const spinner = {
  width: "50px",
  height: "50px",
  border: "6px solid #ddd",
  borderTop: "6px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};