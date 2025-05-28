import Navbar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import './AdminSalesReport.css';
import Navbar from '../../components/NavBar';
import Layout from '../../components/Page_Paddings';

const AdminSalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('weekly');

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${api}/user-transaction/sales-report?range=${timeRange}`);
        if (!response.ok) throw new Error('Failed to fetch sales data');
        const data = await response.json();
        // Sort by period descending (latest first)
        const sorted = [...data].sort((a, b) => b.period.localeCompare(a.period));
        setSalesData(sorted);
      } catch (err) {
        setError(err.message);
        setSalesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSalesData();
  }, [timeRange]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

  return (
    <>
      <Navbar />
// <<<<<<< backendFixes-nevi
//       <div className="sales-report" style={{ padding: 24 }}>
//         <h2>Sales Reports</h2>
//         <div style={{ marginBottom: 16 }}>
//           <label>Time Range:&nbsp;</label>
//           <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//             <option value="annual">Annual</option>
//           </select>
//         </div>
//         {loading ? (
//           <p>Loading sales data...</p>
//         ) : error ? (
//           <p style={{ color: 'red' }}>Error: {error}</p>
//         ) : (
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Period</th>
//                 <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: 8 }}>Total Sales</th>
//                 <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: 8 }}>Products Sold</th>
//                 <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: 8 }}>Completed Orders</th>
//                 <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Top Product</th>
//               </tr>
//             </thead>
//             <tbody>
//               {salesData.map(item => (
//                 <tr key={item.period}>
//                   <td style={{ padding: 8 }}>{item.period}</td>
//                   <td style={{ padding: 8, textAlign: 'right' }}>{formatCurrency(item.totalSales)}</td>
//                   <td style={{ padding: 8, textAlign: 'right' }}>{item.totalProductsSold}</td>
//                   <td style={{ padding: 8, textAlign: 'right' }}>{item.totalOrders}</td>
//                   <td style={{ padding: 8 }}>{item.topProduct || 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
// =======
      <Layout>
        <div className="sales-report" style={{ padding: 24 }}>
          <h2>Sales Reports</h2>
          <div style={{ marginBottom: 16 }}>
            <label>Time Range:&nbsp;</label>
            <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          {loading ? (
            <p>Loading sales data...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Period</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: 8 }}>Total Sales</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: 8 }}>Products Sold</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: 8 }}>Completed Orders</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Top Product</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map(item => (
                  <tr key={item.period}>
                    <td style={{ padding: 8 }}>{item.period}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{formatCurrency(item.totalSales)}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{item.totalProductsSold}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{item.totalOrders}</td>
                    <td style={{ padding: 8 }}>{item.topProduct || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Layout>
// >>>>>>> main
    </>
  );
};

export default AdminSalesReport;
