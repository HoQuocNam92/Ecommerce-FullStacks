import { Truck, Headphones, RotateCcw } from "lucide-react";

export default function AboutServices() {
  const services = [
    {
      icon: <Truck size={20} />,
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
    {
      icon: <Headphones size={20} />,
      title: "24/7 CUSTOMER SERVICE",
      desc: "Friendly 24/7 customer support",
    },
    {
      icon: <RotateCcw size={20} />,
      title: "MONEY BACK GUARANTEE",
      desc: "We return money within 30 days",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pt-8 border-t">
      {services.map((s, idx) => (
        <div key={idx} className="flex flex-col items-center space-y-3">
          <div className="bg-black text-white p-3 rounded-full">{s.icon}</div>
          <h5 className="font-semibold">{s.title}</h5>
          <p className="text-sm text-gray-600">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
