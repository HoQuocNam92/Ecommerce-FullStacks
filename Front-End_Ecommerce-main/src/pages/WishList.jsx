import React from "react"
import WishListEmpty from "@/components/WishLists/WishListEmpty"
import WishListHeader from "@/components/WishLists/WishListHeader"
import WistListItem from "@/components/WishLists/WistListItem"

import useWishList from "@/hooks/useWishList"
import { Spinner } from "@/components/ui/spinner"
import { useAuthStore } from "@/store/useAuthStore"
import { toast } from "sonner"
import toastConfirm from "@/utils/toastConfirm"
import { useCart } from "@/hooks/useCart"

const Wishlist = () => {
    const { handleAddCart } = useCart();
    const { wishlist, loading, error, deleteWishList, isDeleting } = useWishList();
    if (loading) return <Spinner />

    const handleDeleteWishList = async (data) => {
        try {
            toastConfirm("", "danh sách yêu thích", data, deleteWishList)
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="p-6 container">
            {error && <div className="text-red-300"> {error}</div>}
            <WishListHeader />

            {wishlist.length === 0 && (
                <WishListEmpty />
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishlist.map((item) => (
                    <WistListItem isDeleting={isDeleting} deleteWishList={handleDeleteWishList} handleAddCart={handleAddCart} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Wishlist
