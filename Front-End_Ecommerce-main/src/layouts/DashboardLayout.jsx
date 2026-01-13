import React from 'react'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import Header from '@/components/Dashboard/Header/Header'
import { Outlet } from 'react-router-dom'
import withAuth from '@/hoc/withAuth'


const DashboardLayout = () => {
    return (

        <div className="flex  bg-gray-50">
            <Sidebar />

            <div className="ml-[255px] flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="m-2 overflow-y-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

const ProtectedDashboardLayout = withAuth(DashboardLayout);
export default ProtectedDashboardLayout;




