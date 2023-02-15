import React from "react";
import "./Simmer.css";
const Simmer = () => {
  return (
    <div className="card">
      {Array(8)
        .fill("")
        .map((e, index) => (
          <div key={index} className="shimmer-card">
            <img />
            <h3></h3>
            <p></p>
          </div>
        ))}
    </div>
  );
};

export default Simmer;
