import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <NavLink to='/'>Return to the homepage</NavLink>
      </p>
    </div>
  );
};

export default ErrorPage;
