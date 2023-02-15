import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./src/About";
import Contact from "./src/Contact";
import Home from "./src/Home";
import Error from "./src/Error";
import Navbar from "./src/Navbar";
import Menu from "./src/Menu";
const Applayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const Approuter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/menu/:id",
        element: <Menu />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Approuter} />);
