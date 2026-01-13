import React from "react";
import { Link } from "react-router";
import { useCart } from "@/hooks/useCart";
import NavLinks from "./NavLinks";
import AccountDropdown from "./AccountDropdown ";
import { useAuthStore } from "@/store/useAuthStore";
import ProductSearch from "../Search/ProductSearch";
const Header = () => {
  const { cart } = useCart();
  const account = useAuthStore((state) => state.user);
  return (
    <div className="bg-white">
      <div div className="container-fluid bg-black text-white h-[48px] flex justify-center items-center text-[14px] border-2 border-black border-solid" >
        Giảm giá mùa hè cho tất cả đồ bơi và giao hàng nhanh miễn phí - GIẢM 50%!
        <span className="ms-2 font-bold">ShopNow</span>
      </div >

      <div className="border-b-[1px] border-b-[#ccc] border-solid py-4 ">
        <div className="container flex justify-between items-center">
          <div className="font-poppins font-bold text-2xl">
            <Link to="/">Exclusive</Link>
          </div>
          <div className="flex justify-center">
            <NavLinks />

          </div>

          <ProductSearch />


          <Link to="/wishlist" >
            <svg
              className="mx-4"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link to="/cart" className="position relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 5H7L10 22H26"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="position -top-2 -right-4 absolute text-white bg-red-800 w-6 h-6 flex justify-center fa-align-center rounded-full">
              {cart.length}
            </div>
          </Link>
          <div className="flex me-2 cursor-pointer">
            {account && Object.keys(account).length > 0 && (
              <AccountDropdown />
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Header;
