import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/revenue?period=30d');
      const data = await response.json();
      
      if (data.success) {
        const categoryData = data.data.revenueByCategory || [];
        
        const colors = [
          '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
          '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
        ];
        
        const chartData = {
          labels: categoryData.map(item => item.category_name),
          datasets: [
            {
              data: categoryData.map(item => item.revenue),
              backgroundColor: colors.slice(0, categoryData.length),
              borderColor: colors.slice(0, categoryData.length),
              borderWidth: 2,
            }
          ]
        };
        
        setChartData(chartData);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
      // Fallback mock data
      const mockData = {
        labels: ['Điện thoại', 'Laptop', 'Thời trang', 'Sách', 'Phụ kiện'],
        datasets: [
          {
            data: [35000000, 28000000, 15000000, 8000000, 12000000],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
            borderColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
            borderWidth: 2,
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
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        text: 'Doanh thu theo danh mục',
      },
    },
    interaction: {
      intersect: false,
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
        <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo danh mục</h3>
      </div>
      <div className="h-64">
        {chartData && <Doughnut data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default CategoryChart;

