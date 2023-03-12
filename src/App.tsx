import React from 'react';
import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<React.Suspense fallback={<div>Идет загрука корзины...</div>}> <Cart /> </React.Suspense>} />
        <Route path='/pizza/:id' element={<React.Suspense fallback={<div>Идет загрука...</div>}> <FullPizza /> </React.Suspense>} />
        <Route path='*' element={<React.Suspense fallback={<div>Идет загрука...</div>}> <NotFound /> </React.Suspense>} />
      </Route>
    </Routes>
  )
}

export default App;
