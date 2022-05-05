import React, { useState } from 'react';
import './App.scss';
import { NavLink, Link } from 'react-router-dom';
import { Routes, Route, } from 'react-router';
import {ReactComponent as AdressIcon} from './Assets/Images/adress.svg'
import {ReactComponent as Customer} from "./Assets/Images/customer.svg";
import {ReactComponent as Order} from "./Assets/Images/home.svg";
import {ReactComponent as Logo} from "./Assets/Images/logo.svg";
import {ReactComponent as Product} from "./Assets/Images/product.svg";
import {ReactComponent as Profile} from "./Assets/Images/profile.svg";
import {ReactComponent as Search} from "./Assets/Images/search.svg";
import {ReactComponent as Techno} from "./Assets/Images/techno.svg";
import {ReactComponent as Toifa} from "./Assets/Images/toifa.svg";
import { ReactComponent as Bed } from "./Assets/Images/bed.svg";
import arrow from "./Assets/Images/arrow.svg";
//pages
import { Model } from './Pages/Models';
import { Home } from './Pages/Home';
import { Notfound } from './Pages/Notfound';
import { Products } from './Pages/Product';
import { Technologies } from './Pages/Technologies';
import { Adress } from './Pages/Adress';
function App() {
  const [open, setopen] = useState<boolean>(false)
  const handletoggle = () => setopen(!open);
  const url =new window.URLSearchParams();
  console.log(url.entries);
  // const token = window.localStorage.getItem('token');
  // if (!token) {
  //   window.location.assign("https://matras1.netlify.app/login");
  // }
  return (
    <div className={`app ${open ? "" : " app__menu"}`}>
      <div className="app__navbar">
        <ul className="app__list">
          <li className="app__item">
            <Link to="/home" className="app__link">
              {open ? <Logo /> : <Bed />}{" "}
            </Link>
          </li>
          <li className="app__item">
            <NavLink to="/" className="app__link">
              <span className="app__icon">
                <Order />
              </span>{" "}
              Buyurtmalar
            </NavLink>
          </li>
          <li className="app__item">
            <NavLink to="/customer" className="app__link">
              <span className="app__icon">
                <Customer />
              </span>{" "}
              Customer
            </NavLink>
          </li>
          <li className="app__item">
            <NavLink to="/model" className="app__link">
              <span className="app__icon">
                <Toifa />
              </span>
              Toifalar
            </NavLink>
          </li>
          <li className="app__item">
            <NavLink to="product" className="app__link">
              <span className="app__icon">
                <Product />
              </span>
              Mahsulotlar
            </NavLink>
          </li>
          <li className="app__item">
            <NavLink to="/technology" className="app__link">
              <span className="app__icon">
                <Techno />
              </span>
              Texnologiyalar
            </NavLink>
          </li>
          <li className="app__item">
            <NavLink to="/adress" className="app__link">
              <span className="app__icon">
                <AdressIcon />
              </span>
              Manzil
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="app__content">
        <div className="app__header">
          <span
            className={`app__toggle ${open ? "" : "app__toggle--close"}`}
            onClick={handletoggle}
          >
            <img
              width={30}
              height={30}
              src={arrow}
              alt=""
              className="app__arrow"
            />
          </span>
          <form className="app__form">
            <input
              type="text"
              id="search"
              className="app__input"
              placeholder="User"
            />
            <button className="app__btn">
              <Search />
            </button>
          </form>
          <div className="app__profile">
            <span className="app__profile--img">
              <Profile />
            </span>
            John Doe
          </div>
        </div>
        <div className="app__body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/model" element={<Model />} />
            <Route path="/*" element={<Notfound />} />
            <Route path="/product/" element={<Products />} />
            <Route path="/technology/" element={<Technologies />} />
            <Route path="/adress" element={<Adress/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
