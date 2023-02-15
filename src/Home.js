import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carditem from "./Carditem";
import { API_LINK } from "./config";
import "./Home.css";
import Simmer from "./Simmer";

export default function Home() {
  const [allResturantData, setAllRestarunatData] = useState([]);
  async function getResturantData() {
    const response = await fetch(API_LINK);
    const result = await response.json();
    console.log(result?.data?.cards[2]?.data?.data?.cards);
    setAllRestarunatData(result?.data?.cards[2]?.data?.data?.cards);
  }
  useEffect(() => {
    getResturantData();
  }, []);
  return allResturantData?.length === 0 ? (
    <Simmer />
  ) : (
    <div className="card">
      {allResturantData.map((resturant) => (
        <Link to={"/menu/" + resturant.data.id}>
          <Carditem {...resturant.data} key={resturant.data.id} />
        </Link>
      ))}
    </div>
  );
}
