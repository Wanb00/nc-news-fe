import { useState } from "react";

const useLoadingError = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const startLoading = () => {
        setLoading(true);
        setError(null);
    };

    const handleError = (err) => {
        setLoading(false);
        const message = typeof err === "string" ? err 
        : err?.response?.data?.msg || err.message ||  "Something went wrong";
        setError(message);
    };

    const finishLoading = () => setLoading(false);

    return {loading, error, setError, startLoading, handleError, finishLoading };
}

export default useLoadingError;