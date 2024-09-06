import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Home, Post } from './pages';

export function Router(): JSX.Element {
   return (
      <Routes>
         <Route path='*' element={<Navigate to='/' />} />

         <Route path='/' element={<Home />} />

         <Route path='/login' element={<Login />} />

         <Route path='/post' element={<Post />} />
      </Routes>
   );
}
