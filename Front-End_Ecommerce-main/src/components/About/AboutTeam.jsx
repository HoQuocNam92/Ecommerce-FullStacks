import { Instagram, Twitter, Linkedin } from "lucide-react";

const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    img: "/images/image 46.png",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    img: "/images/image 51.png",
  },
  { name: "Will Smith", role: "Product Designer", img: "/images/image 47.png" },
];

export default function AboutTeam() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {team.map((member, idx) => (
        <div key={idx} className="rounded-lg shadow hover:shadow-lg transition">
          <div className="w-[370px] flex justify-center items-center h-[430px] bg-[#F5F5F5]">
            <img
              src={member.img}
              alt={member.name}
              className="   object-contain rounded"
            />
          </div>
          <h4 className="font-semibold mt-4">{member.name}</h4>
          <p className="text-sm text-gray-600">{member.role}</p>
          <div className="flex justify-center space-x-3 text-gray-500 mt-3">
            <Twitter size={18} className="cursor-pointer hover:text-blue-400" />
            <Instagram
              size={18}
              className="cursor-pointer hover:text-pink-500"
            />
            <Linkedin
              size={18}
              className="cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
