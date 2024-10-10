import React from 'react';
import { Link } from 'react-router-dom';
import { Payment } from '../types';
import { Calendar, Plus, DollarSign } from 'lucide-react';

interface HomeProps {
  payments: Payment[];
  markAsPaid: (id: string) => void;
  postponePayment: (id: string) => void;
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ payments, markAsPaid, postponePayment, darkMode }) => {
  const totalDue = payments.reduce((sum, payment) => sum + (payment.paid ? 0 : parseFloat(payment.amount)), 0);
  const upcomingPayments = payments.filter(payment => !payment.paid && new Date(payment.dueDate) > new Date()).slice(0, 5);

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
      <h2 className="text-3xl font-bold mb-6">Payment Overview</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Total Due</h3>
        <p className="text-4xl font-bold text-red-500">${totalDue.toFixed(2)}</p>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upcoming Payments</h3>
        <ul className="space-y-4">
          {upcomingPayments.map(payment => (
            <li key={payment.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-lg">{payment.name}</span>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Due: {new Date(payment.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${payment.amount}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => markAsPaid(payment.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
                    >
                      Mark Paid
                    </button>
                    <button
                      onClick={() => postponePayment(payment.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm hover:bg-yellow-600 transition-colors"
                    >
                      Postpone
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <Link to="/calendar" className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
          <Calendar size={20} className="mr-2" />
          View Calendar
        </Link>
        <Link to="/add" className={`flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}>
          <Plus size={20} className="mr-2" />
          Add Payment
        </Link>
      </div>
    </div>
  );
};

export default Home;