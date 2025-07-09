import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carditem from "./Carditem";
import { API_LINK } from "./config";
import "./Home.css";
import Simmer from "./Simmer";

export default function Home() {
  const [allRestaurantData, setAllRestaurantData] = useState([]);

  async function getResturantData() {
    try {
      setAllRestaurantData(API_LINK);
    } catch (error) {
      console.error("Failed to fetch restaurant data:", error);
    }
  }

  useEffect(() => {
    getResturantData();
  }, []);
  return allRestaurantData?.length === 0 ? (
    <Simmer />
  ) : (
    <div className="card">
      {allRestaurantData.map((resturant) => (
        <Link to={"/menu/" + resturant.id}>
          <Carditem {...resturant} key={resturant.id} />
          <div>My name is yogesh</div>
        </Link>
      ))}
    </div>
  );
}
