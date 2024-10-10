import React from 'react';
import PaymentForm from '../components/PaymentForm';
import { Payment } from '../types';

interface AddPaymentScreenProps {
  addPayment: (payment: Payment) => void;
  darkMode: boolean;
}

const AddPaymentScreen: React.FC<AddPaymentScreenProps> = ({ addPayment, darkMode }) => {
  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
      <h2 className="text-3xl font-bold mb-6">Add New Payment</h2>
      <PaymentForm addPayment={addPayment} darkMode={darkMode} />
    </div>
  );
};

export default AddPaymentScreen;