import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-[660px] flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-[110px] font-semibold">404 Not Found</h2>
      <p className="text-gray-600 mb-[80px] mt-[40px]">
        Your visited page not found. You may go home page.
      </p>
      <Button  ><Link to="/">Back to home page</Link></Button>
    </div>
  );
}
