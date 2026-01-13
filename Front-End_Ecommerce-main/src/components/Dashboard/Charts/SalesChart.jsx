import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ period = '7d' }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, [period]);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/sales?period=${period}`);
      const data = await response.json();
      
      if (data.success) {
        const salesData = data.data.salesData || [];
        
        const chartData = {
          labels: salesData.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('vi-VN', { 
              month: 'short', 
              day: 'numeric' 
            });
          }),
          datasets: [
            {
              label: 'Số đơn hàng',
              data: salesData.map(item => item.orders_count),
              backgroundColor: 'rgba(34, 197, 94, 0.8)',
              borderColor: 'rgb(34, 197, 94)',
              borderWidth: 1,
            },
            {
              label: 'Doanh thu',
              data: salesData.map(item => item.total_revenue),
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1,
              yAxisID: 'y1',
            }
          ]
        };
        
        setChartData(chartData);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
      // Fallback mock data
      const mockData = {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Số đơn hàng',
            data: [12, 15, 18, 22, 19, 25, 28],
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderColor: 'rgb(34, 197, 94)',
            borderWidth: 1,
          },
          {
            label: 'Doanh thu',
            data: [12000000, 15000000, 18000000, 22000000, 19000000, 25000000, 28000000],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
            yAxisID: 'y1',
          }
        ]
      };
      setChartData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ bán hàng',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số đơn hàng'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)'
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              notation: 'compact'
            }).format(value);
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Bán hàng theo thời gian</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-full ${
              period === '7d' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => window.location.href = '?period=7d'}
          >
            7 ngày
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full ${
              period === '30d' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => window.location.href = '?period=30d'}
          >
            30 ngày
          </button>
        </div>
      </div>
      <div className="h-64">
        {chartData && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default SalesChart;

