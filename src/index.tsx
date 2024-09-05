import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.tsx';
import React from 'react';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <React.StrictMode>
         <Provider store={store}>
            <BrowserRouter>
               <HelmetProvider>
                  <App />
               </HelmetProvider>
            </BrowserRouter>
         </Provider>
      </React.StrictMode>
   </GoogleOAuthProvider>
);
