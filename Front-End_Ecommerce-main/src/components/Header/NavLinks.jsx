import { Link } from "react-router";
const NavLinks = () => {
  return (
    <ul className="flex">
      <li>
        <Link className="block font-[500] py-2 mx-[20px]" to="/">
          Trang chủ
        </Link>
      </li>
      <li>
        <Link className="block font-[500] py-2 mx-[20px]" to="/contact">
          Liên hệ
        </Link>
      </li>
      <li>
        <Link className="block font-[500] py-2 mx-[20px]" to="/About">
          Giới thiệu
        </Link>
      </li>

      <li>
        <Link className="block font-[500] py-2 mx-[20px]" to="/auth/signup">
          Đăng ký
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
