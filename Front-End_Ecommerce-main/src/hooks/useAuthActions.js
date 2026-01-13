import { loginSchema, signupSchema } from "@/schema/authSchemas";
import { useAuthStore } from "@/store/useAuthStore";
export default function useAuthActions() {
    const login = useAuthStore((state) => state.login);
    const signup = useAuthStore((state) => state.signup);
    const logout = useAuthStore((state) => state.logout);
    const resetPassword = useAuthStore((state) => state.resetPassword);
    const validatedLogin = async (email, password) => {
        const payload = await loginSchema.validate({ email, password });
        return login(payload);
    };

    const validatedSignup = async (email, name, password) => {
        const payload = await signupSchema.validate({ email, name, password });
        return signup(payload);
    };

    return { validatedLogin, validatedSignup, logout, resetPassword };
}
