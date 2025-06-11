import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navlink = ({ to, children }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block py-2 px-3 md:p-0 rounded ${
        isActive
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:bg-blue-600 md:dark:bg-transparent'
          : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};

export default Navlink;
