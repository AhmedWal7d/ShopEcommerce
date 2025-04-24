'use client';

import { Provider } from "react-redux";
import { store } from "./lib/store";
import Navbar from "./__AllCommponent/Navbar/Navbar";
import Footer from "./__AllCommponent/Footer/Footer";
import { ToastContainer } from "react-toastify";
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <ToastContainer position="top-right" />
      <Footer />
    </Provider>
  );
}
