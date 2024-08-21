import React, { useState, useEffect } from "react";

const FraudStats = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/stats/fraud")
      .then((res) => res.json())
      .then((stats) => setStats(stats))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Fraud Statistics</h1>
      {stats.length > 0 ? (
        <FraudDashboard data={stats} />
      ) : (
        <p>No statistics available</p>
      )}
    </div>
  );
};

export default FraudStats;


import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const FraudDashboard = ({ data }) => {
  // Prepare data for Bar Chart
  const chartData = data.map(item => ({
    category: item._id === 1 ? 'Fraudulent Transactions' : 'Non-Fraudulent Transactions',
    totalFraud: item.totalFraud,
    totalNonFraud: item.totalNonFraud,
  }));

  return (
    <div>
      <h2>Fraud Dashboard</h2>

      {/* Total Amount vs. Total Fraud and Non-Fraud Transactions (Bar Chart) */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="category"
            label={{ value: 'Category', position: 'insideBottom', offset: -5 }}
            tick={{ angle: 0, textAnchor: 'middle' }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalFraud" fill="#ff7300" name="Total Fraud Transactions" />
          <Bar dataKey="totalNonFraud" fill="#82ca9d" name="Total Non-Fraud Transactions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

