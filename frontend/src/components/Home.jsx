import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgeStats from "./AgeStats";
import GenderStats from "./GenderStats";
import AmountStats from "./AmountStats";
import FraudStats from "./FraudStats";

// import CategoryStats from "./CategoryStats";
// import MerchantStats from "./MerchantStats";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <AgeStats />
        <GenderStats />
        <AmountStats />
        <FraudStats />
        {/* <CategoryStats /> */}
        {/* <MerchantStats /> */}
      </div>
    </div>
  );
};

export default Home;
