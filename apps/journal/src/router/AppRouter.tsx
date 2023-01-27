import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getAnalytics, logEvent } from "firebase/analytics";

import { AuthRoutes } from '../auth';
import { CheckingAuth } from '../ui';
import { JournalRoutes } from '../journal';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  const location = useLocation();
  const analytics = getAnalytics();
  const status = useCheckAuth();

  useEffect(() => {
    const pageName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    logEvent(analytics, 'screen_view', {
      firebase_screen: `${pageName || undefined}Page`, 
      firebase_screen_class: `${pageName || undefined}Class`
    });
  }, [location])

  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>
        {
          (status === 'authenticated')
            ? <Route path="/journal/*" element={ <JournalRoutes />} />
            : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }
        {
          (status === 'authenticated')
            ? <Route path='/*' element={ <Navigate to="/journal" /> } />
            : <Route path='/*' element={ <Navigate to="/auth/login" /> } />
        }
    </Routes>
  )
}
