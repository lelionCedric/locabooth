import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from "./shared/components/errorboundary/error-boundary.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {NotificationProvider} from "./shared/components/notification/notification.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
              <NotificationProvider>
                <App />
              </NotificationProvider>
          </ErrorBoundary>
      </QueryClientProvider>
  </StrictMode>,
)
