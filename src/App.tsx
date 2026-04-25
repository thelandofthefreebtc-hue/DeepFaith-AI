/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Invest } from './pages/Invest';
import { Earn } from './pages/Earn';
import { Learn } from './pages/Learn';
import { Advisor } from './pages/Advisor';
import { Profile } from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/advisor" element={<Advisor />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

