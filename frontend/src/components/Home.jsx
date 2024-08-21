import React from "react";
import AgeStats from "./AgeStats";
import GenderStats from "./GenderStats";
import AmountStats from "./AmountStats";
import FraudStats from "./FraudStats";

// import CategoryStats from "./CategoryStats";
// import MerchantStats from "./MerchantStats";

const Home = () => {
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
