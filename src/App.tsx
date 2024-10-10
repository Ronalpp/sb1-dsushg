import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './screens/Home';
import CalendarScreen from './screens/CalendarScreen';
import AddPaymentScreen from './screens/AddPaymentScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Payment } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const savedPayments = localStorage.getItem('payments');
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    }
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [payments, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addPayment = (payment: Payment) => {
    setPayments([...payments, payment]);
  };

  const markAsPaid = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, paid: true } : payment
    ));
  };

  const postponePayment = (id: string) => {
    setPayments(payments.map(payment => {
      if (payment.id === id) {
        const newDueDate = new Date(payment.dueDate);
        newDueDate.setMonth(newDueDate.getMonth() + 1);
        return { ...payment, dueDate: newDueDate.toISOString().split('T')[0] };
      }
      return payment;
    }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Toaster position="top-right" />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home payments={payments} markAsPaid={markAsPaid} postponePayment={postponePayment} darkMode={darkMode} />} />
          <Route path="/calendar" element={<CalendarScreen payments={payments} markAsPaid={markAsPaid} postponePayment={postponePayment} darkMode={darkMode} />} />
          <Route path="/add" element={<AddPaymentScreen addPayment={addPayment} darkMode={darkMode} />} />
          <Route path="/settings" element={<SettingsScreen darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;