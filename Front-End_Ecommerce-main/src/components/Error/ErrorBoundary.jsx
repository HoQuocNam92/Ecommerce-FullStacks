import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "@/components/Error/ErrorFallback";

export const AppErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary fallback={ErrorFallback}>
            {children}
        </ErrorBoundary>
    )
}