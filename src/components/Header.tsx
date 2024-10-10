import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Calendar, Settings } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`py-4 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Calendar size={24} className={`mr-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment Calendar</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/settings" className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
            <Settings size={20} />
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-900'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;