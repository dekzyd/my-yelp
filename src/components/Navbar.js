import React from "react";
import brand from "../images/brand.png";

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <img
              src={brand}
              style={{
                width: "100px",
                height: "40px",
                marginTop: "0px",
                paddingTop: "0px",
              }}
              className="nav-logo"
              alt="my yelp logo"
            />
          </div>

          <h2>My Yelp</h2>

          <ul className="nav-icons">
            <li>
              <button className="btn btn-outline-dark" onClick={props.signout}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
