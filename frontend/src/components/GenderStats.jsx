import React, { useState, useEffect } from "react";

const GenderStats = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/stats/gender")
      .then((res) => res.json())
      .then((stats) => setStats(stats))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Gender Statistics</h1>
      {stats.length > 0 ? (
        <GenderDashboard data={stats} />
      ) : (
        <p>No statistics available</p>
      )}
    </div>
  );
};

export default GenderStats;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const GenderDashboard = ({ data }) => {
  // Prepare data for Pie Charts
  const pieData = data.map((item) => ({
    _id: item._id, // Store the _id for the label
    fraud: item.totalFraud,
    nonFraud: item.totalNonFraud,
  }));

  return (
    <div>
      <h2>Gender Dashboard</h2>

      {/* Total Amount vs. Total Transactions (Bar Chart) */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="_id"
            label={{ value: "Gender", position: "insideBottom", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#8884d8" name="Total Amount" />
          <Bar
            dataKey="totalTransactions"
            fill="#82ca9d"
            name="Total Transactions"
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Average Amount (Line Chart) */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="_id"
            label={{ value: "Gender", position: "insideBottom", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="averageAmount"
            stroke="#ff7300"
            name="Average Amount"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Fraud vs. Non-Fraud (Pie Charts) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {pieData.map((entry, index) => (
          <div key={index} style={{ textAlign: "center", margin: "0 10px" }}>
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Fraud", value: entry.fraud },
                    { name: "Non-Fraud", value: entry.nonFraud },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((_, pieIndex) => (
                    <Cell
                      key={`cell-${pieIndex}`}
                      fill={COLORS[pieIndex % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div>Gender : {entry._id}</div> {/* Display the _id below the Pie Chart */}
          </div>
        ))}
      </div>
    </div>
  );
};
