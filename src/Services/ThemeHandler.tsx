import { LucideProps } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  iconSize?: LucideProps['size'];
  className?: string;
}

const ThemeHandler = (props: Props) => {
  // State for the theme
  const [theme, setTheme] = useState<string>(() => {
    // Check if theme is stored in local storage
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light'; // Use stored theme if available, otherwise use "light"
  });

  useEffect(() => {
    // Update the classList of document.documentElement based on the theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store the theme in local storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Set the icon based on the theme
  // const Icon = () => {
  //   if (theme === 'light') {
  //     return <Moon size={props.iconSize} />;
  //   } else {
  //     return <Sun size={props.iconSize} />;
  //   }
  // };

  return (
    <div className={props.className}>
      {/* <Button
        variant='outline'
        size='icon'
        className='w-full h-full bg-transparent border-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-700 hover:text-white'
        onClick={toggleTheme}> */}
      {/* <div
          className={`transition-opacity duration-300 ${
            theme === 'dark' ? 'opacity-0' : 'opacity-100'
          }`}>
          <Moon size={props.iconSize} />
        </div>
        <div
          className={`transition-opacity duration-300 ${
            theme === 'light' ? 'opacity-0' : 'opacity-100'
          }`}>
          <Sun size={props.iconSize} />
        </div> */}

      {/* </Button> */}
      <div className='toggleWrapper'>
        <input
          type='checkbox'
          className='dn'
          id='dn'
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <label
          htmlFor='dn'
          className='toggle'>
          <span className='toggle__handler'>
            <span className='crater crater--1'></span>
            <span className='crater crater--2'></span>
            <span className='crater crater--3'></span>
          </span>
          <span className='star star--1'></span>
          <span className='star star--2'></span>
          <span className='star star--3'></span>
          <span className='star star--4'></span>
          <span className='star star--5'></span>
          <span className='star star--6'></span>
        </label>
      </div>
    </div>
  );
};

export default ThemeHandler;
