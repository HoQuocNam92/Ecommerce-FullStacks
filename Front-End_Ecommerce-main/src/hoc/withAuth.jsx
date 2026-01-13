import NotFound from "@/components/Error/NotFound";
import { useAuthStore } from "@/store/useAuthStore";
// eslint-disable-next-line no-unused-vars
const withAuth = (WrappedComponent) => {
    return function AuthComponent(props) {
        const user = useAuthStore((state) => state.user);
        if (!user) {
            window.location.href = '/signin';
            return null;
        }
        if (user && user.role !== 'admin') {
            return <NotFound />
        }
        return <WrappedComponent {...props} />
    };
};
export default withAuth;