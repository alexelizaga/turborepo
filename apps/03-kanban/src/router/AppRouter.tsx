import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getAnalytics, logEvent } from "firebase/analytics";

import { AuthRoutes } from '../auth';
import { KanbanRoutes } from '../kanban';
import { CheckingAuth } from '../ui';
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
            ? <Route path="/kanban/*" element={ <KanbanRoutes />} />
            : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }
        {
          (status === 'authenticated')
            ? <Route path='/*' element={ <Navigate to="/kanban" /> } />
            : <Route path='/*' element={ <Navigate to="/auth/login" /> } />
        }
    </Routes>
  )
}
