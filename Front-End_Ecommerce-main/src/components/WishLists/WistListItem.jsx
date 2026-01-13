import React from 'react'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import ToUnitMoney from '@/utils/ToUnitMoney'

const WistListItem = ({ item, deleteWishList, handleAddCart }) => {
    return (
        <Card key={item.id} className="hover:shadow-lg transition">
            <CardContent className="p-4">
                <Link to={`/product/${item.slug}`}>
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-40 w-full rounded-md object-cover"
                    />

                    <div className="mt-3 space-y-1">
                        <h3 className="font-medium line-clamp-2 h-[48px]">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            {ToUnitMoney(item.price)}
                        </p>
                    </div></Link>

                <div className="mt-4 flex gap-2">
                    <Button onClick={() => handleAddCart({ quantity: 1, product_id: item.id })} className="flex-1">Mua ngay</Button>
                    <Button onClick={() => deleteWishList({ product_id: item.id })} className='cursor-pointer' variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default WistListItem