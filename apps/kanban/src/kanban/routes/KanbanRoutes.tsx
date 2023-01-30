import { Navigate, Route, Routes } from 'react-router-dom';

import { KanbanPage } from '../pages';

export const KanbanRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <KanbanPage /> } />

        <Route path='/*' element={ <Navigate to="/" /> } />
    </Routes>
  )
}
