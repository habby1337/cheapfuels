import ThemeHandler from '@/Services/ThemeHandler';
import { LucideFuel } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface ActiveClassesProps {
  isActive: boolean;
}

const NavBar = () => {
  const ActiveClasses = ({ isActive }: ActiveClassesProps) => {
    return isActive
      ? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
      : 'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
  };
  return (
    <nav className='mb-5 border-gray-200 bg-slate-200 dark:bg-gray-900'>
      <div className='flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto'>
        <a
          href='/'
          className='flex items-center'>
          <span className='mr-3 '>
            <LucideFuel />
          </span>
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Cheap Fuels
          </span>
        </a>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'>
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className='hidden w-full md:block md:w-auto'
          id='navbar-default'>
          <ul className='flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:items-center md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <NavLink
                to='/'
                className={ActiveClasses}
                aria-current='page'>
                Fuels Map
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/myCars'}
                className={ActiveClasses}>
                Your Cars
              </NavLink>
            </li>
            <li>
              <NavLink
                to='https://tensi.dev'
                target='_blank'
                className={ActiveClasses}>
                //Dev
              </NavLink>
            </li>

            <li>
              <ThemeHandler iconSize={20} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
