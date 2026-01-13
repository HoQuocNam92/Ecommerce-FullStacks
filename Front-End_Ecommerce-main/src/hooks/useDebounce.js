import { useEffect, useState } from "react";

const useDeBounce = (query, delay = 300) => {
    const [debounce, setDebounce] = useState(query);
    useEffect(() => {
        const TimeOutID = setTimeout(() => {
            setDebounce(query);
        }, delay);

        return () => clearTimeout(TimeOutID);
    }, [query, delay]);

    return debounce;
};

export default useDeBounce;
