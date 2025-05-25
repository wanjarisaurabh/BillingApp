import './index.css'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.jsx';
import { AppContextProvider } from './context/AppContext.jsx';


createRoot(document.getElementById('root')).render(

    <BrowserRouter>

        <AppContextProvider>


            <App />


        </AppContextProvider>

    </BrowserRouter>
);



