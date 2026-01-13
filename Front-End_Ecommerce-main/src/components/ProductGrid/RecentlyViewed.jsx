import { Link } from "react-router-dom";

const RecentlyViewed = () => {
    let items = [];
    items = JSON.parse(localStorage.getItem('recently_viewed')) || [];

    if (items.length === 0) return null;

    return (
        // <section className="container-fluid pt-6 pb-8">
        //     <h3 className="text-lg font-semibold mb-3">Đã xem gần đây</h3>
        //     <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        //         {items.map((p) => (
        //             <Link key={p?.id} to={`/product/${p?.slug}`} state={{ product: p }} className="border rounded p-3 bg-white hover:shadow">
        //                 <img src={p?.gallery[0]?.url} alt={p?.name} className="h-28 object-contain mx-auto" />
        //                 <div className="mt-2 text-sm line-clamp-2 min-h-8">{p?.name_product}</div>
        //             </Link>
        //         ))}
        //     </div>
        // </section>
        null
    );
};

export default RecentlyViewed;




