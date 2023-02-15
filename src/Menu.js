import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_ID_API } from "./config";
import "./Menu.css";
import Menulist from "./Menulist";
import Menushimmer from "./shimmerui/Menushimmer";

export default function Menu() {
  const [menuData, setMenuData] = useState({});
  const [menu, setMenu] = useState([]);
  const [selectList, selSeloectList] = useState([]);
  const { id } = useParams();
  async function getMenuList() {
    const result = await fetch(MENU_ID_API + id);
    const data = await result.json();
    setMenu(data.data.menu.items);
    selSeloectList(data.data.menu.widgets);
    setMenuData(data.data);
  }
  useEffect(() => {
    getMenuList();
  }, []);
  return Object.keys(menuData).length === 0 ? (
    <Menushimmer />
  ) : (
    <>
      <div className="menu-carasol">
        <img
          src={
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
            menuData.cloudinaryImageId
          }
          alt="Food Card"
        />
        <div className="details">
          <h2>{menuData?.name}</h2>
          <p>{menuData?.cuisines?.join()}</p>
          <p>{menuData?.city}</p>
          <ul>
            <li>
              {menuData?.avgRating}
              <p>{menuData?.totalRatingsString}</p>
            </li>
            <li>
              Delivery time<p>35+ min</p>
            </li>
            <li>
              {"\u20B9"}
              {menuData?.costForTwo} <p>cost for two</p>
            </li>
          </ul>
        </div>
        <div className="offer">
          <div>
            <h2>Offer</h2>
            <p>{menuData?.aggregatedDiscountInfo?.descriptionList[0]?.meta}</p>
            <p>{menuData?.aggregatedDiscountInfo?.descriptionList[1]?.meta}</p>
          </div>
        </div>
      </div>
      <Menulist menuData={menu} list={selectList} />
    </>
  );
}
