import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/routes/Home';
import MyCars from './Components/routes/MyCars';
import ErrorPage from './Components/ErrorPage/ErrorPage';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
          errorElement={<ErrorPage />}
        />
        <Route
          path='/mycars'
          element={<MyCars />}
          errorElement={<ErrorPage />}
        />
        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
