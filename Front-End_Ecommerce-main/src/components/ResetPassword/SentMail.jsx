import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordSuccess = ({ email }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-10">
            <Mail className="w-12 h-12 text-green-600" />
            <h2 className="text-xl font-semibold">Check your email</h2>
            <p className="text-gray-600 max-w-sm">
                We’ve sent a password reset link to <span className="font-medium">{email}</span>.
                Please check your inbox and follow the instructions to reset your password.
            </p>

            <div className="flex flex-col gap-2 w-full max-w-xs">
                <Button onClick={() => navigate("/signin")} className="bg-black hover:bg-black/80 text-white">
                    Back to Login
                </Button>
                <Button variant="outline" onClick={() => window.open("https://mail.google.com", "_blank")}>
                    Open Gmail
                </Button>
            </div>
        </div>
    );
};

export default ForgotPasswordSuccess;
