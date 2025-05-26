// import Navbar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AdminSalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('weekly');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true); // Reset loading state on timeRange change
      try {
        const response = await fetch(`/admin/sales?range=${timeRange}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setSalesData(data);

        // Process data for chart
        let processed;
        if (timeRange === 'weekly' || timeRange === 'monthly') {
          processed = data.map(item => ({
            name: item.period,
            sales: item.totalSales,
            products: item.totalProductsSold
          }));
        } else {
          processed = data.map(item => ({
            name: item.year || item.period,
            sales: item.totalSales || 0,
            products: item.totalProductsSold || 0
          }));
        }
        setChartData(processed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) return <div>Loading sales data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sales-report">
      <h2>Sales Reports</h2>

      <div className="report-controls">
        <label>Time Range:</label>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annual">Annual</option>
        </select>
      </div>

      <div className="sales-summary">
        <div className="summary-card">
          <h3>Total Sales</h3>
          <p className="amount">
            {formatCurrency(salesData.reduce((sum, item) => sum + item.totalSales, 0))}
          </p>
        </div>
        <div className="summary-card">
          <h3>Products Sold</h3>
          <p className="amount">
            {salesData.reduce((sum, item) => sum + item.totalProductsSold, 0)}
          </p>
        </div>
        <div className="summary-card">
          <h3>Completed Orders</h3>
          <p className="amount">
            {salesData.reduce((sum, item) => sum + item.totalOrders, 0)}
          </p>
        </div>
      </div>

      <div className="sales-chart">
        <h3>{timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Sales</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name) =>
              name === 'Sales Amount' ? formatCurrency(value) : value
            } />
            <Legend />
            <Bar dataKey="sales" name="Sales Amount" fill="#4CAF50" />
            {timeRange !== 'annual' && (
              <Bar dataKey="products" name="Products Sold" fill="#82ca9d" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="sales-table">
        <h3>Detailed Sales Data</h3>
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Total Sales</th>
              <th>Products Sold</th>
              <th>Completed Orders</th>
              <th>Top Product</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item) => (
              <tr key={item.period}>
                <td>{item.period /* or capitalize if needed: item.period.charAt(0).toUpperCase() + item.period.slice(1) */}</td>
                <td>{formatCurrency(item.totalSales)}</td>
                <td>{item.totalProductsSold}</td>
                <td>{item.totalOrders}</td>
                <td>{item.topProduct || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalesReport;
