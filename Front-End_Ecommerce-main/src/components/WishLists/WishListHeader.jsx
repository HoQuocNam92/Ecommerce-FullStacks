import React from 'react'
import { Heart } from "lucide-react"

const WishListHeader = () => {
    return (
        <div className="mb-6 flex items-center gap-2">
            <Heart className="text-red-500" />
            <h1 className="text-2xl font-semibold">Wishlist</h1>
        </div>
    )
}

export default WishListHeader