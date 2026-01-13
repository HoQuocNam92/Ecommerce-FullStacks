import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = ({ period = '7d' }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, [period]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/revenue?period=${period}`);
      const data = await response.json();
      
      if (data.success) {
        const revenueData = data.data.revenueData || [];
        
        const chartData = {
          labels: revenueData.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('vi-VN', { 
              month: 'short', 
              day: 'numeric' 
            });
          }),
          datasets: [
            {
              label: 'Doanh thu',
              data: revenueData.map(item => item.revenue),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
            }
          ]
        };
        
        setChartData(chartData);
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      // Fallback mock data
      const mockData = {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Doanh thu',
            data: [12000000, 15000000, 18000000, 22000000, 19000000, 25000000, 28000000],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
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
        text: 'Biểu đồ doanh thu',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
        <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo thời gian</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-full ${
              period === '7d' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => window.location.href = '?period=7d'}
          >
            7 ngày
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full ${
              period === '30d' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => window.location.href = '?period=30d'}
          >
            30 ngày
          </button>
        </div>
      </div>
      <div className="h-64">
        {chartData && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default RevenueChart;

