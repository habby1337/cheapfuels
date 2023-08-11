import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { LucideFuel } from 'lucide-react';
import ThemeHandler from '../../Services/ThemeHandler';

interface ActiveClassesProps {
  isActive: boolean;
}

const ActiveClasses = ({ isActive }: ActiveClassesProps) => {
  const base = ' flex items-center px-2 py-2 text-base font-medium rounded-md';
  return isActive
    ? 'block py-2 pl-3 pr-4 bg-indigo-600 text-white  dark:text-white rounded-md ' +
        base
    : 'block py-2 pl-3 pr-4 hover:text-indigo-600' + base;
};
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='mb-5 bg-gray-200 border-gray-200 dark:text-white dark:bg-gray-900 text-slate-600'>
      <div className='px-4 mx-auto max-w-7xl'>
        <div className='flex items-center justify-between py-4 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <NavLink
              to='/'
              className='flex items-center'>
              <LucideFuel className='w-6 h-6 mr-2' />
              Cheap Fuels
            </NavLink>
          </div>
          <div className='-my-2 -mr-2 md:hidden'>
            <button
              onClick={toggleMobileMenu}
              type='button'
              className='inline-flex items-center justify-center p-2 text-gray-400 bg-gray-200 border-gray-400 rounded-md dark:bg-gray-900 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
              <span className='sr-only'>Open menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className='w-6 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='w-6 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
          <div className='items-center hidden space-x-6 md:flex place-content-evenly'>
            <NavLink
              to='/'
              className={ActiveClasses}
              aria-current='page'>
              Fuels Map
            </NavLink>
            <NavLink
              to='/myCars'
              className={ActiveClasses}>
              Your Cars
            </NavLink>
            <NavLink
              to='https://tensi.dev'
              target='_blank'
              className={ActiveClasses}
              rel='noopener noreferrer'>
              <span className='font-mono'>//Dev</span>
            </NavLink>
            <ThemeHandler
              iconSize={20}
              className='w-[70px] h-[30px] items-baseline '
            />
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className='mt-2 space-x-2 md:hidden'>
          <div className='items-start pb-4 '>
            <NavLink
              to='/'
              className={ActiveClasses}>
              Fuels Map
            </NavLink>
            <NavLink
              to='/myCars'
              className={ActiveClasses}>
              Your Cars
            </NavLink>

            <div className='flex items-center justify-between mt-2 '>
              <NavLink
                to='https://tensi.dev'
                target='_blank'
                rel='noopener noreferrer'
                className={ActiveClasses}>
                <span className='font-mono'>//Dev</span>
              </NavLink>
              <ThemeHandler
                iconSize={20}
                className='w-[70px] h-[30px]'
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
