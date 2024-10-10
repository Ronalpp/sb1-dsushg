import React from 'react';
import { Sun, Moon, Info } from 'lucide-react';

interface SettingsScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {darkMode ? <Moon size={24} className="mr-2" /> : <Sun size={24} className="mr-2" />}
            <span className="text-lg">Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-14 h-8 flex items-center rounded-full p-1 ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-6' : ''}`} />
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Info size={24} className="mr-2" />
            About
          </h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Payment Calendar App v1.0.0
            <br />
            Created by Your Name
            <br />
            © 2023 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;