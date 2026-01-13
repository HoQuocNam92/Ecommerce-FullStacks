import BannerList from '@/components/Dashboard/Banners/BannerList'
import React from 'react'
import useBanner from '@/hooks/useBanner'
const Banner = () => {
    const { createBanner, getAllBanner, deleteBanner, updateBanner } = useBanner();

    return (
        <div className='space-y-6 p-4  '>
            <BannerList createBanner={createBanner} banners={getAllBanner} updateBanner={updateBanner} deleteBanner={deleteBanner} />
        </div>
    )
}

export default Banner