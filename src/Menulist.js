import React, { useState } from "react";
import { IMG_CLOUD_LINK } from "./config";
import "./Menulist.css";
export default function Menulist(props) {
  const [toggleAdd, setToggleAdd] = useState(true);
  const [itemCount, setItemCount] = useState(0);

  function setToggle(e) {
    console.log("toggle");
    setToggleAdd(false);
    setItemCount(itemCount + 1);
  }
  function addItem(operation) {
    if (operation == "add") {
      setItemCount(itemCount + 1);
    } else {
      setItemCount(itemCount - 1);
      if (itemCount < 1) {
        setToggleAdd(true);
        setItemCount(0);
      }
    }
  }
  return (
    <div className="menu-card-list">
      <div className="menu-list">
        <ul>
          {props.list.map((item) => (
            <li>{item.name}</li>
          ))}
        </ul>
      </div>
      <div className="menu-item">
        {props.list.map((item) => (
          <>
            <h2>{item.name}</h2>
            {item.entities.map((entity) => (
              <div className="item" key={entity.id}>
                <div className="menu-details">
                  <h2>{props.menuData[entity.id].name}</h2>
                  <h4> {props.menuData[entity.id].price}</h4>
                  <h5>{props.menuData[entity.id].description}</h5>
                </div>
                <div className="add-cart">
                  <img
                    src={
                      IMG_CLOUD_LINK +
                      props.menuData[entity.id].cloudinaryImageId
                    }
                  />
                  {toggleAdd ? (
                    <button className="add-button" onClick={() => setToggle()}>
                      Add
                    </button>
                  ) : (
                    <div className="add-button-div">
                      <button onClick={() => addItem("minus")}>-</button>
                      <p>{itemCount}</p>
                      <button onClick={() => addItem("add")}>+</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
      <div className="cart"></div>
    </div>
  );
}
