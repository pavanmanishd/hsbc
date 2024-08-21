import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 10);
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    step: "",
    customer: "",
    ageRange: [0, 100],
    gender: "",
    zipcodeOri: "",
    merchant: "",
    zipMerchant: "",
    category: "",
    amountRange: [0, 10000],
    fraud: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    axios
      .post(
        `http://localhost:5000/api/transactions/filter?page=${page}&limit=${limit}`,
        filters,
        { headers: { "x-auth-token": token } }
      )
      .then((res) => {
        setTransactions(res.data.data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError("An error occurred while fetching transactions.");
        setLoading(false);
      });
  }, [page, limit, token, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    const range = value.split(",").map(Number);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: range,
    }));
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setSearchParams({ page: page - 1, limit });
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    setSearchParams({ page: page + 1, limit });
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setSearchParams({ page, limit: newLimit });
  };

  return (
    <div>
      <h1>Transactions</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        <h2>Filters</h2>
        <label>
          Step:
          <input
            type="text"
            name="step"
            value={filters.step}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Customer:
          <input
            type="text"
            name="customer"
            value={filters.customer}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Age Range:
          <input
            type="text"
            name="ageRange"
            value={filters.ageRange.join(",")}
            onChange={handleRangeChange}
            placeholder="min,max"
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          ZipCodeOri:
          <input
            type="text"
            name="zipcodeOri"
            value={filters.zipcodeOri}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Merchant:
          <input
            type="text"
            name="merchant"
            value={filters.merchant}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          ZipMerchant:
          <input
            type="text"
            name="zipMerchant"
            value={filters.zipMerchant}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Amount Range:
          <input
            type="text"
            name="amountRange"
            value={filters.amountRange.join(",")}
            onChange={handleRangeChange}
            placeholder="min,max"
          />
        </label>
        <label>
          Fraud:
          <input
            type="text"
            name="fraud"
            value={filters.fraud}
            onChange={handleFilterChange}
          />
        </label>
      </div>

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
        <tbody>
          {!loading && (
            <>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.step}</td>
                    <td>{transaction.customer}</td>
                    <td>{transaction.age}</td>
                    <td>{transaction.gender}</td>
                    <td>{transaction.zipcodeOri}</td>
                    <td>{transaction.merchant}</td>
                    <td>{transaction.zipMerchant}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.fraud ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No transactions found.</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrev} disabled={page <= 1}>
          Prev
        </button>
        <p>
          Limit:
          <input
            type="number"
            value={limit}
            onChange={handleLimitChange}
            min="1"
          />
        </p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Transactions;
