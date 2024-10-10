import React from 'react';
import { Payment } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DashboardProps {
  payments: Payment[];
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ payments, darkMode }) => {
  const totalDue = payments.reduce((sum, payment) => sum + (payment.paid ? 0 : parseFloat(payment.amount)), 0);
  const upcomingPayments = payments.filter(payment => !payment.paid && new Date(payment.dueDate) > new Date()).slice(0, 5);

  const categoryData = payments.reduce((acc, payment) => {
    if (!payment.paid) {
      acc[payment.category] = (acc[payment.category] || 0) + parseFloat(payment.amount);
    }
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white shadow text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Total Due</h3>
        <p className="text-3xl font-bold text-red-500">${totalDue.toFixed(2)}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Upcoming Payments</h3>
        <ul>
          {upcomingPayments.map(payment => (
            <li key={payment.id} className="mb-2">
              <span className="font-medium">{payment.name}</span> - ${payment.amount} (Due: {new Date(payment.dueDate).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment Categories</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;