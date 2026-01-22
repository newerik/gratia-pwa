import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GratitudeJournal from './pages/GratitudeJournal';
import PrayerList from './pages/PrayerList';
import Settings from './pages/Settings';
import PWABadge from './PWABadge';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GratitudeJournal />} />
          <Route path="prayer-list" element={<PrayerList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <PWABadge />
    </BrowserRouter>
  );
}

export default App;
