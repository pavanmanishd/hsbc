import React, { useState,useEffect } from "react";

const Transactions = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/transactions/filter?page=${page}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
            setTransactions(data);
        });
    }
    , [page, limit]);

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
    <div>
      <h1>Transactions</h1>
      <table>
        <thead>
            <tr>
                <th>Step</th>
                <th>Customer</th>
                <th>Age</th>
                <th>Gender</th>
                <th>ZipCodeOri</th>
                <th>Merchant</th>
                <th>ZipMerchant</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Fraud</th>
            </tr>
        </thead>
        
      </table>
      <div>
        {page > 1 && <button onClick={handlePrev}>Prev</button>}
        <p>Limit : <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} /></p>
        {transactions.length > 0 && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
};

export default Transactions;
