import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// React Query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

registerSW({
  onNeedRefresh() {
    console.log('New version available');
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});
