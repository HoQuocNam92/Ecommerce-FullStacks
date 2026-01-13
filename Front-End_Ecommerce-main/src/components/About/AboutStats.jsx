import { ShoppingBag, BarChart, Users, DollarSign } from "lucide-react";

export default function AboutStats() {
  const stats = [
    {
      icon: <ShoppingBag size={28} />,
      value: "10.5k",
      label: "Sellers active on our site",
      highlight: false,
    },
    {
      icon: <BarChart size={28} />,
      value: "33k",
      label: "Monthly Product Sale",
      highlight: true,
    },
    {
      icon: <Users size={28} />,
      value: "45.5k",
      label: "Customer active in our site",
      highlight: false,
    },
    {
      icon: <DollarSign size={28} />,
      value: "25k",
      label: "Annual gross sale in our site",
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-lg border shadow-sm flex flex-col items-center ${stat.highlight ? "bg-red-700 text-white" : "bg-white"
            }`}
        >
          <div
            className={`mb-3 ${stat.highlight ? "text-white" : "text-red-700"}`}
          >
            {stat.icon}
          </div>
          <h3 className="text-xl font-bold">{stat.value}</h3>
          <p className="text-sm text-center">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
