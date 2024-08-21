import React, { useState, useEffect } from "react";

const AmountStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch("https://hsbc-server.onrender.com/api/stats/amount")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStats(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Amount Statistics</h1>
      {stats.length > 0 ? (
        <AmountDashboard data={stats} />
      ) : (
        <p>No statistics available</p>
      )}
    </div>
  );
};

export default AmountStats;

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AmountDashboard = ({ data }) => {
  // Prepare data for Bar Chart
  const chartData = data.map(item => ({
    amountRange: `${item.amountRange.start} - ${item.amountRange.end}`,
    totalTransactions: item.totalTransactions,
  }));

  return (
    <div>
      <h2>Amount Dashboard</h2>

      {/* Total Transactions (Bar Chart) */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="amountRange"
            label={{ value: 'Amount Range', position: 'insideBottom', offset: -10 }}
            tick={{ angle: -45, textAnchor: 'end' }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalTransactions" fill="#82ca9d" name="Total Transactions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

