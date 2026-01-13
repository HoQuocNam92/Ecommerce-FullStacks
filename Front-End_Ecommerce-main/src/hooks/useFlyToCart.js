import { useState } from "react";

export default function useFlyToCart() {
    const [flyItem, setFlyItem] = useState(null);

    const flyToCart = (imgSrc, start, end) => {
        const id = Date.now()
        setFlyItem({ id, imgSrc, start, end })
        setTimeout(() => {
            setFlyItem(null)
        }, 1000)
    }
    return { flyItem, flyToCart }
}