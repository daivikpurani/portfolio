import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaPalette } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="theme-toggle-container">
      <motion.button
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          className="theme-icon"
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </motion.div>
        <span className="theme-label">
          {isDark ? 'Light' : 'Dark'} Mode
        </span>
      </motion.button>
      
      <div className="theme-customizer">
        <FaPalette className="palette-icon" />
        <div className="color-options">
          {[
            { name: 'blue', color: '#2563eb' },
            { name: 'purple', color: '#7c3aed' },
            { name: 'green', color: '#059669' },
            { name: 'red', color: '#dc2626' },
            { name: 'orange', color: '#ea580c' },
            { name: 'pink', color: '#db2777' }
          ].map((option) => (
            <motion.button
              key={option.name}
              className="color-option"
              style={{ backgroundColor: option.color }}
              onClick={() => {
                document.documentElement.style.setProperty('--primary-color', option.color);
                localStorage.setItem('portfolio-primary-color', option.color);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Change theme to ${option.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
