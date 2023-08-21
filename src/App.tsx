import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/routes/Home";
import MyCars from "./Components/routes/MyCars";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

import useSetupIndexedDB from "./Components/hooks/useSetupIndexedDB";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useSetupIndexedDB();

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route
          path="/mycars"
          element={<MyCars />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/mycars/:id"
          element={<MyCars />}
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme='dark'
        toastClassName="dark:bg-slate-700 dark:text-white"
      />
    </BrowserRouter>
  );
};

export default App;
