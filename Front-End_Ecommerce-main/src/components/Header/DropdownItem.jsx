

const DropdownItem = ({ title, onClick }) => (
  <div
    onClick={onClick}
    className="flex-1 px-3 py-2 flex items-center  hover:bg-red-400/30 transition cursor-pointer"
  >
    <h4 className="text-white text-[14px] pl-1 w-full">{title}</h4>
  </div>
);
export default DropdownItem;
