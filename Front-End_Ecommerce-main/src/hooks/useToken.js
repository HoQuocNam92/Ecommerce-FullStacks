import { useEffect, useState } from "react";

const useToken = () => {
    const [token, setTokenNew] = useState(null);

    const token_local = JSON.parse(localStorage.getItem("account")) || {};




    const removeToken = () => {
        localStorage.removeItem("account");
    }
    const setToken = (data) => {
        localStorage.setItem("account", JSON.stringify(data));
    }

    useEffect(() => {
        if (Object.keys(token_local).length > 0) {
            setTokenNew(token_local)
        }

    }, [])

    return { token, removeToken, setToken }
}
export default useToken