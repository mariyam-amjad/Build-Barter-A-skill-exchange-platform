import React from 'react';
import bulb from '../../assets/logo.png'

function Footer() {
  return (
    <footer className="select-none bg-slate-200 rounded-lg shadow dark:bg-gray-900 m-4 dark:border-gray-700 relative bottom-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={bulb} className="h-8" alt="SkillSwap Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Build&Barter</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="https://github.com/mariyam-amjad" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="https://github.com/mariyam-amjad" className="hover:underline me-4 md:me-6">Github</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Feeback</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Made with ❤️</span>
      </div>
    </footer>
  );
}

export default Footer;
