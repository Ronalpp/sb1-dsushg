import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Payment } from '../types';
import toast from 'react-hot-toast';

interface PaymentFormProps {
  addPayment: (payment: Payment) => void;
  darkMode: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ addPayment, darkMode }) => {
  const { register, handleSubmit, reset } = useForm<Omit<Payment, 'id' | 'paid'>>();

  const onSubmit = (data: Omit<Payment, 'id' | 'paid'>) => {
    const newPayment: Payment = {
      ...data,
      id: uuidv4(),
      paid: false,
    };
    addPayment(newPayment);
    toast.success('Payment added successfully!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`mb-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Payment</h2>
      <div className="mb-4">
        <label htmlFor="name" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment Name</label>
        <input
          {...register('name', { required: true })}
          type="text"
          id="name"
          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</label>
        <input
          {...register('amount', { required: true, type: 'number' })}
          type="number"
          id="amount"
          step="0.01"
          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Due Date</label>
        <input
          {...register('dueDate', { required: true })}
          type="date"
          id="dueDate"
          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
        <select
          {...register('category', { required: true })}
          id="category"
          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
        >
          <option value="bills">Bills</option>
          <option value="rent">Rent</option>
          <option value="subscription">Subscription</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className={`w-full p-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      >
        Add Payment
      </button>
    </form>
  );
};

export default PaymentForm;