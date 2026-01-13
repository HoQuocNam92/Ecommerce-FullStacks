import React, { useState } from 'react';
import OrderManagement from '@/components/Order/OrderManagement';
import { useOrders } from '@/hooks/useOrders';
import Spiner from '@/components/Spiner/Spiner';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { GetOrders } = useOrders();
  const tabs = [
    { id: 'all', label: 'Tất cả đơn hàng' },
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'confirmed', label: 'Đã xác nhận' },
    { id: 'shipped', label: 'Đang giao hàng' },
    { id: 'delivered', label: 'Đã giao hàng' },
    { id: 'cancelled', label: 'Đã hủy' }
  ];

  return (
    <div className='container '>
      {GetOrders.isLoading ? (
        <div>
          <Spiner />
        </div>
      )
        :
        (
          <>

            <div className="bg-white border-b border-gray-200 shadow-sm rounded-1xl " >
              <div className="  m-2 ">
                <div className="flex space-x-8  ">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div >

            <div className="my-2" >
              <OrderManagement Orders={GetOrders?.data} />
            </div >
          </>
        )
      }

    </div>


  );
};

export default Orders;
