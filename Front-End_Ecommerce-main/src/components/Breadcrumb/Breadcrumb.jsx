import { Link } from "react-router-dom";

const Breadcrumb = ({ category_slug, category_id, name_category, name_product }) => {
  return (
    <div className="my-4 text-[16px] line-clamp-1">
      <span className="text-gray-500">
        <Link className="hover:underline" to="/">Trang chủ</Link> &nbsp;/&nbsp;
      </span>
      <span className="text-gray-500">
        <Link className="hover:underline" to="/products">Danh mục</Link>
      </span>

      <span className="text-gray-500">
        &nbsp;/&nbsp;
        <Link className={`${!name_product ? 'text-black cursor-default' : 'hover:underline'}`} to={`/products/${category_slug}/${category_id}`}>{name_category}</Link>
      </span>
      {name_product && (
        <span className="text-gray-500">
          &nbsp;/&nbsp;
          <span className="text-black ">{name_product}</span>
        </span>
      )}

    </div>
  );
};

export default Breadcrumb;
