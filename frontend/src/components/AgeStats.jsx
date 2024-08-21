import React, { useState, useEffect } from "react";

const AgeStats = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/stats/age")
      .then((res) => res.json())
      .then((stats) => setStats(stats))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Age Statistics</h1>
      {stats.length > 0 ? 
      <>
        <AgeDataDashboard data={stats} />
      </>
    : <p>No statistics available</p>}
    </div>
  );
};

export default AgeStats;

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AgeDataDashboard = ({ data }) => {
  // Filter out entries where _id is not present
  const filteredData = data.filter(item => item._id);

  // Data for Pie Chart (Fraud vs Non-Fraud)
  const pieData = filteredData.map(item => ({
    _id: item._id,
    name: `Age ${item._id}`,
    fraud: item.totalFraud,
    nonFraud: item.totalNonFraud,
  }));

  return (
    <div>
      <h2>Age Data Dashboard</h2>

      {/* Total Amount vs. Total Transactions (Bar Chart) */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={filteredData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="_id"
            label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#8884d8" name="Total Amount" />
          <Bar dataKey="totalTransactions" fill="#82ca9d" name="Total Transactions" />
        </BarChart>
      </ResponsiveContainer>

      {/* Average Amount (Line Chart) */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={filteredData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="_id"
            label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="averageAmount" stroke="#ff7300" name="Average Amount" />
        </LineChart>
      </ResponsiveContainer>

      {/* Fraud vs. Non-Fraud (Pie Chart) */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="fraud"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={pieData}
            dataKey="nonFraud"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            fill="#82ca9d"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

