import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-black ">
      <div className=" ">
        <div className="text-white pt-[80px] px-[135px] flex justify-between  mb-[26px]">
          <div className="w-[206px]">
            <h3 className="text-2xl font-inter mb-6 font-bold">Exclusive</h3>
            <p>
              Đăng ký nhận bản tin
            </p>
          </div>
          <div className="w-[175px]">
            <h3 className="text-[20px] font-inter mb-6">Hỗ trợ</h3>
            <p>Tân Phú , Hồ Chí Minh </p>
            <p className="my-4">hoquocnam92@gmail.com</p>
            <p className="my-4">038-790-1461</p>
          </div>
          <div className="w-[123px]">
            <h3 className="text-[20px] font-inter mb-6">Tài khoản </h3>
            <p>
              <Link to="/user/profile">Tài khoản của tôi</Link>
            </p>
            <p className="my-4">
              <Link to="/signin">
                Đăng nhập</Link>
            </p>
            <p className="my-4">
              <Link to="/register">Đăng ký</Link>
            </p>
            <p className="my-4">Cửa hàng</p>
          </div>
          <div className="w-[150px]">
            <h3 className=" text-[20px] font-inter mb-6">Liên kết nhanh</h3>
            <p>Chính sách bảo mật</p>
            <p className="my-4">Điều khoản sử dụng</p>
            <p className="my-4">FAQ</p>
            <p className="my-4">
              <Link to="/contact">
                Liên hệ
              </Link>
            </p>
          </div>
          <div className="w-[200px]">
            <h3 className="text-[20px]  font-inter mb-6">Tải ứng dụng</h3>
            <p className="my-4">Tiết kiệm $3 cho người dùng mới của ứng dụng</p>
            <div className="flex gap-2">
              <div className="w-[50%] border-1 border-amber-50 border-solid">
                <img
                  className="w-[100%] h-[90px] object-cover"
                  src="/images/qr-dowload.jpg"
                  alt=""
                />
              </div>
              <div className="w-[50%] flex flex-col justify-between overflow-hidden ">
                <div className="border-1 overflow-hidden border-amber-50 border-solid rounded-[4px] ">
                  <img
                    className="block h-[32px] w-auto"
                    src="/images/ch-play.png"
                    alt=""
                  />
                </div>
                <div className="border-1 overflow-hidden border-amber-50 border-solid rounded-[4px] ">
                  <img
                    className="block h-[32px] w-auto"
                    src="/images/app-store.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="mt-[28px] flex justify-between items-center">
              <i className="fa-brands text-2xl fa-facebook"></i>
              <i className="fa-brands text-2xl fa-twitter"></i>
              <i className="fa-brands text-2xl fa-instagram"></i>
              <i className="fa-brands text-2xl fa-linkedin"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="border-1 border-[#2e2e2e] border-solid"></div>
      <div className="flex justify-center text-white font-[400] opacity-[0.4] pb-2 mt-[16px] ">
        <svg
          className="me-2"
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="20"
          viewBox="0 0 19 20"
          fill="none"
        >
          <path
            d="M9.50002 18.3332C14.1024 18.3332 17.8334 14.6022 17.8334 9.99984C17.8334 5.39746 14.1024 1.6665 9.50002 1.6665C4.89765 1.6665 1.16669 5.39746 1.16669 9.99984C1.16669 14.6022 4.89765 18.3332 9.50002 18.3332Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.14799C12 8.14799 10.9706 6.6665 9.25492 6.6665C7.53924 6.6665 6.16669 8.14799 6.16669 9.99984C6.16669 11.8517 7.53924 13.3332 9.25492 13.3332C10.9706 13.3332 12 11.8517 12 11.8517"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Copyright QuocNam 2025. All right reserved
      </div>
    </div>
  );
};

export default Footer;
