import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingFallback from './components/LoadingFallback';
import PWABadge from './PWABadge';
import './App.css';

const GratitudeJournal = lazy(() => import('./pages/GratitudeJournal'));
const PrayerList = lazy(() => import('./pages/PrayerList'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GratitudeJournal />} />
            <Route path="prayer-list" element={<PrayerList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
      <PWABadge />
    </BrowserRouter>
  );
}

export default App;
