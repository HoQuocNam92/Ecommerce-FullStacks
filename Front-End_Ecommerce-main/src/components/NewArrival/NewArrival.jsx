import { Truck, Headphones, RotateCcw } from "lucide-react";

const newArrivalItems = [
  {
    title: "PlayStation 5",
    desc: "Black and White version of the PS5 coming out on sale.",
    image: "/images/box-game.png",
    large: true,
  },
  {
    title: "Women’s Collections",
    desc: "Featured woman collections that give you another vibe.",
    image: "/images/women.jpg",
  },
  {
    title: "Speakers",
    desc: "Amazon wireless speakers",
    image: "/images/speaker.png",
  },
  {
    title: "Perfume",
    desc: "GUCCI INTENSE OUD EDP",
    image: "/images/perfume.png",
  },
];

export default function NewArrival() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <p className="text-red-700 font-medium mb-1">Featured</p>
        <h2 className="text-3xl font-bold">New Arrival</h2>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="  relative bg-black rounded overflow-hidden group pt-[89px] flex justify-center">
          <img
            src={newArrivalItems[0].image}
            alt=""
            className="w-[511px] h-[511px]   "
          />
          <div className="absolute bottom-4 left-4 text-white space-y-1">
            <h3 className="text-xl font-semibold">
              {newArrivalItems[0].title}
            </h3>
            <p className="text-sm">{newArrivalItems[0].desc}</p>
            <button className="mt-2 underline text-sm">Shop Now</button>
          </div>
        </div>

        <div className="  flex flex-col justify-between gap-y-7">
          <div className="h-1/2  ">
            <div className="relative rounded overflow-hidden group h-full bg-[#0d0d0d]  ">
              <img
                src="/images/women.jpg"
                alt=""
                className="w-[432px] h-[286px] object-cover transform -scale-x-100 translate-x-30  "
              />
              <div className="absolute bottom-4 left-4 text-white space-y-1">
                <h3 className="text-lg font-semibold"> Women’s Collections</h3>
                <p className="text-sm">
                  Featured woman collections that give you another vibe.{" "}
                </p>
                <button className="mt-1 underline text-sm">Shop Now</button>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-7 h-1/2">
            {newArrivalItems.slice(2).map((item, i) => (
              <div
                key={i}
                className="relative rounded overflow-hidden group w-1/2 bg-black flex justify-center items-center"
              >
                <div className="">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 text-white space-y-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                  <button className="mt-1 underline text-sm">Shop Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-16">
        <div>
          <div className="bg-black text-white p-3 rounded-full inline-block">
            <Truck size={20} />
          </div>
          <h4 className="font-bold">FREE AND FAST DELIVERY</h4>
          <p className="text-sm text-gray-500">
            Free delivery for all orders over $140
          </p>
        </div>
        <div>
          <div className="bg-black text-white p-3 rounded-full inline-block">
            <Headphones size={20} />
          </div>

          <h4 className="font-bold">24/7 CUSTOMER SERVICE</h4>
          <p className="text-sm text-gray-500">
            Friendly 24/7 customer support
          </p>
        </div>
        <div>
          <div className="bg-black text-white p-3 rounded-full inline-block">
            <RotateCcw size={20} />
          </div>

          <h4 className="font-bold">MONEY BACK GUARANTEE</h4>
          <p className="text-sm text-gray-500">
            We return money within 30 days
          </p>
        </div>
      </div>
    </section>
  );
}
