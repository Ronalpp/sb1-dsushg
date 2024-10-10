import React from 'react';
import Calendar from '../components/Calendar';
import { Payment } from '../types';

interface CalendarScreenProps {
  payments: Payment[];
  markAsPaid: (id: string) => void;
  postponePayment: (id: string) => void;
  darkMode: boolean;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ payments, markAsPaid, postponePayment, darkMode }) => {
  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Payment Calendar</h2>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg shadow-lg">
        <div className={`bg-${darkMode ? 'gray-800' : 'white'} rounded-lg p-4`}>
          <Calendar payments={payments} markAsPaid={markAsPaid} postponePayment={postponePayment} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default CalendarScreen;