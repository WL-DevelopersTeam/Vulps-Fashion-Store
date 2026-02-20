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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ padding: "20px", color: "black" }}
    >
      <h2>Return Requests</h2>

      {returns.length === 0 ? (
        <p>No return requests</p>
      ) : (
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            color: "black"
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>Order ID</th>
              <th style={cellStyle}>Refund Method</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Requested At</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r, index) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td style={cellStyle}>{r.order?.id}</td>
                <td style={cellStyle}>{r.refundMethod}</td>
                <td style={cellStyle}>{r.status}</td>
                <td style={cellStyle}>
                  {new Date(r.requestedAt).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </motion.div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px"
};