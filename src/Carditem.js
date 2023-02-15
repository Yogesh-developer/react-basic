import React from "react";
import "./Carditem.css";
import { IMG_CLOUD_LINK } from "./config";
const Carditem = ({ id, cloudinaryImageId, slugs, name }) => {
  return (
    <div key={id} className="food-card">
      <img src={IMG_CLOUD_LINK + cloudinaryImageId} alt="Image" />
      <h3>{name}</h3>
      <p>{slugs.city}</p>
    </div>
  );
};

export default Carditem;
