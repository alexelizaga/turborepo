import { Route, Routes } from 'react-router-dom';

import { AxiosPage, HomePage, LazyQueryPage, QueryPage, MutationPage } from '../pages';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/axios" element={ <AxiosPage /> } />
        <Route path="/query" element={ <QueryPage /> } />
        <Route path="/lazy-query" element={ <LazyQueryPage /> } />
        <Route path="/mutation" element={ <MutationPage /> } />
    </Routes>
  )
}
